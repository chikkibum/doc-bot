"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";
import { PhoneIcon, VideoIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { generateUUID } from "@/lib/utils";
import avatarImage from "../../../public/avatar.png";
import { ScrollFadeEffect } from "../ui/scroll-fade-effect";
import { ShinyText } from "../ui/shinyText";
import { ChatInput } from "./chat-input";
import { MessageList } from "./message-list";

// Simple fallback avatar for Dr. Emily Chen
const DoctorAvatar = () => (
	<div className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border border-stone-200 bg-stone-100 shadow-sm md:h-12 md:w-12">
		<Image alt="Chat avatar" height={50} src={avatarImage} width={50} />
	</div>
);

export function Chat({
	id,
	initialMessages = [],
}: {
	id: string;
	initialMessages?: UIMessage[];
}) {
	const [input, setInput] = useState("");
	const { messages, sendMessage, stop, status } = useChat({
		id,
		messages: initialMessages,
		generateId: generateUUID,
		transport: new DefaultChatTransport({
			api: "/api/ai",
			prepareSendMessagesRequest(request) {
				const lastMessage = request.messages.at(-1);
				const isToolContinuation =
					lastMessage?.role !== "user" ||
					request.messages.some((msg) =>
						msg.parts?.some((part) => {
							const state = (part as { state?: string }).state;
							return (
								state === "approval-responded" || state === "output-denied"
							);
						})
					);

				return {
					body: {
						id: request.id,
						...(isToolContinuation
							? { messages: request.messages }
							: { message: lastMessage }),
						...request.body,
					},
				};
			},
		}),
	});

	const isGenerating = status === "submitted" || status === "streaming";

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (!input.trim() || status !== "ready") {
			return;
		}
		sendMessage({ text: input });
		setInput("");
	};

	return (
		<div className="flex h-full flex-col items-center gap-6 self-stretch overflow-hidden px-4 py-4 md:px-8">
			{/* Chat Header */}
			<div className="flex w-full shrink-0 items-center justify-between border-[#eee] border-b pb-2">
				<div className="flex items-center gap-4">
					<DoctorAvatar />
					<div>
						<h2 className="font-medium text-[#1C274C] text-sm tracking-tight md:text-base">
							Dr. Emily Chen
						</h2>
						<p className="font-medium text-[#93A1B8] text-xs md:text-sm">
							Medical Oncologist
						</p>
					</div>
				</div>
				<div className="flex items-center gap-3">
					<button
						className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-stone-200 bg-white text-stone-600 shadow-sm transition-colors hover:bg-stone-50 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-300 dark:hover:bg-stone-700"
						type="button"
					>
						<VideoIcon className="size-4" />
						<span className="sr-only">Video Call</span>
					</button>
					<button
						className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-stone-200 bg-white text-stone-600 shadow-sm transition-colors hover:bg-stone-50 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-300 dark:hover:bg-stone-700"
						type="button"
					>
						<PhoneIcon className="size-4" />
						<span className="sr-only">Voice Call</span>
					</button>
				</div>
			</div>

			<ScrollFadeEffect className="relative flex w-full flex-1">
				<div className="w-full">
					<MessageList messages={messages} />

					{/* Shiny loading indicator when waiting for response */}
					{status === "submitted" && (
						<div className="flex items-center gap-2 px-4 py-3">
							<div className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full border border-stone-200 bg-stone-100">
								<Image
									alt="Chat avatar"
									height={32}
									src={avatarImage}
									width={32}
								/>
							</div>
							<ShinyText className="text-sm" shimmerWidth={120} speed={2}>
								Searching for a response...
							</ShinyText>
						</div>
					)}
				</div>
			</ScrollFadeEffect>

			<div className="w-full shrink-0">
				<ChatInput
					handleInputChange={(e) => setInput(e.target.value)}
					handleSubmit={handleSubmit}
					input={input}
					isLoading={isGenerating}
					onStop={stop}
				/>
			</div>
		</div>
	);
}
