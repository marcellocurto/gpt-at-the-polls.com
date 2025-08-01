export type Model = {
	id: string;
	name: string | undefined;
	description: string | undefined;
	slug: string | undefined;
	selection: string | undefined;
	companyName: string | undefined;
	featured: boolean;
	politicalIndex: number;
	queries: Query[];
};

export type Query = {
	id: string;
	created: string | undefined;
	justification: string | undefined;
	sessionId: string | undefined;
	bill: Bill | undefined;
	model: string | undefined;
	politicalIndex: number;
	vote: string | undefined;
};

export type Bill = {
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

export type Vote = {
	description: string | undefined;
	yesPersons: string[] | undefined;
	noPersons: string[] | undefined;
	date: string | undefined;
	billId: string | undefined;
};

export type Congress = {
	name: string;
	years: string;
};

export type People = {
	name: string;
};
