import { Link } from "@/components/links";
import { LogoHeader } from "@/components/logo";

export function Header() {
	return (
		<header className="px-4 pt-4">
			<div className="bg-gptorange-300/80 max-w-7xl mx-auto flex w-full items-center justify-between gap-6 rounded-4xl px-10 pt-8 pb-6 text-xl shadow-md">
				<LogoHeader />
				<nav className="flex gap-4">
					<Link className="font-medium italic" href="/political-index">
						Index
					</Link>
					<Link className="font-medium italic" href="/about">
						About
					</Link>
				</nav>
			</div>
		</header>
	);
}
