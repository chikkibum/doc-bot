"use client";
import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

export type ScrollFadeEffectOwnProps = {
	/**
	 * Scroll direction to apply the fade effect.
	 * @defaultValue "vertical"
	 * */
	orientation?: "horizontal" | "vertical";
};

export type ScrollFadeEffectProps = ComponentProps<"div"> &
	ScrollFadeEffectOwnProps;

export function ScrollFadeEffect({
	className,
	orientation = "vertical",
	...props
}: ScrollFadeEffectProps) {
	return (
		<div
			className={cn(
				"data-[orientation=horizontal]:overflow-x-auto data-[orientation=vertical]:overflow-y-auto",
				"data-[orientation=horizontal]:scroll-fade-effect-x data-[orientation=vertical]:scroll-fade-effect-y",
				className
			)}
			data-orientation={orientation}
			{...props}
		/>
	);
}
