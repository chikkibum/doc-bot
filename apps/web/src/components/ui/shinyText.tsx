"use client";

import type React from "react";

export function ShinyText({
	children,
	className = "",
	shimmerWidth = 100,
	speed = 1,
	...props
}: {
	children: React.ReactNode;
	className?: string;
	shimmerWidth?: number;
	speed?: number;
	props?: React.HTMLAttributes<HTMLSpanElement>;
}) {
	return (
		<span
			className={`shiny-text relative inline-block bg-linear-to-r from-transparent via-50% via-black/60 to-transparent bg-clip-text bg-no-repeat text-neutral-600/50 dark:via-white/60 dark:text-neutral-400/60 ${className}
      `}
			style={
				{
					"--shiny-width": `${shimmerWidth}px`,
					"--shiny-speed": `${speed}s`,
					// ...style,
				} as React.CSSProperties
			}
			{...props}
		>
			{children}
		</span>
	);
}
