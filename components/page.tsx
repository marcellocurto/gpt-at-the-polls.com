import { cn } from "@/lib/utils";

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
