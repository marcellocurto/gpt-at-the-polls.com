import Link from "next/link";
import { PoliticalIndexGraph } from "@/components/graphics/graph";
import { H1, H2, SubSection } from "@/components/page";
import { getModels } from "@/lib/api-client";
import { getSiteMetadata } from "@/lib/meta-tags";

const title = "Political Index";
const description =
	"This is the political index of the models on this site.";

export const metadata = getSiteMetadata({ title, description });

export default async function Page() {
	const records = await getModels();

	const calculateDPercentage = (politicalIndex?: string[]): number => {
		if (!politicalIndex || politicalIndex.length === 0) {
			return 0;
		}
		const countD = politicalIndex.filter((index) => index === "D").length;
		return (countD / politicalIndex.length) * 100;
	};

	const sortedRecords = [...records].sort((a, b) => {
		const percentageA = calculateDPercentage(a.politicalIndex);
		const percentageB = calculateDPercentage(b.politicalIndex);
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
							{sortedRecords.map(({ slug, name, politicalIndex }) => (
								<div className="flex w-full flex-col gap-1" key={slug}>
									<Link href={`/models/${slug}`}>
										<h3 className="text-xl font-bold sm:text-2xl">
											{name}
										</h3>
									</Link>
									<PoliticalIndexGraph politicalIndex={politicalIndex} />
								</div>
							))}
						</div>
					</SubSection>
				</div>
			</div>
		</div>
	);
}
