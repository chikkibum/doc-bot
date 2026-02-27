import { Suspense } from "react";
import { Chat } from "@/components/chat/chat";
import { ChatSkeleton } from "@/components/chat/chat-skeleton";
import { generateUUID } from "@/lib/utils";

export default function AINewChatPage() {
	return (
		<Suspense fallback={<ChatSkeleton />}>
			<NewChat />
		</Suspense>
	);
}

function NewChat() {
	const id = generateUUID();
	return <Chat id={id} />;
}
