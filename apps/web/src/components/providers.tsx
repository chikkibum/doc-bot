"use client";
import { ThemeProvider } from "./theme-provider";
import { Toaster } from "./ui/sonner";
import { TooltipProvider } from "./ui/tooltip";

export default function Providers({ children }: { children: React.ReactNode }) {
	return (
		<ThemeProvider
			attribute="class"
			defaultTheme="light"
			disableTransitionOnChange
			forcedTheme="light"
			// enableSystem
		>
			<TooltipProvider>{children}</TooltipProvider>
			<Toaster richColors />
		</ThemeProvider>
	);
}
