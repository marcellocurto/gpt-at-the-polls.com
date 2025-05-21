import { cn } from "@/lib/utils";

export function PageOuterWrapper({
	children,
	className,
	...props
}: {
	children: React.ReactNode;
	className?: string;
}) {
	return (
		<div
			className={cn("flex flex-col gap-3 p-3 sm:gap-4 sm:p-4", className)}
			{...props}
		>
			{children}
		</div>
	);
}

export function PageInnerWrapper({
	children,
	className,
	...props
}: {
	children: React.ReactNode;
	className?: string;
}) {
	return (
		<div
			className={cn(
				"mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-8 rounded-4xl bg-zinc-200/80 px-4 py-8 shadow-lg sm:p-10 md:py-16",
				className
			)}
			{...props}
		>
			{children}
		</div>
	);
}

export function PageLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="prose prose-invert mx-auto flex max-w-7xl flex-col gap-8 p-12">
			{children}
		</div>
	);
}

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
	children: React.ReactNode;
}

interface ParagraphProps
	extends React.HTMLAttributes<HTMLParagraphElement> {
	children: React.ReactNode;
}

export function H1({ children, className, ...props }: HeadingProps) {
	return (
		<h1 className={cn("text-5xl font-bold", className)} {...props}>
			{children}
		</h1>
	);
}

export function H2({ children, className, ...props }: HeadingProps) {
	return (
		<h2 className={cn("text-3xl font-bold", className)} {...props}>
			{children}
		</h2>
	);
}

export function H3({ children, className, ...props }: HeadingProps) {
	return (
		<h3 className={cn("text-xl font-bold", className)} {...props}>
			{children}
		</h3>
	);
}

export function H4({ children, className, ...props }: HeadingProps) {
	return (
		<h4 className={cn("text-lg font-bold", className)} {...props}>
			{children}
		</h4>
	);
}

export function H5({ children, className, ...props }: HeadingProps) {
	return (
		<h5 className={cn("text-base font-bold", className)} {...props}>
			{children}
		</h5>
	);
}

export function H6({ children, className, ...props }: HeadingProps) {
	return (
		<h6 className={cn("text-sm font-bold", className)} {...props}>
			{children}
		</h6>
	);
}

export function P({ children, className, ...props }: ParagraphProps) {
	return (
		<p className={cn("text-lg", className)} {...props}>
			{children}
		</p>
	);
}

interface SectionProps extends React.HTMLAttributes<HTMLDivElement> {
	children: React.ReactNode;
}

interface ArticleProps extends React.HTMLAttributes<HTMLDivElement> {
	children: React.ReactNode;
}

export function Article({ children, className, ...props }: ArticleProps) {
	return (
		<article className={cn("flex flex-col gap-12", className)} {...props}>
			{children}
		</article>
	);
}

export function Section({ children, className, ...props }: SectionProps) {
	return (
		<div className={cn("flex flex-col gap-6", className)} {...props}>
			{children}
		</div>
	);
}

export function SubSection({
	children,
	className,
	...props
}: SectionProps) {
	return (
		<div className={cn("flex flex-col gap-2", className)} {...props}>
			{children}
		</div>
	);
}

interface ListProps extends React.HTMLAttributes<HTMLUListElement> {
	children: React.ReactNode;
}

interface ListItemProps extends React.HTMLAttributes<HTMLLIElement> {
	children: React.ReactNode;
}

export function List({ children, className, ...props }: ListProps) {
	return (
		<ul className={cn("list-inside list-disc", className)} {...props}>
			{children}
		</ul>
	);
}

export function ListItem({
	children,
	className,
	...props
}: ListItemProps) {
	return (
		<li className={cn("list-inside list-disc", className)} {...props}>
			{children}
		</li>
	);
}
