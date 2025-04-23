export type ThesisFields = {
	These?: string;
	"Stimme zu"?: string[];
	Neutral?: string[];
	"Stimme nicht zu"?: string[];
	Reihenfolge?: number;
	Wahlen?: string[];
};

export type AnswersFields = {
	Name?: string;
	Notes?: string;
	Status?: string;
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

export type ElectionFields = {
	Name?: string;
	Wahldatum?: string;
	Fragen?: string[];
	Quelle?: string[];
	Link?: string;
};

export type PartiesFields = {
	Name?: string;
	"Name (kurz)"?: string[];
	"Name (lang)"?: string[];
	"Stimme zu"?: string[];
	Neutral?: string[];
	"Stimme nicht zu"?: string[];
};
