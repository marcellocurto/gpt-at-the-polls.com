import {
	ModelFields,
	BillsFields,
	QueriesFields,
	PeopleFields
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

const API_URL = process.env.API_URL || 'https://api.gpt-at-the-polls.com';

async function fetchFromAPI<T>(endpoint: string): Promise<T> {
	const response = await fetch(`${API_URL}${endpoint}`, {
		cache: 'force-cache'
	});

	if (!response.ok) {
		throw new Error(`Failed to fetch ${endpoint}: ${response.statusText}`);
	}

	return response.json();
}

async function postToAPI<T>(endpoint: string, body: { ids: string[] }): Promise<T> {
	const response = await fetch(`${API_URL}${endpoint}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(body),
		cache: 'force-cache'
	});

	if (!response.ok) {
		throw new Error(`Failed to post to ${endpoint}: ${response.statusText}`);
	}

	return response.json();
}

export async function getModelsCache(): Promise<ModelFields[]> {
	return fetchFromAPI<ModelFields[]>('/api/models');
}

export async function getModelBySlug(slug: string): Promise<ModelFields | undefined> {
	try {
		return await fetchFromAPI<ModelFields>(`/api/models/slug/${slug}`);
	} catch {
		return undefined;
	}
}

export async function getBillsCache(): Promise<BillsCache[]> {
	return fetchFromAPI<BillsCache[]>('/api/bills');
}

export async function getQueriesCache(): Promise<QueriesFields[]> {
	return fetchFromAPI<QueriesFields[]>('/api/queries');
}

export async function getVotesCache(): Promise<VotesCache[]> {
	return fetchFromAPI<VotesCache[]>('/api/votes');
}

export async function getPeopleCache(): Promise<PeopleFields[]> {
	return fetchFromAPI<PeopleFields[]>('/api/people');
}

export async function getCongressCache(): Promise<CongressCache[]> {
	return fetchFromAPI<CongressCache[]>('/api/congress');
}

export async function getQueriesByAirtableIds(airtableIds: string[]): Promise<QueriesFields[]> {
	return postToAPI<QueriesFields[]>('/api/queries/batch', { ids: airtableIds });
}

export async function getBillsByAirtableIds(airtableIds: string[]): Promise<BillsFields[]> {
	return postToAPI<BillsFields[]>('/api/bills/batch', { ids: airtableIds });
}