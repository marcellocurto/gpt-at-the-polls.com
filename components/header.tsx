import { Link } from "@/components/links";

export function Header() {
	return (
		<header className="px-2">
			<div className="flex gap-6 rounded-b-4xl bg-gptorange-300 pt-8 pb-6 text-xl shadow-md">
				<div className="mx-auto flex w-full max-w-7xl justify-between px-10">
					<div>
						<Link className="font-black italic" href="/">
							GPT At The Polls
						</Link>
					</div>
					<nav className="flex gap-4">
						<Link className="font-medium italic" href="/polls">
							Polls
						</Link>
						<Link className="font-medium italic" href="/about">
							About
						</Link>
					</nav>
				</div>
			</div>
		</header>
	);
}
