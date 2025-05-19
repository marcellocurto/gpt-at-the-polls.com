import { H1, H2, P, SubSection } from "@/components/page";
import { getModelRecordsWithPoliticalIndex } from "@/lib/airtable/records";
import { Metadata } from "next";

const title = "Political Index";

export const metadata: Metadata = {
	title,
};

export default async function Page() {
	const records = (await getModelRecordsWithPoliticalIndex()).filter(
		(record) => (record?.fields?.politicalIndex?.length ?? 0) > 113
	);

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
		<div className="px-3 py-3 sm:px-4 sm:py-4">
			<div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-8 rounded-4xl bg-zinc-200/80 px-4 py-8 shadow-lg sm:p-10 md:py-16">
				<H1>{title}</H1>

				<div className="flex w-full flex-col gap-6 rounded-4xl p-2 sm:p-6">
					<H2>Who is most like AOC?</H2>
					<SubSection>
						<div className="flex w-full flex-col gap-16">
							{sortedRecords.map(({ id, fields }) => (
								<div className="flex w-full flex-col gap-1" key={id}>
									<h3 className="text-xl font-bold sm:text-2xl">
										{fields.name}
									</h3>
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
		<div className="flex flex-col gap-1">
			<div className="flex justify-between gap-2 px-2">
				<P>{percentageD}%</P>
				<P>{percentageR}%</P>
			</div>
			<div className="flex h-5 w-full gap-1 overflow-hidden rounded-full">
				<div
					className="bg-blue-600"
					style={{ width: `${percentageD}%` }}
				></div>
				<div
					className="bg-red-700"
					style={{ width: `${percentageR}%` }}
				></div>
			</div>
			<div className="flex justify-between gap-2 px-2">
				<P className="text-xs">Democrats</P>
				<P className="text-xs">Republicans</P>
			</div>
		</div>
	);
}
