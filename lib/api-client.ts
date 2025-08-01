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

export type ModelCache = {
	name: string | undefined;
	description: string | undefined;
	slug: string | undefined;
	queries: Queries[];
	selection: string | undefined;
	companyName: string | undefined;
};

export type Queries = {
	created: string | undefined;
	justification: string | undefined;
	session_id: string | undefined;
	bill: BillsCache | undefined;
	model: string | undefined;
	politicalIndex: number;
	vote: string | undefined;
};

const API_URL = process.env.API_URL!;

async function fetchFromAPI<T>(endpoint: string): Promise<T> {
	const response = await fetch(`${API_URL}${endpoint}`, {
		cache: "force-cache",
	});

	if (!response.ok) {
		throw new Error(`Failed to fetch ${endpoint}: ${response.statusText}`);
	}

	return response.json();
}

async function postToAPI<T>(
	endpoint: string,
	body: { ids: string[] }
): Promise<T> {
	const response = await fetch(`${API_URL}${endpoint}`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(body),
		cache: "force-cache",
	});

	if (!response.ok) {
		throw new Error(
			`Failed to post to ${endpoint}: ${response.statusText}`
		);
	}

	return response.json();
}

export async function getModels(): Promise<ModelCache[]> {
	return fetchFromAPI<ModelCache[]>("/api/models");
}

export async function getModelBySlug(
	slug: string
): Promise<ModelCache | undefined> {
	try {
		const models = await getModels();
		return models.find((model) => model.slug === slug);
	} catch {
		return undefined;
	}
}

export async function getBills(): Promise<BillsCache[]> {
	return fetchFromAPI<BillsCache[]>("/api/bills");
}

export async function getQueries(): Promise<QueriesFields[]> {
	return fetchFromAPI<QueriesFields[]>("/api/queries");
}

export async function getVotes(): Promise<VotesCache[]> {
	return fetchFromAPI<VotesCache[]>("/api/votes");
}

export async function getPeople(): Promise<PeopleFields[]> {
	return fetchFromAPI<PeopleFields[]>("/api/people");
}

export async function getCongressCache(): Promise<CongressCache[]> {
	return fetchFromAPI<CongressCache[]>("/api/congress");
}
