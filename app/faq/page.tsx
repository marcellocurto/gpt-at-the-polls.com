import {
	PageLayout,
	H1,
	H2,
	P,
	Section,
	SubSection,
} from "@/components/page";
import { getSiteMetadata } from "@/lib/meta-tags";

const title = "FAQ";
const description = "This is the FAQ of the project.";

export const metadata = getSiteMetadata({ title, description });

export default function Page() {
	return (
		<PageLayout>
			<H1>{title}</H1>

			<Section>
				<H2>In Progress</H2>
				<SubSection>
					<P>More to come soon.</P>
				</SubSection>
			</Section>
		</PageLayout>
	);
}
