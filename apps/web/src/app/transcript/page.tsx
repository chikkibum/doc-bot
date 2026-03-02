import { auth } from "@syntio/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { ComingSoon } from "@/components/coming-soon";

export default async function TranscriptPage() {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (!session?.user) {
		redirect("/login");
	}

	return (
		<ComingSoon
			description="Automated, accurate medical transcriptions and summaries are on the way."
			title="Transcript"
		/>
	);
}
