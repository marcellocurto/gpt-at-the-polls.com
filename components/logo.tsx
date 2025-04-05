import { CircleCheckBig } from "lucide-react";

export function Logo() {
	return (
		<div className="flex items-center justify-center gap-2 rounded-full px-4 py-2">
			<div>
				<CircleCheckBig className="text-gptorange-700 size-5" />
			</div>
			<p className="text-gptorange-700 text-base leading-0 font-bold italic">
				GPT At the Polls
			</p>
		</div>
	);
}
