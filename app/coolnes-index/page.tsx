import {
	PageLayout,
	H1,
	H2,
	P,
	Section,
	SubSection,
} from "@/components/page";
import { getModelRecordsWithPoliticalIndex } from "@/lib/airtable/records";
import { Metadata } from "next";

const title = "Index";

export const metadata: Metadata = {
	title,
};

export default async function Page() {
	const records = await getModelRecordsWithPoliticalIndex();

	console.log(records);

	return (
		<PageLayout>
			<H1>{title}</H1>

			<Section>
				<H2>In Progress</H2>
				<SubSection>
					<P>More to come soon.</P>
				</SubSection>
			</Section>
		</PageLayout>
	);
}
