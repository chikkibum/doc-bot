import type { Metadata } from "next";

import { Geist, Geist_Mono } from "next/font/google";

import "../index.css";
import Header from "@/components/header";
import Providers from "@/components/providers";
import { SidebarProvider } from "@/components/ui/sidebar";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "syntio",
	description: "syntio",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body
				className={`${geistSans.variable} ${geistMono.variable} bg-white antialiased`}
			>
				<Providers>
					<SidebarProvider>
						<Header />
						<div className="flex h-svh w-full flex-1 overflow-hidden bg-linear-to-r from-white to-blue-100 p-4 pt-16 text-white sm:p-6 sm:pt-16">
							<main className="flex w-full flex-1 overflow-hidden">
								{children}
							</main>
						</div>
					</SidebarProvider>
				</Providers>
			</body>
		</html>
	);
}
