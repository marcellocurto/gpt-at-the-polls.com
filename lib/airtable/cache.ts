import {
	getBillsRecords,
	getCongressRecords,
	getModelRecords,
	getPeopleRecords,
	getQueriesRecords,
	getVotesRecords,
} from "@/lib/airtable/records";
import { rm, mkdir } from "node:fs/promises";
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
