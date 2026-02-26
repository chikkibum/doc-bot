import { ChatMessage } from "./message";

export function MessageList({ messages }: { messages: any[] }) {
	if (messages.length === 0) {
		return (
			<div className="flex h-full min-h-[50vh] flex-1 items-center justify-center">
				<p className="text-stone-500 dark:text-stone-400">
					No messages yet. Start a conversation!
				</p>
			</div>
		);
	}

	return (
		<div className="flex flex-1 flex-col">
			{messages.map((message) => (
				<ChatMessage key={message.id} message={message} />
			))}
		</div>
	);
}
