function SkeletonPulse({ className }: { className?: string }) {
	return (
		<div
			className={`animate-pulse rounded-md bg-stone-200/60 ${className ?? ""}`}
		/>
	);
}

export function ChatSkeleton() {
	return (
		<div className="flex h-full flex-col items-center gap-6 self-stretch overflow-hidden px-4 py-4 md:px-8">
			{/* Header skeleton */}
			<div className="flex w-full shrink-0 items-center justify-between">
				<div className="flex items-center gap-4">
					<SkeletonPulse className="h-12 w-12 rounded-full" />
					<div className="flex flex-col gap-1.5">
						<SkeletonPulse className="h-5 w-28" />
						<SkeletonPulse className="h-3.5 w-36" />
					</div>
				</div>
				<div className="flex items-center gap-3">
					<SkeletonPulse className="h-11 w-11 rounded-full" />
					<SkeletonPulse className="h-11 w-11 rounded-full" />
				</div>
			</div>

			{/* Messages area skeleton */}
			<div className="relative flex w-full flex-1 flex-col gap-4 overflow-y-auto">
				{/* Assistant message */}
				<div className="flex w-full justify-start">
					<div className="flex max-w-[80%] flex-col gap-2">
						<SkeletonPulse className="h-16 w-64 rounded-[20px] rounded-tl-none" />
					</div>
				</div>

				{/* User message */}
				<div className="flex w-full justify-end">
					<div className="flex max-w-[80%] flex-col items-end gap-2">
						<SkeletonPulse className="h-10 w-44 rounded-[32px] rounded-tr-none" />
					</div>
				</div>

				{/* Assistant message */}
				<div className="flex w-full justify-start">
					<div className="flex max-w-[80%] flex-col gap-2">
						<SkeletonPulse className="h-24 w-72 rounded-[20px] rounded-tl-none" />
					</div>
				</div>
			</div>

			{/* Input skeleton */}
			<div className="w-full shrink-0">
				<SkeletonPulse className="h-14 w-full rounded-2xl" />
			</div>
		</div>
	);
}
