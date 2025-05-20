import { PoliticalIndexGraph } from "@/components/graphics/graph";
import { H1, H2, SubSection } from "@/components/page";
import { getModelRecordsWithPoliticalIndex } from "@/lib/airtable/records";
import { Metadata } from "next";
import Link from "next/link";

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
									<Link href={`/models/${fields.slug}`}>
										<h3 className="text-xl font-bold sm:text-2xl">
											{fields.name}
										</h3>
									</Link>
									<PoliticalIndexGraph
										politicalIndex={fields.politicalIndex}
									/>
								</div>
							))}
						</div>
					</SubSection>
				</div>
			</div>
		</div>
	);
}
