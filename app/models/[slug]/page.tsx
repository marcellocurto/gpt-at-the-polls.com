import { PieChartDonut } from "@/components/charts/pie-chart";
import { PoliticalIndexGraph } from "@/components/graphics/graph";
import { H1, P } from "@/components/page";
import {
	getModelRecordsBySlug,
	getModelRecordsWithPoliticalIndex,
} from "@/lib/airtable/records";
import { ModelFields } from "@/lib/airtable/records";
import { notFound } from "next/navigation";

type PageProps = {
	params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
	const models = await getModelRecordsWithPoliticalIndex();
	return models
		.filter((model: { fields: ModelFields }) => model.fields.slug)
		.map((model: { fields: ModelFields }) => ({
			slug: model.fields.slug!,
		}));
}

export default async function Page({ params: paramsPromise }: PageProps) {
	const params = await paramsPromise;

	if (!params || typeof params.slug !== "string") {
		notFound();
	}

	const model = await getModelRecordsBySlug(params.slug);
	if (!model) notFound();
	return (
		<div className="px-3 py-3 sm:px-4 sm:py-4">
			<div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-8 rounded-4xl bg-zinc-200/80 px-4 py-8 shadow-lg sm:p-10 md:py-16">
				<H1>{model.fields.name}</H1>
				<P>{model.fields.description}</P>
				<div className="flex w-full flex-col gap-4">
					<PoliticalIndexGraph
						politicalIndex={model.fields.politicalIndex}
					/>
				</div>
				<PieChartDonut
					data={[
						{ candidate: "chrome", votes: 275, fill: "var(--chart-1)" },
						{ candidate: "safari", votes: 200, fill: "var(--chart-2)" },
						{ candidate: "firefox", votes: 187, fill: "var(--chart-3)" },
						{ candidate: "edge", votes: 173, fill: "var(--chart-4)" },
					]}
					config={{
						votes: {
							label: "Votes",
						},
						chrome: {
							label: "YES (AOC)",
							color: "hsl(var(--chart-1))",
						},
						safari: {
							label: "NO (AOC)",
							color: "hsl(var(--chart-2))",
						},
						firefox: {
							label: "YES (MIKE)",
							color: "hsl(var(--chart-3))",
						},
						edge: {
							label: "NO (MIKE)",
							color: "hsl(var(--chart-4))",
						},
					}}
				/>
			</div>
		</div>
	);
}
