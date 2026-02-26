import {
	CheckIcon,
	CopyIcon,
	RefreshCwIcon,
	ThumbsDownIcon,
	ThumbsUpIcon,
	Volume2Icon,
} from "lucide-react";
import { Streamdown } from "streamdown";
import { useCopy } from "@/hooks/use-copy";
import { cn } from "@/lib/utils";

export function ChatMessage({ message }: { message: any }) {
	const { copied, copy, error } = useCopy();
	const isUser = message.role === "user";

	return (
		<div
			className={cn(
				"mb-4 flex w-full",
				isUser ? "justify-end" : "justify-start"
			)}
		>
			<div
				className={cn(
					"flex flex-col gap-2",
					isUser ? "items-end" : "items-start",
					"max-w-[80%]"
				)}
			>
				<div
					className={cn(
						"px-4 py-3",
						isUser
							? "rounded-[32px] rounded-tr-none bg-[#4B7BFF] text-white"
							: "rounded-[20px] rounded-tl-none border border-stone-100 bg-stone-50 text-stone-900 shadow-sm dark:border-stone-700 dark:bg-stone-800 dark:text-stone-100"
					)}
				>
					<Streamdown>
						{message.content ||
							(message.parts?.map((p: any) => p.text).join("") ?? "")}
					</Streamdown>
				</div>

				{!isUser && (
					<div className="flex items-center gap-2 pl-2 text-stone-400">
						<button
							className="rounded-md p-1.5 transition-colors hover:bg-stone-100 hover:text-stone-600"
							onClick={() => copy(message.content || "")}
							type="button"
						>
							{copied ? (
								<CheckIcon className="h-4 w-4" />
							) : (
								<CopyIcon className="h-4 w-4" />
							)}
						</button>
						<button
							className="rounded-md p-1.5 transition-colors hover:bg-stone-100 hover:text-stone-600"
							type="button"
						>
							<Volume2Icon className="h-4 w-4" />
						</button>
						<button
							className="rounded-md p-1.5 transition-colors hover:bg-stone-100 hover:text-stone-600"
							type="button"
						>
							<ThumbsUpIcon className="h-4 w-4" />
						</button>
						<button
							className="rounded-md p-1.5 transition-colors hover:bg-stone-100 hover:text-stone-600"
							type="button"
						>
							<ThumbsDownIcon className="h-4 w-4" />
						</button>
						<button
							className="rounded-md p-1.5 transition-colors hover:bg-stone-100 hover:text-stone-600"
							type="button"
						>
							<RefreshCwIcon className="h-4 w-4" />
						</button>
					</div>
				)}
			</div>
		</div>
	);
}
