"use client";

import { FileText, LayoutGrid, MessageSquare, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useIsMobile } from "@/hooks/use-mobile";
import { FloatingTabs } from "./ui/floating-tabs";
import { SidebarTrigger } from "./ui/sidebar";
import UserMenu from "./user-menu";

export default function Header() {
	const router = useRouter();
	const pathname = usePathname();
	const isMobile = useIsMobile();

	const tabs = [
		{
			label: (
				<>
					<LayoutGrid className="h-4 w-4" />
					<span>Dashboard</span>
				</>
			),
			value: "/dashboard",
		},
		{
			label: (
				<>
					<Sparkles className="h-4 w-4" />
					<span>Insights</span>
				</>
			),
			value: "/insights",
		},
		{
			label: (
				<>
					<FileText className="h-4 w-4" />
					<span>Transcript</span>
				</>
			),
			value: "/transcript",
		},
		{
			label: (
				<>
					<MessageSquare className="h-4 w-4" />
					<span>Chat</span>
				</>
			),
			value: "/ai", // mapping 'Chat' to the existing /ai route
		},
	];

	// Map current pathname to an active tab, defaulting to first tab if missing
	const activeTab =
		tabs.find((t) => pathname?.startsWith(t.value))?.value || tabs[0].value;

	return (
		<header className="fixed top-0 right-0 left-0 z-50 flex h-[76px] flex-row items-center justify-between bg-linear from-white to-blue-50/60 px-6">
			<div className="z-10 flex w-full items-center gap-2 sm:w-auto">
				{isMobile && <SidebarTrigger className="-ml-2" />}
				<Link className="ml-2 flex items-center gap-2" href="/">
					<Image
						alt="Synthio Labs Logo"
						height={120}
						src="/logo.svg"
						width={120}
					/>
				</Link>
			</div>

			<div className="absolute top-1/2 left-1/2 hidden w-fit -translate-x-1/2 -translate-y-1/2 md:block">
				<FloatingTabs
					onChange={(val) => router.push(val as any)}
					tabs={tabs}
					value={activeTab}
				/>
			</div>

			<div className="z-10 flex items-center gap-3">
				{/* <div className="md:hidden">
					<ModeToggle />
				</div>
				<div className="hidden bg-red-200 md:block">
					<ModeToggle />
				</div> */}
				<UserMenu />
			</div>
		</header>
	);
}
