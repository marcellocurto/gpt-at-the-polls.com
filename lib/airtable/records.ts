import {
	getRecord,
	getRecords,
	createRecord,
	createRecords,
	updateRecord,
	updateRecords,
	updateRecordsUpsert,
} from "easy-airtable-api";
import { unstable_cache } from "next/cache";

const apiKey = process.env.AIRTABLE_API_KEY!;
const baseId = process.env.AIRTABLE_BASE_ID!;

export async function getBillsRecord(id: string) {
	return await getRecord<BillsFields>({
		apiKey,
		baseId,
		tableId: "bills",
		recordId: id,
	});
}

export async function getBillsRecords() {
	return await getRecords<BillsFields>({
		apiKey,
		baseId,
		tableId: "bills",
		options: { maxRecords: 50_000 },
	});
}

export async function getBillsSelectedRecords() {
	return await getRecords<BillsFields>({
		apiKey,
		baseId,
		tableId: "bills",
		options: {
			maxRecords: 50_000,
			filterByFormula: "{selection} = 'include'",
		},
	});
}

export async function getBillsTestRecords() {
	return await getRecords<BillsFields>({
		apiKey,
		baseId,
		tableId: "bills",
		options: {
			maxRecords: 50_000,
			filterByFormula: "{test} = TRUE()",
		},
	});
}

export async function upsertBillsRecords(
	records: { fields: BillsFields }[]
) {
	return updateRecordsUpsert<BillsFields>({
		apiKey,
		baseId,
		tableId: "bills",
		records,
		options: {
			fieldsToMergeOn: ["apiId"],
			typecast: true,
		},
	});
}

export async function createBillsRecord(fields: BillsFields) {
	return await createRecord<BillsFields>({
		apiKey,
		baseId,
		tableId: "bills",
		fields,
	});
}

export async function createBillsRecords(
	records: { fields: BillsFields }[]
) {
	return await createRecords<BillsFields>({
		apiKey,
		baseId,
		tableId: "bills",
		records,
	});
}

export async function updateBillsRecord({
	id,
	fields,
}: {
	id: string;
	fields: BillsFields;
}) {
	await updateRecord<BillsFields>({
		apiKey,
		baseId,
		tableId: "bills",
		recordId: id,
		fields,
		options: {
			typecast: true,
		},
	});
}

export async function updateBillsRecords(
	records: {
		id: string;
		fields: BillsFields;
	}[]
) {
	await updateRecords<BillsFields>({
		apiKey,
		baseId,
		tableId: "bills",
		records: records,
		options: {
			typecast: true,
		},
	});
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

export async function createVotesRecord(fields: VotesFields) {
	return await createRecord<VotesFields>({
		apiKey,
		baseId,
		tableId: "votes",
		fields,
	});
}

export async function createVotesRecords(
	records: { fields: VotesFields }[]
) {
	return await createRecords<VotesFields>({
		apiKey,
		baseId,
		tableId: "votes",
		records,
	});
}

export async function updateVotesRecord({
	id,
	fields,
}: {
	id: string;
	fields: VotesFields;
}) {
	await updateRecord<VotesFields>({
		apiKey,
		baseId,
		tableId: "votes",
		recordId: id,
		fields,
		options: {
			typecast: true,
		},
	});
}

export async function upsertVotesRecords(
	records: {
		fields: VotesFields;
	}[]
) {
	return updateRecordsUpsert<VotesFields>({
		apiKey,
		baseId,
		tableId: "votes",
		records,
		options: {
			fieldsToMergeOn: ["apiId"],
			typecast: true,
		},
	});
}

export async function updateVotesRecords(
	records: {
		id: string;
		fields: VotesFields;
	}[]
) {
	await updateRecords<VotesFields>({
		apiKey,
		baseId,
		tableId: "votes",
		records: records,
		options: {
			typecast: true,
		},
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

export async function createPeopleRecord(fields: PeopleFields) {
	return await createRecord<PeopleFields>({
		apiKey,
		baseId,
		tableId: "people",
		fields,
	});
}

export async function createPeopleRecords(
	records: { fields: PeopleFields }[]
) {
	return await createRecords<PeopleFields>({
		apiKey,
		baseId,
		tableId: "people",
		records,
	});
}

export async function updatePeopleRecord({
	id,
	fields,
}: {
	id: string;
	fields: PeopleFields;
}) {
	await updateRecord<PeopleFields>({
		apiKey,
		baseId,
		tableId: "people",
		recordId: id,
		fields,
		options: {
			typecast: true,
		},
	});
}

export async function updatePeopleRecords(
	records: {
		id: string;
		fields: PeopleFields;
	}[]
) {
	await updateRecords<PeopleFields>({
		apiKey,
		baseId,
		tableId: "people",
		records: records,
		options: {
			typecast: true,
		},
	});
}

export type CongressFields = {
	name?: string;
	years?: string;
	bills?: string[];
};

export async function getCongressRecord(id: string) {
	return await getRecord<CongressFields>({
		apiKey,
		baseId,
		tableId: "congress",
		recordId: id,
	});
}

export async function getCongressRecords() {
	return await getRecords<CongressFields>({
		apiKey,
		baseId,
		tableId: "congress",
		options: { maxRecords: 50_000 },
	});
}

export async function createCongressRecord(fields: CongressFields) {
	return await createRecord<CongressFields>({
		apiKey,
		baseId,
		tableId: "congress",
		fields,
	});
}

export async function createCongressRecords(
	records: { fields: CongressFields }[]
) {
	return await createRecords<CongressFields>({
		apiKey,
		baseId,
		tableId: "congress",
		records,
	});
}

export async function updateCongressRecord({
	id,
	fields,
}: {
	id: string;
	fields: CongressFields;
}) {
	await updateRecord<CongressFields>({
		apiKey,
		baseId,
		tableId: "congress",
		recordId: id,
		fields,
		options: {
			typecast: true,
		},
	});
}

export async function updateCongressRecords(
	records: {
		id: string;
		fields: CongressFields;
	}[]
) {
	await updateRecords<CongressFields>({
		apiKey,
		baseId,
		tableId: "congress",
		records: records,
		options: {
			typecast: true,
		},
	});
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
};

export async function getModelRecord(id: string) {
	return await getRecord<ModelFields>({
		apiKey,
		baseId,
		tableId: "models",
		recordId: id,
	});
}

export async function getModelRecords() {
	return await getRecords<ModelFields>({
		apiKey,
		baseId,
		tableId: "models",
		options: { maxRecords: 50_000 },
	});
}

export const getModelRecordsWithPoliticalIndex = unstable_cache(
	async () => {
		return await getRecords<ModelFields>({
			apiKey,
			baseId,
			tableId: "models",
			options: {
				maxRecords: 50_000,
				filterByFormula: `{politicalIndex}`,
			},
		});
	},
	["model-records-with-political-index"],
	{
		revalidate: 300,
	}
);

export async function getModelRecordsBySlug(slug: string) {
	const models = await getModelRecordsWithPoliticalIndex();
	const model = models.filter((model) => model.fields.slug === slug);
	return model?.[0] ?? undefined;
}

export async function getModelTestRecords() {
	return await getRecords<ModelFields>({
		apiKey,
		baseId,
		tableId: "models",
		options: {
			maxRecords: 50_000,
			filterByFormula: "{test} = TRUE()",
		},
	});
}

export async function getModelSelectedRecords() {
	return await getRecords<ModelFields>({
		apiKey,
		baseId,
		tableId: "models",
		options: {
			maxRecords: 50_000,
			filterByFormula: "{selection} = 'include'",
		},
	});
}

export async function createModelRecord(fields: ModelFields) {
	return await createRecord<ModelFields>({
		apiKey,
		baseId,
		tableId: "models",
		fields,
	});
}

export async function createModelRecords(
	records: { fields: ModelFields }[]
) {
	return await createRecords<ModelFields>({
		apiKey,
		baseId,
		tableId: "models",
		records,
	});
}

export async function updateModelRecord({
	id,
	fields,
}: {
	id: string;
	fields: ModelFields;
}) {
	await updateRecord<ModelFields>({
		apiKey,
		baseId,
		tableId: "models",
		recordId: id,
		fields,
		options: {
			typecast: true,
		},
	});
}

export async function updateModelRecords(
	records: {
		id: string;
		fields: ModelFields;
	}[]
) {
	await updateRecords<ModelFields>({
		apiKey,
		baseId,
		tableId: "models",
		records: records,
		options: {
			typecast: true,
		},
	});
}

export async function upsertModelRecords(
	records: { fields: ModelFields }[]
) {
	return updateRecordsUpsert<ModelFields>({
		apiKey,
		baseId,
		tableId: "models",
		records,
		options: {
			fieldsToMergeOn: ["id"],
			typecast: true,
		},
	});
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
	return await getRecords<QueriesFields>({
		apiKey,
		baseId,
		tableId: "queries",
		options: { maxRecords: 50_000 },
	});
}

export async function getQueriesByRunIDRecords(runId: string) {
	return await getRecords<QueriesFields>({
		apiKey,
		baseId,
		tableId: "queries",
		options: {
			maxRecords: 50_000,
			filterByFormula: `{session_id} = '${runId}'`,
		},
	});
}

export async function getQueriesByBillAndModelRecords(runId: string) {
	const queries = await getQueriesByRunIDRecords(runId);
	const queryKeys = new Set<string>();

	for (const { fields } of queries) {
		const billIdFromQuery = fields?.bill?.[0] ?? null;
		const modelIdFromQuery = fields?.model?.[0] ?? null;
		if (billIdFromQuery && modelIdFromQuery) {
			queryKeys.add(billIdFromQuery + modelIdFromQuery);
		}
	}

	return queryKeys;
}

export async function createQueriesRecord(fields: QueriesFields) {
	return await createRecord<QueriesFields>({
		apiKey,
		baseId,
		tableId: "queries",
		fields,
	});
}

export async function createQueriesRecords(
	records: { fields: QueriesFields }[]
) {
	return await createRecords<QueriesFields>({
		apiKey,
		baseId,
		tableId: "queries",
		records,
	});
}

export async function updateQueriesRecord({
	id,
	fields,
}: {
	id: string;
	fields: QueriesFields;
}) {
	await updateRecord<QueriesFields>({
		apiKey,
		baseId,
		tableId: "queries",
		recordId: id,
		fields,
		options: {
			typecast: true,
		},
	});
}

export async function updateQueriesRecords(
	records: {
		id: string;
		fields: QueriesFields;
	}[]
) {
	await updateRecords<QueriesFields>({
		apiKey,
		baseId,
		tableId: "queries",
		records: records,
		options: {
			typecast: true,
		},
	});
}

export async function upsertQueriesRecords(
	records: { fields: QueriesFields }[]
) {
	return updateRecordsUpsert<QueriesFields>({
		apiKey,
		baseId,
		tableId: "queries",
		records,
		options: {
			fieldsToMergeOn: ["request_id"],
			typecast: true,
		},
	});
}
