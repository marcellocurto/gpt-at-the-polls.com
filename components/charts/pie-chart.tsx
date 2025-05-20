"use client";

import { Pie, PieChart } from "recharts";

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";

export function PieChartDonut({
	data,
	config,
}: {
	data: { candidate: string; votes: number; fill: string }[];
	config: ChartConfig;
}) {
	return (
		<Card className="flex flex-col">
			<CardHeader className="items-center pb-0">
				<CardTitle>Voting Breakdown</CardTitle>
				<CardDescription>Showing total votes</CardDescription>
			</CardHeader>
			<CardContent className="flex-1 pb-0">
				<ChartContainer
					config={config}
					className="mx-auto aspect-square max-h-[250px]"
				>
					<PieChart>
						<ChartTooltip
							cursor={false}
							content={<ChartTooltipContent hideLabel />}
						/>
						<Pie
							data={data}
							dataKey="votes"
							nameKey="candidate"
							innerRadius={60}
						/>
					</PieChart>
				</ChartContainer>
			</CardContent>
			<CardFooter className="flex-col gap-2 text-sm">
				<div className="flex items-center gap-2 leading-none font-medium">
					Breakdown by candidate
				</div>
				<div className="text-muted-foreground leading-none">
					Showing total votes for each candidate
				</div>
			</CardFooter>
		</Card>
	);
}
