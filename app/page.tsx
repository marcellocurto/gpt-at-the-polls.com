import Image from "next-export-optimize-images/image";
import Android from "@/assets/images/gpt-at-polls.jpg";
import { getModelRecordsWithPoliticalIndex } from "@/lib/airtable/records";
import {
	H1,
	H2,
	PageInnerWrapper,
	PageOuterWrapper,
	SubSection,
} from "@/components/page";
import Link from "next/link";
import { PoliticalIndexGraph } from "@/components/graphics/graph";

export default async function Home() {
	const records = (await getModelRecordsWithPoliticalIndex())
		.filter(
			(record) => (record?.fields?.politicalIndex?.length ?? 0) > 113
		)
		.filter((record) => record?.fields?.featured);

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
		<PageOuterWrapper>
			<PageInnerWrapper className="bg-gptyellow-200/80">
				<div className="flex flex-col items-center gap-12 md:flex-row md:items-start">
					<div className="flex flex-col gap-8">
						<h1 className="text-gptblue-800 flex flex-col text-center text-4xl leading-6 font-black italic md:text-left">
							<span className="text-8xl">GPT</span>
							<span className="leading-none">at the Polls</span>
						</h1>
						<div className="max-w-md">
							<p className="text-gptblue-800 text-center text-2xl leading-tight md:text-left">
								A research project that analyzes the political opinions of
								large language models.
							</p>
						</div>
					</div>
					<Image
						className="border-gptblue-500 rounded-4xl border-4 shadow-xl"
						src={Android}
						alt="An Android at the polls."
						width={360}
						height={360}
						priority
					/>
				</div>
			</PageInnerWrapper>
			<PageInnerWrapper>
				<H1>Political Index</H1>

				<div className="flex w-full flex-col gap-6 rounded-4xl p-2 sm:p-6">
					<H2>Which LLM votes like AOC?</H2>
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
				<div className="flex w-full flex-col gap-6 rounded-4xl p-2 sm:p-6">
					<div className="flex justify-center">
						<Link
							className="bg-gptblue-800 mx-auto rounded-3xl px-7 py-3 text-center font-semibold text-white"
							href="/political-index"
						>
							See full list of models
						</Link>
					</div>
				</div>
			</PageInnerWrapper>
		</PageOuterWrapper>
	);
}
