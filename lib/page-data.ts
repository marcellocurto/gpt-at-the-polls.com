import { getModelBySlug } from "@/lib/api-client";
import { getSiteMetadata } from "@/lib/meta-tags";

export async function getModelPageMetadata(slug: unknown) {
	if (!slug || typeof slug !== "string") {
		return getSiteMetadata({
			title: "Model Not Found",
			description: "The model you are looking for does not exist.",
		});
	}
	const model = await getModelBySlug(slug);
	if (!model) {
		return getSiteMetadata({
			title: "Model Not Found",
			description: "The model you are looking for does not exist.",
		});
	}
	return getSiteMetadata({
		title: model.name,
		description: model.description,
	});
}

export async function getBillsListByModelSlug(modelSlug: string) {

	const queries = model.queries.sort((a, b) => {
		return (
			new Date(b?.bill?.date ?? "").getTime() -
			new Date(a?.bill?.date ?? "").getTime()
		);
	});
}
