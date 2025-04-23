import { generateTypeScriptDefinitions } from "easy-airtable-api";

const types = await generateTypeScriptDefinitions({
	apiKey: process.env.AIRTABLE_GPT_API_KEY!,
	baseId: process.env.AIRTABLE_GPT_BASE_ID!,
	tableNameOrId: process.env.AIRTABLE_GPT_ANSWERS_TABLE_ID!,
});

console.log(types);
