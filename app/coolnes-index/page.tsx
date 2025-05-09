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

	const calculateDPercentage = (politicalIndex?: string[]): number => {
		if (!politicalIndex || politicalIndex.length === 0) {
			return 0;
		}
		const countD = politicalIndex.filter((index) => index === "D").length;
		return (countD / politicalIndex.length) * 100;
	};

	const sortedRecords = [...records].sort((a, b) => {
		const percentageA = calculateDPercentage(a.fields.politicalIndex);
		const percentageB = calculateDPercentage(b.fields.politicalIndex);
		return percentageB - percentageA;
	});

	return (
		<PageLayout>
			<H1>{title}</H1>

			<Section>
				<H2>In Progress</H2>
				<SubSection>
					{sortedRecords.map(({ id, fields }) => (
						<div key={id}>
							<P>{fields.name}</P>
							<PoliticalIndex politicalIndex={fields.politicalIndex} />
						</div>
					))}
				</SubSection>
			</Section>
		</PageLayout>
	);
}

function PoliticalIndex({ politicalIndex }: { politicalIndex?: string[] }) {
	if (!politicalIndex || politicalIndex.length === 0) {
		return (
			<div>
				<P>Democrats: 0.00%</P>
				<P>Republicans: 0.00%</P>
			</div>
		);
	}

	const countD = politicalIndex.filter((index) => index === "D").length;
	const countR = politicalIndex.filter((index) => index === "R").length;
	const total = politicalIndex.length;

	const percentageD = (countD / total) * 100;
	const percentageR = (countR / total) * 100;

	return (
		<div>
			<P>
				Democrats: {percentageD.toFixed(0)}% ({countD})
			</P>
			<P>
				Republicans: {percentageR.toFixed(0)}% ({countR})
			</P>
		</div>
	);
}
