import { getRecord, getRecords } from "easy-airtable-api";

const apiKey = process.env.AIRTABLE_API_KEY!;
const baseId = process.env.AIRTABLE_BASE_ID!;

export async function getBillsRecord() {
	return undefined;
}

export async function getBillsRecords() {
	return [];
}

export async function getBillsSelectedRecords() {
	return [];
}

export async function getBillsTestRecords() {
	return [];
}

export type BillsFields = {
	title?: string;
	apiId?: number;
	id?: string;
	summary?: string;
	votes?: string[];
	billSummary?: string;
	billFullText?: string;
	date?: string;
	congress?: string[];
	nameFromCongress?: string[];
	stateLink?: string;
	sourceLink?: string;
	billPdfUrl?: string;
	rollCalls?: string[] | number[] | null;
	test?: boolean;
	summaryWebsite?: string;
	"yes (from votes)"?: string[];
	"no (from votes)"?: string[];
};

export async function getVotesRecord(id: string) {
	return await getRecord<VotesFields>({
		apiKey,
		baseId,
		tableId: "votes",
		recordId: id,
	});
}

export async function getVotesRecords() {
	return await getRecords<VotesFields>({
		apiKey,
		baseId,
		tableId: "votes",
		options: { maxRecords: 50_000 },
	});
}

export type VotesFields = {
	apiId?: number;
	description?: string;
	date?: string;
	yes?: string[];
	no?: string[];
	absent?: string[];
	notVoting?: string[];
	bills?: string[];
};

export type PeopleFields = {
	name?: string;
	image?: { url: string }[];
	summary?: string;
	votes?: string[];
	apiId?: number;
};

export async function getPeopleRecord(id: string) {
	return await getRecord<PeopleFields>({
		apiKey,
		baseId,
		tableId: "people",
		recordId: id,
	});
}

export async function getPeopleRecords() {
	return await getRecords<PeopleFields>({
		apiKey,
		baseId,
		tableId: "people",
		options: { maxRecords: 50_000 },
	});
}

export type CongressFields = {
	name?: string;
	years?: string;
	bills?: string[];
};

export async function getCongressRecord() {
	return undefined;
}

export async function getCongressRecords() {
	return [];
}

export type ModelFields = {
	name?: string;
	id?: string;
	created?: string;
	description?: string;
	input_modalities?: string[];
	output_modalities?: string[];
	tokenizer?: string;
	company?: string;
	errors?: string;
	pricing_prompt?: number;
	pricing_completion?: number;
	context_length?: number;
	supported_parameters?: string[];
	test?: boolean;
	politicalIndex?: string[];
	queries?: string[];
	lastImport?: string;
	slug?: string;
	selection?: string;
	featured?: boolean;
	summary?: string;
};

export async function getModelRecord() {
	return undefined;
}

export async function getModelRecords() {
	return [];
}

export const getModelRecordsWithPoliticalIndex = () => {
	return [];
};

export async function getModelRecordsBySlug() {
	return undefined;
}

export async function getModelTestRecords() {
	return [];
}

export async function getModelSelectedRecords() {
	return [];
}

export async function createModelRecord() {
	return undefined;
}

export async function createModelRecords() {
	return [];
}

export async function updateModelRecord() {
	return;
}

export type QueriesFields = {
	vote?: string;
	justification?: string;
	prompt?: string;
	created?: string;
	request_id?: string;
	provider?: string;
	bill?: string[];
	model?: string[];
	model_name?: string;
	object?: string;
	session_id?: string;
	prompt_tokens?: number;
	completion_tokens?: number;
	total_tokens?: number;
	generation_time?: number;
	finish_reason?: string;
	cost?: number;
	reasoning?: string;
	raw_content?: string;
	yesVotes?: string[];
	noVotes?: string[];
	politicalIndex?: string;
	billDate?: string;
};

export async function getQueriesRecord(id: string) {
	return await getRecord<QueriesFields>({
		apiKey,
		baseId,
		tableId: "queries",
		recordId: id,
	});
}

export async function getQueriesRecords() {
	return [];
}

export async function getQueriesByRunIDRecords() {
	return [];
}

export async function getQueriesByBillAndModelRecords() {
	return [];
}
