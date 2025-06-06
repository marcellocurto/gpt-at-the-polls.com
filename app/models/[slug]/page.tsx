import { PoliticalIndexGraph } from "@/components/graphics/graph";
import { H1, H2, P } from "@/components/page";
import {
	getBillsByAirtableIds,
	getModelBySlug,
	getModelsCache,
	getQueriesByAirtableIds,
} from "@/lib/airtable/cache";
import { getSiteMetadata } from "@/lib/meta-tags";
import { notFound } from "next/navigation";

type PageProps = {
	params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps) {
	const { slug } = await params;
	const model = await getModelBySlug(slug);
	if (!model) {
		return getSiteMetadata({
			title: "Model Not Found",
			description: "The model you are looking for does not exist.",
		});
	}
	return getSiteMetadata({
		title: model.name,
		description: model.summary || model.description,
	});
}

export async function generateStaticParams() {
	const models = await getModelsCache();
	return models
		.filter((model) => model.slug)
		.filter((model) => model.selection === "include")
		.map((model) => ({
			slug: model.slug,
		}));
}

export default async function Page({ params: paramsPromise }: PageProps) {
	const params = await paramsPromise;

	if (!params || typeof params.slug !== "string") {
		notFound();
	}

	const model = await getModelBySlug(params.slug);
	if (!model) notFound();
	const queries = (
		await getQueriesByAirtableIds([...(model.queries ?? [])])
	).sort((a, b) => {
		return (
			new Date(b?.billDate ?? "").getTime() -
			new Date(a?.billDate ?? "").getTime()
		);
	});

	return (
		<div className="px-3 py-3 sm:px-4 sm:py-4">
			<div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-8 rounded-4xl bg-zinc-200/80 px-4 py-8 shadow-lg sm:p-10 md:py-16">
				<H1>{model.name}</H1>
				<P>{model.summary}</P>
				<div className="flex w-full flex-col gap-4">
					<PoliticalIndexGraph politicalIndex={model.politicalIndex} />
				</div>

				<div className="flex flex-col gap-2">
					<H2>Queries</H2>
					<div className="flex flex-col gap-8">
						{queries.map((query) => (
							<div
								className="flex flex-col gap-8 rounded-2xl bg-stone-300 p-5"
								key={query.request_id}
							>
								<BillList bills={query.bill ?? []} />
								<div className="flex justify-center gap-12">
									<div className="flex flex-col items-center justify-center gap-2">
										<P>Vote LLM</P>
										<div className="flex size-14 items-center justify-center rounded-full border border-amber-400 bg-amber-200 text-center leading-0 font-bold shadow">
											{query.vote}
										</div>
									</div>
									<div className="flex flex-col items-center justify-center gap-2">
										<P>Vote AOC (D)</P>
										<div className="flex size-14 items-center justify-center rounded-full border border-blue-400 bg-blue-200 text-center leading-0 font-bold shadow">
											{query.yesVotes?.[0] === "recnGfzvMpW4zyvC7"
												? "Yes"
												: "No"}
										</div>
									</div>
									<div className="flex flex-col items-center justify-center gap-2">
										<P>Vote Mike Johnson (R)</P>
										<div className="flex size-14 items-center justify-center rounded-full border border-red-400 bg-red-200 text-center leading-0 font-bold shadow">
											{query.yesVotes?.[0] === "recmcdCkjBKUhhWIT"
												? "Yes"
												: "No"}
										</div>
									</div>
								</div>
								<div>
									<h3 className="text-xl font-bold">LLM Justification</h3>
									<p>{query.justification}</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}

async function BillList({ bills }: { bills: string[] }) {
	const billsData = await getBillsByAirtableIds(bills ?? []);
	return (
		<div>
			{billsData.map((bill) => (
				<div key={bill.id} className="flex flex-col gap-2">
					<h3 className="text-xl font-semibold">
						{bill.id}: {bill.title}
					</h3>
					<p>{new Date(bill?.date ?? "").toLocaleDateString()}</p>
				</div>
			))}
		</div>
	);
}
