import { Link } from "@/components/links";

export function Footer() {
	return (
		<footer className="mt-auto flex flex-col gap-6 rounded-lg bg-zinc-200 px-8 pt-16 pb-6 text-sm">
			<FooterSection>
				<Link href="https://marcellocurto.com" target="_blank">
					A Project by Marcello Curto
				</Link>

				<Link href="https://roark.at" target="_blank">
					Website by ROARK
				</Link>
			</FooterSection>
			<FooterSection>
				<Link href="/privacy">
					Privacy Policy
				</Link>

				<Link href="/imprint">Imprint</Link>
			</FooterSection>
		</footer>
	);
}

function FooterSection({ children }: { children: React.ReactNode }) {
	return <div className="flex flex-col gap-1">{children}</div>;
}
