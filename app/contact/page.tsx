import {
	PageLayout,
	H1,
	H2,
	P,
	Section,
	SubSection,
} from "@/components/page";
import { Metadata } from "next";

const title = "Contact";

export const metadata: Metadata = {
	title,
};

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
