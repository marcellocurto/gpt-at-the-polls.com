import { TextLink } from "@/components/links";
import {
	PageLayout,
	H2,
	H3,
	P,
	Section,
	H1,
	Article,
	SubSection,
	List,
	ListItem,
} from "@/components/page";
import { Metadata } from "next";

const title = "Privacy Policy";

export const metadata: Metadata = {
	title,
};

export default function PrivacyPolicyPage() {
	return (
		<PageLayout>
			<Article>
				<H1>{title}</H1>
				<Section>
					<H2>I. The Data Processor</H2>
					<SubSection>
						<P>
							Welcome to my Privacy Policy. This document explains how I
							handle your personal data. I am Marcello Curto, the
							individual responsible for processing your personal data.
							Should you wish to contact me, feel free to do so via my
							email:{" "}
							<TextLink href="mailto:contact-from-web@marcellocurto.com">
								contact-from-web@marcellocurto.com
							</TextLink>
							. For further contact details, please refer to the{" "}
							<strong>
								<TextLink href="/imprint">Imprint</TextLink>
							</strong>{" "}
							on my website.
						</P>
						<P>
							<strong>Personal data</strong> encompasses all information
							that could personally identify you, ranging from names and
							contact information (such as phone numbers, physical
							addresses, and email addresses) to your digital footprint,
							including your IP address.
						</P>
						<P>
							The processing of this information is regulated under the EU
							General Data Protection Regulation (GDPR), to which I
							strictly adhere.
						</P>
					</SubSection>
				</Section>

				<Section>
					<H2>II. Data Collection on This Website</H2>

					<SubSection>
						<H3>1. Access Data and Log Files</H3>
						<P>
							For visitors who browse my website without registering or
							otherwise submitting information, I collect only the data
							that your browser sends to my server, which is essential for
							technical purposes. This includes:
						</P>
						<List>
							<ListItem>Your IP address</ListItem>
							<ListItem>
								The website from which you navigated to my site
							</ListItem>
							<ListItem>The specific pages accessed (URL)</ListItem>
							<ListItem>The date and time of your visit</ListItem>
							<ListItem>
								Your device&apos;s operating system and browser version
								(User-Agent)
							</ListItem>
						</List>
						<P>
							While this data is transmitted to my server, only specific
							information is stored in log files, and IP addresses are
							retained solely for security purposes.
						</P>
						<P>
							The primary purposes for collecting this data include
							ensuring the seamless operation of the website, facilitating
							a user-friendly experience, maintaining system security and
							stability, and other administrative functions.
						</P>
					</SubSection>

					<SubSection>
						<H3>2. Cookies</H3>
						<P>
							My website does not employ cookies for tracking purposes or
							storing user data.
						</P>
					</SubSection>

					<SubSection>
						<H3>3. Website Hosting</H3>
						<P>
							Third-party providers within the European Union offer
							services related to hosting and displaying the website and
							provide infrastructure services, computing capacity, storage,
							databases, maintenance, and security services. Additionally,
							the domain name for this website was registered through
							Vercel Inc., located in the United States, but BunnyWay
							d.o.o., located in Slovenia, is used as the DNS provider.
						</P>
						<P>These infrastructure and service providers are:</P>
						<P>
							netcup GmbH
							<br />
							Daimlerstrasse 25
							<br />
							76185 Karlsruhe
							<br />
							Germany
						</P>
						<P>
							Hetzner Online GmbH
							<br />
							Industriestr. 25
							<br />
							91710 Gunzenhausen
							<br />
							Germany
						</P>
						<P>
							BunnyWay d.o.o.
							<br />
							Dunajska cesta 165
							<br />
							1000 Ljubljana
							<br />
							Slovenia
						</P>
						<P>
							Vercel Inc.
							<br />
							340 S Lemon Ave #4133
							<br />
							Walnut, CA 91789
							<br />
							USA
						</P>
					</SubSection>

					<SubSection>
						<H3>4. Communication via Email</H3>
						<P>
							Your email address is collected primarily for communication
							purposes, respecting the principles of necessity and
							legitimate interest.
						</P>
					</SubSection>
				</Section>

				<Section>
					<SubSection>
						<H2>III. Data Retention Period</H2>
						<P>
							I adhere to the GDPR&apos;s guidelines, storing personal data
							only as long as necessary or as mandated by legal retention
							periods. Should legal obligations require, data processing
							may be limited rather than completely halted, ensuring data
							is only used for its intended purpose.
						</P>
					</SubSection>

					<SubSection>
						<H2>IV. Purpose and Legal Basis for Data Processing</H2>
						<P>
							The processing of your data occurs in compliance with the
							GDPR and the Federal Data Protection Act (BDSG), with the
							specific legal basis depending on the context in which your
							data is obtained.
						</P>
					</SubSection>

					<SubSection>
						<H2>V. Disclosure of Personal Data</H2>
						<P>
							Your IP address is automatically shared with servers when you
							visit a website, including third-party components embedded on
							this site.
						</P>
					</SubSection>

					<SubSection>
						<H2>VI. Your Data Protection Rights</H2>
						<P>Under the GDPR, you have the following rights:</P>
						<List>
							<ListItem>Right to access your personal data</ListItem>
							<ListItem>
								Right to rectification of inaccurate data
							</ListItem>
							<ListItem>
								Right to erasure (&quot;right to be forgotten&quot;)
							</ListItem>
							<ListItem>Right to data portability</ListItem>
							<ListItem>Right to restrict processing</ListItem>
							<ListItem>Right to object to processing</ListItem>
						</List>
					</SubSection>

					<SubSection>
						<H2>VII. Withdrawal of Consent</H2>
						<P>
							You are entitled to withdraw any previously given consent
							regarding your personal data, affecting only future
							processing activities.
						</P>
					</SubSection>

					<SubSection>
						<H2>VIII. Amendments to This Data Protection Declaration</H2>
						<P>
							Should there be a change in the legal framework, my online
							offerings, or my data collection practices, this data
							protection declaration might be updated, subject to your
							consent where necessary.
						</P>
					</SubSection>
				</Section>
			</Article>
		</PageLayout>
	);
}
