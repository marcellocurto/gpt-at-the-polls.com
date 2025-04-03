import {
	PageLayout,
	H1,
	H2,
	P,
	Section,
	SubSection,
} from "@/components/page";
import { Metadata } from "next";

const title = "About";

export const metadata: Metadata = {
	title,
};

export default function AboutPage() {
	return (
		<PageLayout>
			<H1>{title}</H1>

			<Section>
				<H2>In Progess</H2>
				<SubSection>
					<P>More to come soon.</P>
				</SubSection>
			</Section>
		</PageLayout>
	);
}
