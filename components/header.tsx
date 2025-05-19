import { Link } from "@/components/links";
import { LogoHeader } from "@/components/logo";

export function Header() {
	return (
		<header className="px-3 pt-3 sm:px-4 sm:pt-4">
			<div className="bg-gptorange-300/80 mx-auto flex w-full max-w-7xl items-center justify-between gap-6 rounded-4xl px-6 pt-6 pb-6 text-xl shadow-md sm:px-10 sm:pt-8">
				<LogoHeader />
				<nav className="flex gap-2 sm:gap-4">
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
