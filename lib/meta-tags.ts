import { Metadata } from "next";

const SITE_TITLE = "GPT at the Polls";
const SITE_DESCRIPTION =
	"A research project that analyzes the political opinions of large language models.";
const SITE_URL = "https://gptatthepolls.com";
const SITE_IMAGE = "https://gptatthepolls.com/og-image.png";

export function getSiteMetadata({
	title,
	description,
	image,
}: {
	title?: string;
	description?: string;
	image?: {
		url: string;
		width: number;
		height: number;
		type: "image/png" | "image/jpeg";
	};
} = {}): Metadata {
	const meta: Metadata = {
		title: metaPageTitle(title),
		description: description || SITE_DESCRIPTION,
		openGraph: {
			title: metaPageTitle(title),
			description: description || SITE_DESCRIPTION,
			url: SITE_URL,
			images: image
				? [
						{
							url: image.url,
							type: image.type,
							width: image.width,
							height: image.height,
						},
					]
				: [
						{
							url: SITE_IMAGE,
							type: "image/png",
							width: 1200,
							height: 630,
						},
					],
		},
	};

	return meta;
}

export function metaPageTitle(pageTitle?: string): string {
	if (!pageTitle || pageTitle === SITE_TITLE) {
		return SITE_TITLE;
	}

	return `${pageTitle} – ${SITE_TITLE}`;
}
