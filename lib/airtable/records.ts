import { ThesisFields } from "@/lib/airtable/types";
import {
	createRecord,
	createRecords,
	getRecord,
	getRecords,
	updateRecord,
	updateRecords,
} from "easy-airtable-api";

export async function getThesisRecords() {
	return await getRecords<ThesisFields>({
		apiKey: process.env.AIRTABLE_GPT_API_KEY!,
		baseId: process.env.AIRTABLE_GPT_BASE_ID!,
		tableId: process.env.AIRTABLE_GPT_THESIS_TABLE_ID!,
		options: { maxRecords: 5000 },
	});
}

export async function getThesisRecord(id: string) {
	return await getRecord<ThesisFields>({
		apiKey: process.env.AIRTABLE_GPT_API_KEY!,
		baseId: process.env.AIRTABLE_GPT_BASE_ID!,
		tableId: process.env.AIRTABLE_GPT_THESIS_TABLE_ID!,
		recordId: id,
	});
}

export async function createThesisRecord(fields: ThesisFields) {
	return await createRecord<ThesisFields>({
		apiKey: process.env.AIRTABLE_GPT_API_KEY!,
		baseId: process.env.AIRTABLE_GPT_BASE_ID!,
		tableId: process.env.AIRTABLE_GPT_THESIS_TABLE_ID!,
		fields,
	});
}

export async function createThesisRecords(
	records: { fields: ThesisFields }[]
) {
	return await createRecords<ThesisFields>({
		apiKey: process.env.AIRTABLE_GPT_API_KEY!,
		baseId: process.env.AIRTABLE_GPT_BASE_ID!,
		tableId: process.env.AIRTABLE_GPT_THESIS_TABLE_ID!,
		records,
	});
}

export async function updateThesisRecord({
	id,
	fields,
}: {
	id: string;
	fields: ThesisFields;
}) {
	await updateRecord<ThesisFields>({
		apiKey: process.env.AIRTABLE_GPT_API_KEY!,
		baseId: process.env.AIRTABLE_GPT_BASE_ID!,
		tableId: process.env.AIRTABLE_GPT_THESIS_TABLE_ID!,
		recordId: id,
		fields,
		options: {
			typecast: true,
		},
	});
}

export async function updateThesisRecords(
	records: {
		id: string;
		fields: ThesisFields;
	}[]
) {
	await updateRecords<ThesisFields>({
		apiKey: process.env.AIRTABLE_GPT_API_KEY!,
		baseId: process.env.AIRTABLE_GPT_BASE_ID!,
		tableId: process.env.AIRTABLE_GPT_THESIS_TABLE_ID!,
		records: records,
		options: {
			typecast: true,
		},
	});
}
