import {
	getBillsRecords,
	getCongressRecords,
	getModelRecords,
	getPeopleRecords,
	getQueriesRecords,
	getVotesRecords,
	BillsFields,
	CongressFields,
	ModelFields,
	PeopleFields,
	QueriesFields,
	VotesFields,
} from "@/lib/airtable/records";
import { rm, mkdir, readdir, readFile } from "node:fs/promises";
import { join } from "node:path";

async function createCacheFromRecords<T, U = T>({
	folderName,
	recordsFunction,
	transformFunction,
	fields,
}: {
	folderName: string;
	recordsFunction: (options: { fields?: string[] }) => Promise<
		{
			id: string;
			fields: T;
		}[]
	>;
	transformFunction?: (record: T) => U;
	fields?: string[];
}): Promise<void> {
	const records = await recordsFunction({
		fields,
	});
	const cacheDir = join(process.cwd(), ".cache", folderName);

	await rm(cacheDir, { recursive: true, force: true });
	await mkdir(cacheDir, { recursive: true });

	for (const record of records) {
		const filePath = join(cacheDir, `${record.id}.json`);
		const transformedRecord = transformFunction
			? transformFunction(record.fields)
			: record.fields;
		await Bun.write(filePath, JSON.stringify(transformedRecord));
	}
}

export async function createCacheFromModelsRecords(): Promise<void> {
	await createCacheFromRecords({
		folderName: "models",
		recordsFunction: getModelRecords,
	});
}

export async function createCacheFromVotesRecords(): Promise<void> {
	await createCacheFromRecords<VotesFields, VotesCache>({
		folderName: "votes",
		recordsFunction: getVotesRecords,
		transformFunction: (fields) => {
			return {
				description: fields.description ?? undefined,
				date: fields.date ?? undefined,
				yesPersons: fields.yes ?? undefined,
				noPersons: fields.no ?? undefined,
				billId: fields.bills?.[0] ?? undefined,
			} satisfies VotesCache;
		},
		fields: ["description", "date", "yes", "no", "bills"],
	});
}

export type VotesCache = {
	description: string | undefined;
	yesPersons: string[] | undefined;
	noPersons: string[] | undefined;
	date: string | undefined;
	billId: string | undefined;
};

export async function createCacheFromPeopleRecords(): Promise<void> {
	await createCacheFromRecords({
		folderName: "people",
		recordsFunction: getPeopleRecords,
	});
}

export async function createCacheFromCongressRecords(): Promise<void> {
	await createCacheFromRecords({
		folderName: "congress",
		recordsFunction: getCongressRecords,
		transformFunction: (fields: CongressFields) => {
			return {
				name: fields.name ?? "",
				years: fields.years ?? "",
			} satisfies CongressCache;
		},
		fields: ["name", "years"],
	});
}

export type CongressCache = {
	name: string;
	years: string;
};

export async function createCacheFromBillsRecords(): Promise<void> {
	await createCacheFromRecords<BillsFields, BillsCache>({
		folderName: "bills",
		recordsFunction: getBillsRecords,
		transformFunction: (fields) => {
			return {
				id: fields.id ?? undefined,
				title: fields.title ?? undefined,
				summary: fields.summaryWebsite ?? undefined,
				stateLink: fields.stateLink ?? undefined,
				congress: fields.nameFromCongress?.[0] ?? undefined,
				sourcePdf: fields.billPdfUrl ?? undefined,
				date: fields.date ?? undefined,
				yesVotes: fields?.["yes (from votes)"] ?? undefined,
				noVotes: fields?.["no (from votes)"] ?? undefined,
			} satisfies BillsCache;
		},
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
	});
}

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

export async function createCacheFromQueriesRecords(): Promise<void> {
	await createCacheFromRecords({
		folderName: "queries",
		recordsFunction: getQueriesRecords,
	});
}

async function readCache<T>(folderName: string): Promise<T[]> {
	const cacheDir = join(process.cwd(), ".cache", folderName);
	let entries: string[];
	try {
		entries = await readdir(cacheDir);
	} catch {
		return [];
	}
	const items: T[] = [];
	for (const file of entries) {
		if (file.endsWith(".json")) {
			const text = await readFile(join(cacheDir, file), "utf-8");
			items.push(JSON.parse(text) as T);
		}
	}
	return items;
}

export async function getModelsCache(): Promise<ModelFields[]> {
	return readCache<ModelFields>("models");
}

export async function getModelBySlug(
	slug: string
): Promise<ModelFields | undefined> {
	const models = await getModelsCache();
	return models.find((model) => model.slug === slug);
}

export async function getVotesCache(): Promise<VotesCache[]> {
	return readCache<VotesCache>("votes");
}

export async function getPeopleCache(): Promise<PeopleFields[]> {
	return readCache<PeopleFields>("people");
}

export async function getCongressCache(): Promise<CongressCache[]> {
	return readCache<CongressCache>("congress");
}

export async function getBillsCache(): Promise<BillsCache[]> {
	return readCache<BillsCache>("bills");
}

export async function getQueriesCache(): Promise<QueriesFields[]> {
	return readCache<QueriesFields>("queries");
}

export async function getQueriesByAirtableIds(
	airtableIds: string[]
): Promise<QueriesFields[]> {
	const queries: QueriesFields[] = [];
	for (const airtableId of airtableIds) {
		const query = await readCacheFile<QueriesFields>(
			"queries",
			airtableId
		);
		if (query) queries.push(query);
	}
	return queries;
}

export async function getBillsByAirtableIds(
	airtableIds: string[]
): Promise<BillsFields[]> {
	const bills: BillsFields[] = [];
	for (const airtableId of airtableIds) {
		const bill = await readCacheFile<BillsFields>("bills", airtableId);
		if (bill) bills.push(bill);
	}
	return bills;
}

export async function readCacheFile<T>(
	folderName: string,
	id: string
): Promise<T | undefined> {
	try {
		const cacheDir = join(process.cwd(), ".cache", folderName);
		const filePath = join(cacheDir, `${id}.json`);
		const text = await readFile(filePath, "utf-8");
		return JSON.parse(text) as T;
	} catch {
		return undefined;
	}
}
