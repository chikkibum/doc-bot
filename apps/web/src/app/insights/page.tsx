import { auth } from "@syntio/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { ComingSoon } from "@/components/coming-soon";

export default async function InsightsPage() {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (!session?.user) {
		redirect("/login");
	}

	return (
		<ComingSoon
			description="Actionable insights powered by AI are coming soon to help you understand patient trends."
			title="Insights"
		/>
	);
}
