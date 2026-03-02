import { MessageSquare, Sparkles } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";

export function ComingSoon({
	title,
	description = "We are working hard to bring you this feature. Stay tuned!",
}: {
	title: string;
	description?: string;
}) {
	return (
		<div className="flex h-full w-full flex-col items-center justify-center p-6 text-center">
			<div className="fade-in zoom-in-95 flex max-w-md animate-in flex-col items-center gap-6 rounded-3xl border border-blue-100 bg-white/50 p-10 shadow-xl backdrop-blur-xl duration-700 dark:border-slate-800/50 dark:bg-slate-900/50">
				<div className="relative mb-2 flex h-24 w-24 items-center justify-center rounded-3xl bg-blue-50 dark:bg-blue-900/30">
					<Sparkles className="h-10 w-10 animate-pulse text-blue-500" />
					<div className="absolute -top-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-white shadow-lg">
						<span className="font-bold font-mono text-xs">SOON</span>
					</div>
				</div>

				<div className="space-y-3">
					<h2 className="font-bold text-3xl text-slate-900 tracking-tight dark:text-white">
						{title}
					</h2>
					<p className="text-base text-slate-500 dark:text-slate-400">
						{description}
					</p>
				</div>

				<div className="fade-in slide-in-from-bottom-4 mt-4 w-full animate-in border-slate-100 border-t fill-mode-both pt-6 delay-300 duration-700 dark:border-slate-800">
					<Link
						className={cn(
							buttonVariants({ size: "lg" }),
							"w-full gap-2 rounded-xl transition-all hover:scale-[1.02]"
						)}
						href="/ai"
					>
						<MessageSquare className="h-4 w-4" />
						Go to Chat
					</Link>
				</div>
			</div>
		</div>
	);
}
