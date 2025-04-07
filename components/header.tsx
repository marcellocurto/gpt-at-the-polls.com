import { Link } from "@/components/links";
import { LogoHeader } from "@/components/logo";

export function Header() {
	return (
		<header className="px-2">
			<div className="bg-gptorange-300 max-w-7xl mx-auto flex w-full items-center justify-between gap-6 rounded-b-4xl px-10 pt-8 pb-6 text-xl shadow-lg">
				<LogoHeader />
				<nav className="flex gap-4">
					<Link className="font-medium italic" href="/polls">
						Polls
					</Link>
					<Link className="font-medium italic" href="/about">
						About
					</Link>
				</nav>
			</div>
		</header>
	);
}
