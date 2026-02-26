import { ArrowUp, Paperclip, Square } from "lucide-react";
import type { ChangeEvent, FormEvent } from "react";

export function ChatInput({
	input,
	handleInputChange,
	handleSubmit,
	isLoading,
	onStop,
}: {
	input: string;
	handleInputChange: (
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => void;
	handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
	isLoading: boolean;
	onStop?: () => void;
}) {
	return (
		<div className="w-full bg-transparent pt-2 md:pb-6">
			<form
				className="mx-auto flex w-full max-w-5xl items-center gap-3 rounded-full border border-stone-200 bg-white p-2 text-foreground shadow-sm md:rounded-3xl md:p-4 dark:border-stone-800 dark:bg-stone-900"
				onSubmit={(e) => {
					e.preventDefault();
					if (isLoading) {
						onStop?.();
					} else {
						handleSubmit(e);
					}
				}}
			>
				<div className="relative flex-1">
					<Paperclip className="absolute top-1/2 left-2 size-4 -translate-y-1/2 md:size-4" />
					<input
						className="w-full bg-transparent px-4 py-3 pl-8 text-sm placeholder:text-stone-500 focus-visible:outline-none focus-visible:ring-0"
						disabled={isLoading}
						name="prompt"
						onChange={handleInputChange}
						onKeyDown={(e) => {
							if (e.key === "Enter" && !e.shiftKey) {
								e.preventDefault();
								if (isLoading) {
									onStop?.();
								} else {
									handleSubmit(e as unknown as FormEvent<HTMLFormElement>);
								}
							}
						}}
						placeholder="Ask me anything..."
						value={input}
					/>
				</div>
				{isLoading ? (
					<button
						className="inline-flex h-10 w-10 shrink-0 items-center justify-center text-white transition-all"
						onClick={(e) => {
							e.preventDefault();
							onStop?.();
						}}
						style={{
							borderRadius: "36px",
							border: "1px solid #dc2626",
							background: "linear-gradient(180deg, #dc2626 0%, #ef4444 100%)",
							boxShadow:
								"-1px 1px 3px 0 rgba(220, 38, 38, 0.40), 0 1px 9px 2px rgba(254, 202, 202, 0.30) inset, -2px 2px 3px 0 rgba(60, 1, 1, 0.34)",
						}}
						type="button"
					>
						<Square className="h-4 w-4 fill-current" />
						<span className="sr-only">Stop generating</span>
					</button>
				) : (
					<button
						className="inline-flex h-10 w-10 shrink-0 items-center justify-center text-white transition-all disabled:opacity-50"
						disabled={!input?.trim()}
						style={{
							borderRadius: "36px",
							border: "1px solid #013BDB",
							background: "linear-gradient(180deg, #013BDB 0%, #2C62F7 100%)",
							boxShadow:
								"-1px 1px 3px 0 rgba(1, 59, 219, 0.40), 0 1px 9px 2px rgba(210, 234, 255, 0.30) inset, -2px 2px 3px 0 rgba(1, 32, 60, 0.34)",
						}}
						type="submit"
					>
						<ArrowUp className="h-5 w-5" />
						<span className="sr-only">Send</span>
					</button>
				)}
			</form>
		</div>
	);
}
