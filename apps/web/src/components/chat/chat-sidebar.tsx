"use client";

import type { Chat } from "@syntio/db";
import { EditIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ScrollFadeEffect } from "@/components/ui/scroll-fade-effect";
import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import avatarImage from "../../../public/avatar.png";

export function ChatSidebar({
	recentChats,
	currentChatId,
}: {
	recentChats: Chat[];
	currentChatId?: string;
}) {
	const isMobile = useIsMobile();
	const router = useRouter();

	const pathname = usePathname();
	const segments = pathname.split("/");

	const chatId = segments.includes("chat") ? segments[3] : currentChatId;
	console.log(isMobile, "ismobile");
	console.log(chatId, recentChats, "currentChatId");
	return (
		<Sidebar
			className="border-r border-r-stone-100 bg-linear-to-t from-white via-purple-100/60 to-purple-50/20"
			collapsible={isMobile ? "icon" : "none"}
		>
			<SidebarHeader className="p-4 pt-6">
				<div className="mb-2 flex items-center justify-between px-2">
					<h2 className="font-bold text-[#1C274C] text-xl tracking-tight">
						Chats
					</h2>
					<Link
						className="inline-flex h-8 w-8 items-center justify-center rounded-md font-medium text-sm text-stone-500 transition-colors hover:bg-stone-200/50 hover:text-stone-900"
						href="/ai"
					>
						<EditIcon className="h-4 w-4" />
						<span className="sr-only">New Chat</span>
					</Link>
				</div>
			</SidebarHeader>

			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupContent>
						{recentChats.length === 0 ? (
							<div className="px-4 py-4 text-sm text-stone-500">
								No past chats yet.
							</div>
						) : (
							<ScrollFadeEffect className="px-2">
								<SidebarMenu>
									{recentChats.map((chat) => (
										<SidebarMenuItem key={chat.id}>
											<SidebarMenuButton
												className={cn(
													"flex h-auto w-full items-start gap-2 rounded-[12px] border border-transparent p-3 py-3 font-medium text-[#1C274C] transition-all",
													chatId === chat.id
														? "border-b-[#EEE] bg-[#EBF0FF] text-stone-900"
														: "bg-transparent text-stone-600 hover:bg-stone-50"
												)}
												isActive={chatId === chat.id}
												onClick={() =>
													router.push(`/ai/chat/${chat.id}` as unknown as never)
												}
												render={
													<Link
														href={`/ai/chat/${chat.id}` as unknown as never}
													/>
												}
												tooltip={chat.title || "Untitled Chat"}
											>
												<div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full border border-stone-200 bg-stone-100 shadow-sm">
													{/* Using an inline SVG for the realistic look fallback */}
													<Image
														alt="Chat avatar"
														height={50}
														src={avatarImage}
														width={50}
													/>
													{/* <svg
													aria-label="Chat avatar"
													className="h-full w-full text-stone-400"
													fill="none"
													role="img"
													viewBox="0 0 24 24"
													xmlns="http://www.w3.org/2000/svg"
												>
													<path
														d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11ZM12 13C8.68629 13 6 15.6863 6 19V21H18V19C18 15.6863 15.3137 13 12 13Z"
														fill="currentColor"
													/>
												</svg> */}
												</div>
												<div className="flex w-full flex-col items-start gap-0.5 overflow-hidden">
													<span className="w-full truncate font-medium text-[#1C274C] text-[15px] dark:text-stone-200">
														Dr. Emily Chen
													</span>
													<span className="w-full truncate text-[13px] text-stone-500 opacity-90">
														{chat.title || "Untitled Chat"}
													</span>
												</div>
											</SidebarMenuButton>
										</SidebarMenuItem>
									))}
								</SidebarMenu>
							</ScrollFadeEffect>
						)}
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
		</Sidebar>
	);
}
