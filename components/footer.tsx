import { Link } from "@/components/links";
import { Logo } from "@/components/logo";
import { options } from "@/lib/options";
import { GitHubLogoIcon } from "@radix-ui/react-icons";

const links = [
	{
		title: "General",
		links: [
			{
				label: "Home",
				href: "/",
			},
			{
				label: "Polls",
				href: "/polls",
			},
			{
				label: "About",
				href: "/about",
			},
		],
	},
	{
		title: "Project",
		links: [
			{
				label: "Methodology",
				href: "/methodology",
			},
			{
				label: "Data",
				href: "/data",
			},
			{
				label: "FAQ",
				href: "/faq",
			},
		],
	},
	{
		title: "Legal",
		links: [
			{
				label: "Contact",
				href: "/contact",
			},
			{
				label: "Privacy Policy",
				href: "/privacy",
			},
			{
				label: "Imprint",
				href: "/imprint",
			},
		],
	},
] as const;

export function Footer() {
	return (
		<footer className="mt-auto px-2 text-gptblue-500">
			<div className="bg-gptgreen-300/80 mx-auto flex w-full max-w-7xl flex-col items-center justify-center gap-12 rounded-t-4xl pt-12 pb-4 text-xl shadow-lg">
				<Logo />
				<div className="grid justify-between gap-6 px-10 text-center text-sm sm:grid-cols-3">
					{links.map((section) => (
						<section className="flex flex-col gap-1" key={section.title}>
							{section.links.map((link) => (
								<Link key={link.href} href={link.href}>
									{link.label}
								</Link>
							))}
						</section>
					))}
				</div>
				<div className="flex flex-col items-center justify-between gap-0 text-center text-xs">
					<Link href="https://marcellocurto.com" target="_blank">
						A Project by Marcello Curto
					</Link>

					<Link href="https://roark.at" target="_blank">
						Website by ROARK
					</Link>
				</div>

				<div className="flex flex-col items-center justify-between gap-0 text-center text-xs">
					<Link
						href="https://github.com/marcellocurto/gpt-at-the-polls.com"
						target="_blank"
						className="flex gap-1"
					>
						<GitHubLogoIcon />
						<span>GitHub</span>
					</Link>
				</div>

				<div className="text-center text-xs">
					&copy; {new Date().getFullYear()} {options.siteTitle}
				</div>
			</div>
		</footer>
	);
}
