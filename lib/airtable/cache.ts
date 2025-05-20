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

async function createCacheFromRecords<T>({
	folderName,
	recordsFunction,
}: {
	folderName: string;
	recordsFunction: () => Promise<{ id: string; fields: T }[]>;
}): Promise<void> {
	const records = await recordsFunction();
	const cacheDir = join(process.cwd(), ".cache", folderName);

	await rm(cacheDir, { recursive: true, force: true });
	await mkdir(cacheDir, { recursive: true });

	for (const record of records) {
		const filePath = join(cacheDir, `${record.id}.json`);
		await Bun.write(filePath, JSON.stringify(record.fields, null, 2));
	}
}

export async function createCacheFromModelsRecords(): Promise<void> {
	await createCacheFromRecords({
		folderName: "models",
		recordsFunction: getModelRecords,
	});
}

export async function createCacheFromVotesRecords(): Promise<void> {
	await createCacheFromRecords({
		folderName: "votes",
		recordsFunction: getVotesRecords,
	});
}

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
	});
}

export async function createCacheFromBillsRecords(): Promise<void> {
	await createCacheFromRecords({
		folderName: "bills",
		recordsFunction: getBillsRecords,
	});
}

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

export async function getVotesCache(): Promise<VotesFields[]> {
	return readCache<VotesFields>("votes");
}

export async function getPeopleCache(): Promise<PeopleFields[]> {
	return readCache<PeopleFields>("people");
}

export async function getCongressCache(): Promise<CongressFields[]> {
	return readCache<CongressFields>("congress");
}

export async function getBillsCache(): Promise<BillsFields[]> {
	return readCache<BillsFields>("bills");
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
