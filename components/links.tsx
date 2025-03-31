import Link from "next/link";
import { twMerge } from "tailwind-merge";

function SiteLink({ href, children, className, ...rest }: React.ComponentProps<typeof Link>) {
	return (
		<Link
			href={href}
			className={twMerge("transition-colors hover:text-pink-700", className)}
			{...rest}
		>
			{children}
		</Link>
	);
}

export { SiteLink as Link };
