import { google } from "@ai-sdk/google";
import { auth } from "@syntio/auth";
import { getChatById, saveChat, saveMessages } from "@syntio/db";
import { convertToModelMessages, streamText, type UIMessage } from "ai";
import { headers } from "next/headers";
import { pharmaSystemPrompt } from "@/lib/ai/prompts";
import { generateUUID } from "@/lib/utils";

export const maxDuration = 30;

export async function POST(req: Request) {
	const body = await req.json();
	const { id } = body;

	let messages: UIMessage[];
	if (body.message) {
		messages = body.messages || [body.message];
	} else if (body.messages) {
		// Tool continuation: all messages are sent
		messages = body.messages;
	} else {
		messages = [];
	}

	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (!session?.user) {
		return new Response("Unauthorized", { status: 401 });
	}

	// Pre-Stream DB Action: Ensure chat exists, save the user message
	const chat = await getChatById({ id });
	if (!chat) {
		// Generate a default title from the first message
		const firstMsgText =
			messages[0]?.parts
				?.filter((p) => p.type === "text")
				.map((p) => p.text)
				.join("") || "New Chat";
		const title = firstMsgText.substring(0, 50);
		console.log("title", title, id);
		await saveChat({
			id,
			userId: session.user.id,
			title,
			visibility: "private",
		});
	}

	// Save the latest message (from the user)
	const lastMessage = messages.at(-1);
	if (lastMessage?.role === "user") {
		const textContent =
			lastMessage.parts
				?.filter((p) => p.type === "text")
				.map((p) => p.text)
				.join("\n") || "";
		await saveMessages({
			messages: [
				{
					id: generateUUID(),
					chatId: id,
					role: "user",
					parts: [{ type: "text", text: textContent }],
					createdAt: new Date(),
					attachments: [],
				},
			],
		});
	}

	const model = google("gemini-2.5-flash-lite");

	const modelMessages = await convertToModelMessages(messages);

	const result = streamText({
		model,
		messages: modelMessages,
		system: pharmaSystemPrompt,
		onFinish: async (event) => {
			const finishedMessages = event.response?.messages || [];
			if (finishedMessages.length > 0) {
				console.log(
					`[AI Route] Completed generating ${finishedMessages.length} message(s).`
				);

				const formattedMessages = finishedMessages.map((msg) => {
					// Flatten text content from parts if necessary
					const textContent =
						msg.content && Array.isArray(msg.content)
							? msg.content
									.map((c) => (c.type === "text" ? c.text : ""))
									.join("\n")
							: "";

					return {
						id: generateUUID(),
						chatId: id,
						role:
							msg.role === "assistant"
								? ("assistant" as const)
								: ("data" as const),
						parts: [{ type: "text", text: textContent }],
						createdAt: new Date(),
						attachments: [],
					};
				});

				await saveMessages({ messages: formattedMessages });
			}
		},
		onError: (err) => {
			console.error("[AI Route] Oops, an error occurred!", err);
		},
	});

	return result.toUIMessageStreamResponse();
}
