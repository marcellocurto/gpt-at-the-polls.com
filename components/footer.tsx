import { Link } from "@/components/links";

export function Footer() {
	return (
		<footer className="mt-auto px-2">
			<div className="flex gap-6 rounded-t-4xl bg-rose-300/50 pt-8 pb-6 text-xl shadow-md">
				<div className="mx-auto text-sm flex w-full max-w-7xl justify-between px-10">
					<FooterSection>
						<Link href="https://marcellocurto.com" target="_blank">
							A Project by Marcello Curto
						</Link>

						<Link href="https://roark.at" target="_blank">
							Website by ROARK
						</Link>
					</FooterSection>
					<FooterSection>
						<Link href="/privacy">Privacy Policy</Link>

						<Link href="/imprint">Imprint</Link>
					</FooterSection>
				</div>
			</div>
		</footer>
	);
}

function FooterSection({ children }: { children: React.ReactNode }) {
	return <div className="flex gap-4">{children}</div>;
}
