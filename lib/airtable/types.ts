export type ThesisFields = {
	thesis?: string;
	agree?: string[];
	neutral?: string[];
	disagree?: string[];
	order?: number;
	elections?: string[];
};

export type AnswersFields = {
	answer?: string;
	explanation?: string;
};

export type ElectionFields = {
	name?: string;
	date?: string;
	thesis?: string[];
	source?: string[];
	link?: string;
	disclaimer?: string;
	id?: string;
};

export type PartiesFields = {
	name?: string;
	fullName?: string;
};

export type DatensatzBTW2025Fields = {
	"Partei: Nr."?: number;
	"Partei: Kurzbezeichnung"?: string[];
	"Partei: Name"?: string[];
	"These: Nr."?: number;
	"These: Titel"?: string;
	"These: These"?: string;
	"Position: Position"?: string[];
	"Position: Begründung"?: string;
};
