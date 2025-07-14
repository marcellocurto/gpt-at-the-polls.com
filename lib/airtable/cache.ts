import {
	getBillsRecords,
	getCongressRecords,
	getModelRecords,
	getPeopleRecords,
	getQueriesRecords,
	getVotesRecords,
	BillsFields,
	ModelFields,
	PeopleFields,
	QueriesFields,
	VotesFields,
	CongressFields,
} from "@/lib/airtable/records";
import { unstable_cache } from "next/cache";

export type VotesCache = {
	description: string | undefined;
	yesPersons: string[] | undefined;
	noPersons: string[] | undefined;
	date: string | undefined;
	billId: string | undefined;
};

export type CongressCache = {
	name: string;
	years: string;
};

export type BillsCache = {
	id: string | undefined;
	title: string | undefined;
	summary: string | undefined;
	stateLink: string | undefined;
	congress: string | undefined;
	sourcePdf: string | undefined;
	date: string | undefined;
	yesVotes: string[] | undefined;
	noVotes: string[] | undefined;
};

type CachedData = {
	models: { id: string; fields: ModelFields }[];
	bills: { id: string; fields: BillsFields }[];
	queries: { id: string; fields: QueriesFields }[];
	votes: { id: string; fields: VotesFields }[];
	people: { id: string; fields: PeopleFields }[];
	congress: { id: string; fields: CongressFields }[];
};

const getAllData = unstable_cache(
	async (): Promise<CachedData> => {
		console.log("Fetching all data from Airtable...");

		const [modelsData, billsData, queriesData, votesData, peopleData, congressData] = await Promise.all([
			getModelRecords(),
			getBillsRecords({
				fields: [
					"selection",
					"id",
					"title",
					"summaryWebsite",
					"stateLink",
					"billPdfUrl",
					"nameFromCongress",
					"date",
					"yes (from votes)",
					"no (from votes)",
				],
			}),
			getQueriesRecords(),
			getVotesRecords({
				fields: ["description", "date", "yes", "no", "bills"],
			}),
			getPeopleRecords(),
			getCongressRecords({
				fields: ["name", "years"],
			})
		]);

		console.log("All data fetched successfully");

		return {
			models: modelsData,
			bills: billsData,
			queries: queriesData,
			votes: votesData,
			people: peopleData,
			congress: congressData,
		};
	},
	["all-airtable-data"],
	{
		revalidate: false,
		tags: ["airtable-data"]
	}
);

export const getModelsCache = unstable_cache(
	async (): Promise<ModelFields[]> => {
		const data = await getAllData();
		return data.models.map(record => record.fields);
	},
	["models-cache"],
	{
		revalidate: false,
		tags: ["models"]
	}
);

export async function getModelBySlug(slug: string): Promise<ModelFields | undefined> {
	const data = await getAllData();
	const model = data.models.find(record => record.fields.slug === slug);
	return model?.fields;
}

export const getVotesCache = unstable_cache(
	async (): Promise<VotesCache[]> => {
		const data = await getAllData();
		return data.votes.map(record => ({
			description: record.fields.description ?? undefined,
			date: record.fields.date ?? undefined,
			yesPersons: record.fields.yes ?? undefined,
			noPersons: record.fields.no ?? undefined,
			billId: record.fields.bills?.[0] ?? undefined,
		}));
	},
	["votes-cache"],
	{
		revalidate: false,
		tags: ["votes"]
	}
);

export const getPeopleCache = unstable_cache(
	async (): Promise<PeopleFields[]> => {
		const data = await getAllData();
		return data.people.map(record => record.fields);
	},
	["people-cache"],
	{
		revalidate: false,
		tags: ["people"]
	}
);

export const getCongressCache = unstable_cache(
	async (): Promise<CongressCache[]> => {
		const data = await getAllData();
		return data.congress.map(record => ({
			name: record.fields.name ?? "",
			years: record.fields.years ?? "",
		}));
	},
	["congress-cache"],
	{
		revalidate: false,
		tags: ["congress"]
	}
);

export const getBillsCache = unstable_cache(
	async (): Promise<BillsCache[]> => {
		const data = await getAllData();
		return data.bills.map(record => ({
			id: record.fields.id ?? undefined,
			title: record.fields.title ?? undefined,
			summary: record.fields.summaryWebsite ?? undefined,
			stateLink: record.fields.stateLink ?? undefined,
			congress: record.fields.nameFromCongress?.[0] ?? undefined,
			sourcePdf: record.fields.billPdfUrl ?? undefined,
			date: record.fields.date ?? undefined,
			yesVotes: record.fields?.["yes (from votes)"] ?? undefined,
			noVotes: record.fields?.["no (from votes)"] ?? undefined,
		}));
	},
	["bills-cache"],
	{
		revalidate: false,
		tags: ["bills"]
	}
);

export const getQueriesCache = unstable_cache(
	async (): Promise<QueriesFields[]> => {
		const data = await getAllData();
		return data.queries.map(record => record.fields);
	},
	["queries-cache"],
	{
		revalidate: false,
		tags: ["queries"]
	}
);

export async function getQueriesByAirtableIds(airtableIds: string[]): Promise<QueriesFields[]> {
	const data = await getAllData();
	const queriesMap = new Map<string, QueriesFields>();

	data.queries.forEach(record => {
		queriesMap.set(record.id, record.fields);
	});

	const queries: QueriesFields[] = [];
	for (const airtableId of airtableIds) {
		const query = queriesMap.get(airtableId);
		if (query) queries.push(query);
	}
	return queries;
}

export async function getBillsByAirtableIds(airtableIds: string[]): Promise<BillsFields[]> {
	const data = await getAllData();
	const billsMap = new Map<string, BillsFields>();

	data.bills.forEach(record => {
		billsMap.set(record.id, record.fields);
	});

	const bills: BillsFields[] = [];
	for (const airtableId of airtableIds) {
		const bill = billsMap.get(airtableId);
		if (bill) bills.push(bill);
	}
	return bills;
}
