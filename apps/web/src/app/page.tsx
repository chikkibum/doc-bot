import { auth } from "@syntio/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Home() {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (!session?.user) {
		redirect("/login");
	}else{
		redirect("/ai")
	}

	return (
		<div className="container mx-auto max-w-3xl border border-border px-4 py-2 text-foreground">
			<div className="flex h-full flex-col items-center justify-center">
				<h1 className="font-bold text-4xl">Coming Soon</h1>
			</div>
		</div>
	);
}
