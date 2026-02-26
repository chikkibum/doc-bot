import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuItem,
} from "@/components/ui/sidebar";

function SkeletonPulse({ className }: { className?: string }) {
	return (
		<div
			className={`animate-pulse rounded-md bg-stone-200/60 ${className ?? ""}`}
		/>
	);
}

export function ChatSidebarSkeleton() {
	return (
		<Sidebar
			className="border-r border-r-stone-100 bg-linear-to-t from-white via-purple-100/60 to-purple-50/20"
			collapsible="none"
		>
			<SidebarHeader className="p-4 pt-6">
				<div className="mb-2 flex items-center justify-between px-2">
					<SkeletonPulse className="h-6 w-16" />
					<SkeletonPulse className="h-8 w-8 rounded-md" />
				</div>
			</SidebarHeader>

			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupContent>
						<SidebarMenu className="px-2">
							{Array.from({ length: 4 }, (_, i) => (
								<SidebarMenuItem key={`skeleton-${i.toString()}`}>
									<div className="mb-2 flex h-auto w-full items-start gap-3 rounded-[12px] p-3 py-3">
										<SkeletonPulse className="h-10 w-10 shrink-0 rounded-full" />
										<div className="flex w-full flex-col gap-1.5">
											<SkeletonPulse className="h-4 w-24" />
											<SkeletonPulse className="h-3.5 w-32" />
										</div>
									</div>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
		</Sidebar>
	);
}
