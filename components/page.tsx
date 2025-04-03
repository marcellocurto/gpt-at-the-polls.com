import React from "react";

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

export function H1({ children, ...props }: HeadingProps) {
	return (
		<h1 className="text-5xl font-bold" {...props}>
			{children}
		</h1>
	);
}

export function H2({ children, ...props }: HeadingProps) {
	return (
		<h2 className="text-3xl font-bold" {...props}>
			{children}
		</h2>
	);
}

export function H3({ children, ...props }: HeadingProps) {
	return (
		<h3 className="text-xl font-bold" {...props}>
			{children}
		</h3>
	);
}

export function P({ children, ...props }: ParagraphProps) {
	return (
		<p className="text-lg" {...props}>
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

export function Article({ children, ...props }: ArticleProps) {
	return (
		<article className="flex flex-col gap-12" {...props}>
			{children}
		</article>
	);
}

export function Section({ children, ...props }: SectionProps) {
	return (
		<div className="flex flex-col gap-6" {...props}>
			{children}
		</div>
	);
}

export function SubSection({ children, ...props }: SectionProps) {
	return (
		<div className="flex flex-col gap-2" {...props}>
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

export function List({ children, ...props }: ListProps) {
	return <ul {...props}>{children}</ul>;
}

export function ListItem({ children, ...props }: ListItemProps) {
	return (
		<li className="list-inside list-disc" {...props}>
			{children}
		</li>
	);
}
