"use client";

import { useCallback, useState } from "react";

type UseCopyOptions = {
	timeout?: number; // how long "copied" stays true
};

export function useCopy(options?: UseCopyOptions) {
	const timeout = options?.timeout ?? 2000;

	const [copied, setCopied] = useState(false);
	const [error, setError] = useState<Error | null>(null);

	const copy = useCallback(
		async (text: string) => {
			if (!navigator?.clipboard) {
				setError(new Error("Clipboard not supported"));
				return false;
			}

			try {
				await navigator.clipboard.writeText(text);
				setCopied(true);
				setError(null);

				setTimeout(() => {
					setCopied(false);
				}, timeout);

				return true;
			} catch (err) {
				setError(err as Error);
				setCopied(false);
				return false;
			}
		},
		[timeout]
	);

	return {
		copy,
		copied,
		error,
	};
}
