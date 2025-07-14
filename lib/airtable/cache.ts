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

let globalCache: CachedData | null = null;
let fetchPromise: Promise<CachedData> | null = null;

async function getAllData(): Promise<CachedData> {
	if (globalCache) {
		return globalCache;
	}

	if (fetchPromise) {
		return fetchPromise;
	}

	fetchPromise = (async (): Promise<CachedData> => {
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

		const data: CachedData = {
			models: modelsData,
			bills: billsData,
			queries: queriesData,
			votes: votesData,
			people: peopleData,
			congress: congressData,
		};

		globalCache = data;
		return data;
	})();

	return fetchPromise;
}

export async function getModelsCache(): Promise<ModelFields[]> {
	const data = await getAllData();
	return data.models.map(record => record.fields);
}

export async function getModelBySlug(slug: string): Promise<ModelFields | undefined> {
	const data = await getAllData();
	const model = data.models.find(record => record.fields.slug === slug);
	return model?.fields;
}

export async function getVotesCache(): Promise<VotesCache[]> {
	const data = await getAllData();
	return data.votes.map(record => ({
		description: record.fields.description ?? undefined,
		date: record.fields.date ?? undefined,
		yesPersons: record.fields.yes ?? undefined,
		noPersons: record.fields.no ?? undefined,
		billId: record.fields.bills?.[0] ?? undefined,
	}));
}

export async function getPeopleCache(): Promise<PeopleFields[]> {
	const data = await getAllData();
	return data.people.map(record => record.fields);
}

export async function getCongressCache(): Promise<CongressCache[]> {
	const data = await getAllData();
	return data.congress.map(record => ({
		name: record.fields.name ?? "",
		years: record.fields.years ?? "",
	}));
}

export async function getBillsCache(): Promise<BillsCache[]> {
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
}

export async function getQueriesCache(): Promise<QueriesFields[]> {
	const data = await getAllData();
	return data.queries.map(record => record.fields);
}

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
