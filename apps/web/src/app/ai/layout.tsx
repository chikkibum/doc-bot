import { auth } from "@syntio/auth";
import { getChatsByUserId } from "@syntio/db";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";
import { Suspense } from "react";
import { ChatSidebar } from "@/components/chat/chat-sidebar";
import { ChatSidebarSkeleton } from "@/components/chat/chat-sidebar-skeleton";
import { SidebarInset } from "@/components/ui/sidebar";

export default function AILayout({ children }: { children: ReactNode }) {
	return (
		<div className="my-4 flex h-[calc(100svh-96px)] w-full overflow-hidden rounded-[32px] bg-white lg:my-6">
			<Suspense fallback={<ChatSidebarSkeleton />}>
				<SidebarLoader />
			</Suspense>
			<SidebarInset className="m-0! flex min-w-0 flex-1 flex-col rounded-none! border-none! bg-transparent shadow-none!">
				{children}
			</SidebarInset>
		</div>
	);
}

async function SidebarLoader() {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (!session) {
		redirect("/sign-in" as any);
	}

	const chatsResponse = await getChatsByUserId({
		id: session.user.id,
		limit: 10,
		startingAfter: null,
		endingBefore: null,
	});

	const chats = Array.isArray(chatsResponse)
		? chatsResponse
		: chatsResponse?.chats || [];

	return <ChatSidebar recentChats={chats || []} />;
}
