import { auth } from "@syntio/auth";
import { getChatById, getMessagesByChatId } from "@syntio/db";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { Suspense } from "react";
import { Chat } from "@/components/chat/chat";
import { ChatSkeleton } from "@/components/chat/chat-skeleton";

export default async function AIChatPage({
	params,
}: {
	params: { id: string };
}) {
	const { id } = await params;

	return (
		<Suspense fallback={<ChatSkeleton />}>
			<ChatLoader id={id} />
		</Suspense>
	);
}

async function ChatLoader({ id }: { id: string }) {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (!session?.user) {
		redirect("/login");
	}

	const chat = await getChatById({ id });

	if (!chat) {
		notFound();
	}

	if (chat.userId !== session.user.id) {
		notFound();
	}

	const dbMessages = await getMessagesByChatId({ id });

	const formattedMessages: any[] = dbMessages.map((msg) => {
		let content = "";
		if (Array.isArray(msg.parts)) {
			content = msg.parts.map((p: any) => p.text || "").join("");
		}

		return {
			id: msg.id,
			role: msg.role === "user" ? "user" : "assistant",
			content,
		};
	});

	return <Chat id={id} initialMessages={formattedMessages} />;
}
