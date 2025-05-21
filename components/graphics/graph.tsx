import { P } from "@/components/page";

export function PoliticalIndexGraph({
	politicalIndex,
}: {
	politicalIndex?: string[];
}) {
	if (!politicalIndex || politicalIndex.length === 0) {
		return null;
	}

	const countD = politicalIndex.filter((index) => index === "D").length;
	const countR = politicalIndex.filter((index) => index === "R").length;
	const total = politicalIndex.length;

	const percentageD = ((countD / total) * 100).toFixed(0);
	const percentageR = ((countR / total) * 100).toFixed(0);

	return (
		<div className="flex flex-col gap-1">
			<div className="flex justify-between gap-2 px-2">
				<P>{percentageD}%</P>
				<P>{percentageR}%</P>
			</div>
			<div className="flex h-5 w-full gap-1 overflow-hidden rounded-full">
				<div
					className="bg-dem-blue"
					style={{ width: `${percentageD}%` }}
				></div>
				<div
					className="bg-rep-red"
					style={{ width: `${percentageR}%` }}
				></div>
			</div>
			<div className="flex justify-between gap-2 px-2">
				<P className="text-xs">Democrats</P>
				<P className="text-xs">Republicans</P>
			</div>
		</div>
	);
}
