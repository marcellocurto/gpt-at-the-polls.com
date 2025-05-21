import {
	PageLayout,
	H1,
	H2,
	P,
	Section,
	SubSection,
	PageOuterWrapper,
	PageInnerWrapper,
} from "@/components/page";
import { getSiteMetadata } from "@/lib/meta-tags";

const title = "About";
const description = "This is the about page of the project.";

export const metadata = getSiteMetadata({ title, description });

export default function Page() {
	return (
		<PageOuterWrapper>
			<PageInnerWrapper>
				<PageLayout>
					<H1>{title}</H1>

					<Section>
						<H2>In Progress</H2>
						<SubSection>
							<P>More to come soon.</P>
						</SubSection>
					</Section>
				</PageLayout>
			</PageInnerWrapper>
		</PageOuterWrapper>
	);
}
