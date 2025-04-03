import { TextLink } from "@/components/links";
import {
	PageLayout,
	H1,
	H2,
	P,
	Section,
	SubSection,
} from "@/components/page";
import { Metadata } from "next";

const title = "Imprint";

export const metadata: Metadata = {
	title,
};

export default function ImprintPage() {
	return (
		<PageLayout>
			<H1>{title}</H1>
			<Section>
				<H2>Responsible for content</H2>
				<P>
					<strong>Marcello Curto</strong>
					<br />
					Elßlergasse 20/4
					<br />
					1130 Vienna
					<br />
					Austria
				</P>
				<P>
					<TextLink href="mailto:contact-from-web@marcellocurto.com">
						contact-from-web@marcellocurto.com
					</TextLink>
				</P>
			</Section>

			<Section>
				<H2>Copyright</H2>
				<SubSection>
					<P>
						Should you desire to employ my images or the results of my
						work, I invite you to reach out to me directly. The contents
						and creations found on this website are protected under the
						scope of Austrian Copyright Law.
					</P>
					<P>
						Any form of reproduction, modification, dissemination, or
						utilization that extends beyond the bounds expressly permitted
						by copyright legislation necessitates my prior written consent.
					</P>
					<P>
						In instances where this website showcases content not
						originated by myself, the copyrights of third-parties are duly
						acknowledged and their contributions clearly indicated as such.
						Should you encounter any content that infringes upon copyright,
						I implore you to inform me.
					</P>
					<P>
						Upon notice of any legal violations, I shall endeavour to
						remove the implicated content forthwith.
					</P>
				</SubSection>
			</Section>

			<Section>
				<H2>
					Alternative Dispute Resolution in Accordance with Article 14(1)
					of the ODR Regulation and § 36 of the VSBG
				</H2>
				<SubSection>
					<P>
						The European Commission avails a platform for online dispute
						resolution (ODR), accessible at{" "}
						<TextLink
							href="http://ec.europa.eu/consumers/odr/"
							target="_blank"
							rel="noopener noreferrer"
						>
							http://ec.europa.eu/consumers/odr/
						</TextLink>
						.
					</P>
					<P>
						It is pertinent to note, however, that I am neither obliged nor
						inclined to engage in dispute resolution proceedings before a
						consumer arbitration service.
					</P>
				</SubSection>
			</Section>

			<Section>
				<H2>Objection to Unsolicited Advertising Emails</H2>
				<SubSection>
					<P>
						In accordance with Article 21 of the GDPR, the use of contact
						details (published in adherence to imprint obligations) for the
						transmission of unsolicited advertising and informational
						materials is hereby expressly forbidden.
					</P>
					<P>
						Should there be an unauthorized dispatch of advertising
						information, particularly through spam emails or unsolicited
						postal advertisements, I reserve the right to initiate legal
						proceedings.
					</P>
				</SubSection>
			</Section>
		</PageLayout>
	);
}
