import { options } from "@/lib/options";
import { CircleCheckBig } from "lucide-react";
import Link from "next/link";

export function LogoHeader() {
	return (
		<div>
			<Link className="group" href="/">
				<div className="flex items-center justify-center gap-1 rounded-full py-2">
					<div>
						<CircleCheckBig className="group-hover:text-gptorange-100 size-6 text-zinc-950 transition-all group-hover:scale-105 group-hover:rotate-2" />
					</div>
					<p className="text-lg leading-0 font-bold text-zinc-950 italic">
						{options.siteTitle}
					</p>
				</div>
			</Link>
		</div>
	);
}

export function Logo() {
	return (
		<div className="flex items-center justify-center gap-2 rounded-full px-4 py-2">
			<div>
				<CircleCheckBig className="text-gptorange-700 size-5" />
			</div>
			<p className="text-gptorange-700 text-xl leading-0 font-bold italic">
				{options.siteTitle}
			</p>
		</div>
	);
}
