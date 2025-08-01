import { Bill, Congress, Model, People, Queries, Vote } from "@/lib/types";

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

export async function getModels(): Promise<Model[]> {
	return fetchFromAPI<Model[]>("/api/models");
}

export async function getModelBySlug(
	slug: string
): Promise<Model | undefined> {
	try {
		const models = await getModels();
		return models.find((model) => model.slug === slug);
	} catch {
		return undefined;
	}
}

export async function getBills(): Promise<Bill[]> {
	return fetchFromAPI<Bill[]>("/api/bills");
}

export async function getQueries(): Promise<Queries[]> {
	return fetchFromAPI<Queries[]>("/api/queries");
}

export async function getVotes(): Promise<Vote[]> {
	return fetchFromAPI<Vote[]>("/api/votes");
}

export async function getPeople(): Promise<People[]> {
	return fetchFromAPI<People[]>("/api/people");
}

export async function getCongressCache(): Promise<Congress[]> {
	return fetchFromAPI<Congress[]>("/api/congress");
}
