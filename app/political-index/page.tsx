import { H1, H2, P, SubSection } from "@/components/page";
import { getModelRecordsWithPoliticalIndex } from "@/lib/airtable/records";
import { Metadata } from "next";

const title = "Political Index";

export const metadata: Metadata = {
	title,
};

export default async function Page() {
	const records = await getModelRecordsWithPoliticalIndex();

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
		<div className="px-4 py-4">
			<div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-8 rounded-4xl bg-zinc-200/80 px-10 py-10 shadow-lg md:py-16">
				<H1>{title}</H1>

				<div className="flex w-full flex-col gap-6 rounded-4xl p-6">
					<H2>Who is most like AOC?</H2>
					<SubSection>
						<div className="flex w-full flex-col gap-16">
							{sortedRecords.map(({ id, fields }) => (
								<div className="flex w-full flex-col gap-1" key={id}>
									<h3 className="text-2xl font-bold">{fields.name}</h3>
									<PoliticalIndex politicalIndex={fields.politicalIndex} />
								</div>
							))}
						</div>
					</SubSection>
				</div>
			</div>
		</div>
	);
}

function PoliticalIndex({
	politicalIndex,
}: {
	politicalIndex?: string[];
}) {
	if (!politicalIndex || politicalIndex.length === 0) {
		return null;
	}

	const countD = politicalIndex.filter((index) => index === "D").length;
	const countR = politicalIndex.filter((index) => index === "R").length;
	const total = politicalIndex.length;

	const percentageD = ((countD / total) * 100).toFixed(0);
	const percentageR = ((countR / total) * 100).toFixed(0);

	return (
		<div className="flex flex-col gap-2">
			<div className="flex justify-between gap-2">
				<P>
					Democrats: {percentageD}% ({countD})
				</P>
				<P>
					Republicans: {percentageR}% ({countR})
				</P>
			</div>
			<div className="flex h-5 w-full gap-2">
				<div
					className="bg-blue-600"
					style={{ width: `${percentageD}%` }}
				></div>
				<div
					className="bg-red-700"
					style={{ width: `${percentageR}%` }}
				></div>
			</div>
		</div>
	);
}
