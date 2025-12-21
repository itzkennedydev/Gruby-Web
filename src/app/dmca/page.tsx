import type { Metadata } from "next";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "DMCA Policy | Gruby",
  description: "Gruby DMCA and Copyright Policy - Effective December 15, 2025",
};

export default function DMCAPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12 md:px-8 md:py-16">
        <div
          className="prose prose-lg max-w-none"
          style={{
            lineHeight: "1.75",
          }}
        >
          <h1
            className="mb-6 font-semibold sm:mb-4"
            style={{
              fontSize: "clamp(1.875rem, 4vw + 1rem, 3rem)",
              lineHeight: "1.2",
            }}
          >
            DMCA COPYRIGHT POLICY
          </h1>

          <p
            className="mb-8 text-gray-600 sm:mb-6"
            style={{
              fontSize: "clamp(0.875rem, 1vw + 0.5rem, 0.875rem)",
              lineHeight: "1.6",
            }}
          >
            <strong>Effective Date: December 15, 2025</strong>
          </p>

          <p
            className="mb-10 sm:mb-8"
            style={{
              fontSize: "clamp(1rem, 1.25vw + 0.75rem, 1.125rem)",
              lineHeight: "1.75",
            }}
          >
            Gruby respects the intellectual property rights of others and
            expects our users to do the same. This policy explains how we
            respond to claims of copyright infringement in accordance with the
            Digital Millennium Copyright Act (&quot;DMCA&quot;) and other
            applicable laws.
          </p>

          <section className="mb-10 sm:mb-8">
            <h2
              className="mb-6 mt-10 font-semibold sm:mb-4 sm:mt-8"
              style={{
                fontSize: "clamp(1.5rem, 2.5vw + 0.75rem, 1.875rem)",
                lineHeight: "1.3",
              }}
            >
              1. OUR POLICY
            </h2>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              It is our policy to:
            </p>
            <ul
              className="mb-6 list-disc pl-6 sm:mb-4"
              style={{ lineHeight: "1.75" }}
            >
              <li className="mb-2">
                Respond promptly to notices of alleged copyright infringement
              </li>
              <li className="mb-2">
                Remove or disable access to material that is claimed to be
                infringing
              </li>
              <li className="mb-2">
                Terminate the accounts of repeat infringers in appropriate
                circumstances
              </li>
            </ul>
          </section>

          <section className="mb-10 sm:mb-8">
            <h2
              className="mb-6 mt-10 font-semibold sm:mb-4 sm:mt-8"
              style={{
                fontSize: "clamp(1.5rem, 2.5vw + 0.75rem, 1.875rem)",
                lineHeight: "1.3",
              }}
            >
              2. FILING A COPYRIGHT INFRINGEMENT NOTICE
            </h2>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              If you believe that content on Gruby infringes your copyright, you
              may submit a DMCA takedown notice to our designated Copyright
              Agent. Your notice must include the following information:
            </p>

            <h3
              className="mb-4 mt-8 font-semibold sm:mb-3 sm:mt-6"
              style={{
                fontSize: "clamp(1.25rem, 2vw + 0.5rem, 1.5rem)",
                lineHeight: "1.4",
              }}
            >
              2.1 Required Information
            </h3>
            <ul
              className="mb-6 list-disc pl-6 sm:mb-4"
              style={{ lineHeight: "1.75" }}
            >
              <li className="mb-2">
                <strong>Identification of the copyrighted work:</strong>{" "}
                Describe the copyrighted work you claim has been infringed. If
                multiple works are involved, provide a representative list.
              </li>
              <li className="mb-2">
                <strong>Identification of the infringing material:</strong>{" "}
                Provide the URL or other specific location of the material you
                claim is infringing, with sufficient detail for us to locate it.
              </li>
              <li className="mb-2">
                <strong>Your contact information:</strong> Include your name,
                address, telephone number, and email address.
              </li>
              <li className="mb-2">
                <strong>Good faith statement:</strong> Include a statement that
                you have a good faith belief that the use of the material is not
                authorized by the copyright owner, its agent, or the law.
              </li>
              <li className="mb-2">
                <strong>Accuracy statement:</strong> Include a statement that
                the information in the notice is accurate, and under penalty of
                perjury, that you are authorized to act on behalf of the
                copyright owner.
              </li>
              <li className="mb-2">
                <strong>Physical or electronic signature:</strong> Include your
                physical or electronic signature.
              </li>
            </ul>

            <h3
              className="mb-4 mt-8 font-semibold sm:mb-3 sm:mt-6"
              style={{
                fontSize: "clamp(1.25rem, 2vw + 0.5rem, 1.5rem)",
                lineHeight: "1.4",
              }}
            >
              2.2 Where to Send Notice
            </h3>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              Send your DMCA notice to our designated Copyright Agent:
            </p>
            <div
              className="mb-6 rounded-lg bg-gray-50 p-6 sm:mb-4"
              style={{ lineHeight: "1.75" }}
            >
              <p className="mb-2">
                <strong>Gruby Copyright Agent</strong>
              </p>
              <p className="mb-2">
                Email:{" "}
                <a
                  href="mailto:dmca@gruby.app"
                  className="text-[#222222] hover:underline"
                >
                  dmca@gruby.app
                </a>
              </p>
              <p>Subject Line: &quot;DMCA Takedown Notice&quot;</p>
            </div>
          </section>

          <section className="mb-10 sm:mb-8">
            <h2
              className="mb-6 mt-10 font-semibold sm:mb-4 sm:mt-8"
              style={{
                fontSize: "clamp(1.5rem, 2.5vw + 0.75rem, 1.875rem)",
                lineHeight: "1.3",
              }}
            >
              3. COUNTER-NOTIFICATION
            </h2>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              If you believe that content you posted was removed or disabled as
              a result of a mistake or misidentification, you may file a
              counter-notification with our Copyright Agent.
            </p>

            <h3
              className="mb-4 mt-8 font-semibold sm:mb-3 sm:mt-6"
              style={{
                fontSize: "clamp(1.25rem, 2vw + 0.5rem, 1.5rem)",
                lineHeight: "1.4",
              }}
            >
              3.1 Required Information
            </h3>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              Your counter-notification must include:
            </p>
            <ul
              className="mb-6 list-disc pl-6 sm:mb-4"
              style={{ lineHeight: "1.75" }}
            >
              <li className="mb-2">Your physical or electronic signature</li>
              <li className="mb-2">
                Identification of the material that was removed and its location
                before removal
              </li>
              <li className="mb-2">
                A statement under penalty of perjury that you have a good faith
                belief the material was removed or disabled as a result of
                mistake or misidentification
              </li>
              <li className="mb-2">Your name, address, and telephone number</li>
              <li className="mb-2">
                A statement that you consent to the jurisdiction of the Federal
                District Court for the judicial district in which your address
                is located (or if outside the US, any judicial district in which
                Gruby may be found)
              </li>
              <li className="mb-2">
                A statement that you will accept service of process from the
                person who filed the original DMCA notice or their agent
              </li>
            </ul>

            <h3
              className="mb-4 mt-8 font-semibold sm:mb-3 sm:mt-6"
              style={{
                fontSize: "clamp(1.25rem, 2vw + 0.5rem, 1.5rem)",
                lineHeight: "1.4",
              }}
            >
              3.2 Counter-Notification Process
            </h3>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              Upon receiving a valid counter-notification, we will forward it to
              the party who submitted the original DMCA notice. If that party
              does not file a court action seeking an order to restrain you from
              engaging in the allegedly infringing activity within 10-14
              business days, we may restore the removed content.
            </p>
          </section>

          <section className="mb-10 sm:mb-8">
            <h2
              className="mb-6 mt-10 font-semibold sm:mb-4 sm:mt-8"
              style={{
                fontSize: "clamp(1.5rem, 2.5vw + 0.75rem, 1.875rem)",
                lineHeight: "1.3",
              }}
            >
              4. REPEAT INFRINGER POLICY
            </h2>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              Gruby will terminate the accounts of users who are repeat
              infringers in appropriate circumstances. A &quot;repeat
              infringer&quot; is a user who has been notified of infringing
              activity more than twice or whose content has been removed from
              the Service more than twice.
            </p>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              We reserve the right to terminate accounts in our sole discretion,
              including accounts that have received only one notice of
              infringement if the circumstances warrant.
            </p>
          </section>

          <section className="mb-10 sm:mb-8">
            <h2
              className="mb-6 mt-10 font-semibold sm:mb-4 sm:mt-8"
              style={{
                fontSize: "clamp(1.5rem, 2.5vw + 0.75rem, 1.875rem)",
                lineHeight: "1.3",
              }}
            >
              5. RECIPE COPYRIGHT CONSIDERATIONS
            </h2>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              Important note about recipes and copyright:
            </p>
            <ul
              className="mb-6 list-disc pl-6 sm:mb-4"
              style={{ lineHeight: "1.75" }}
            >
              <li className="mb-2">
                <strong>Ingredients lists</strong> are generally not
                copyrightable (copyright law protects the expression, not the
                facts or ideas)
              </li>
              <li className="mb-2">
                <strong>Instructions and descriptions</strong> can be
                copyrighted if they contain creative expression
              </li>
              <li className="mb-2">
                <strong>Photos and videos</strong> are copyrightable and should
                not be used without permission
              </li>
              <li className="mb-2">
                <strong>Exact copying</strong> of entire recipes (including
                instructions and descriptions) from cookbooks or websites may
                infringe copyright
              </li>
            </ul>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              When sharing recipes, we encourage you to:
            </p>
            <ul
              className="mb-6 list-disc pl-6 sm:mb-4"
              style={{ lineHeight: "1.75" }}
            >
              <li className="mb-2">
                Use your own words to describe the recipe
              </li>
              <li className="mb-2">Take your own photos and videos</li>
              <li className="mb-2">
                Give credit and attribution when inspired by someone else&apos;s
                work
              </li>
              <li className="mb-2">
                Seek permission before posting substantial portions of
                copyrighted recipes
              </li>
            </ul>
          </section>

          <section className="mb-10 sm:mb-8">
            <h2
              className="mb-6 mt-10 font-semibold sm:mb-4 sm:mt-8"
              style={{
                fontSize: "clamp(1.5rem, 2.5vw + 0.75rem, 1.875rem)",
                lineHeight: "1.3",
              }}
            >
              6. FALSE CLAIMS
            </h2>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              Under Section 512(f) of the DMCA, any person who knowingly
              materially misrepresents that material is infringing, or that
              material was removed or disabled by mistake, may be subject to
              liability. We reserve the right to seek damages from any party who
              submits a notice or counter-notification in bad faith.
            </p>
          </section>

          <section className="mb-10 sm:mb-8">
            <h2
              className="mb-6 mt-10 font-semibold sm:mb-4 sm:mt-8"
              style={{
                fontSize: "clamp(1.5rem, 2.5vw + 0.75rem, 1.875rem)",
                lineHeight: "1.3",
              }}
            >
              7. MODIFICATIONS TO POLICY
            </h2>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              We reserve the right to modify this DMCA Policy at any time.
              Changes will be effective immediately upon posting to this page.
              Your continued use of the Service constitutes acceptance of any
              changes.
            </p>
          </section>

          <section className="mb-10 sm:mb-8">
            <h2
              className="mb-6 mt-10 font-semibold sm:mb-4 sm:mt-8"
              style={{
                fontSize: "clamp(1.5rem, 2.5vw + 0.75rem, 1.875rem)",
                lineHeight: "1.3",
              }}
            >
              8. CONTACT INFORMATION
            </h2>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              For all copyright-related inquiries, including DMCA notices and
              counter-notifications, contact our designated Copyright Agent:
            </p>
            <div
              className="mb-6 rounded-lg bg-gray-50 p-6 sm:mb-4"
              style={{ lineHeight: "1.75" }}
            >
              <p className="mb-2">
                <strong>Gruby Copyright Agent</strong>
              </p>
              <p className="mb-2">
                Email:{" "}
                <a
                  href="mailto:dmca@gruby.app"
                  className="text-[#222222] hover:underline"
                >
                  dmca@gruby.app
                </a>
              </p>
              <p className="mb-2">
                Subject Line: &quot;DMCA Notice&quot; or &quot;DMCA
                Counter-Notification&quot;
              </p>
            </div>
            <p
              className="mb-6 text-sm text-gray-600 sm:mb-4"
              style={{ lineHeight: "1.75" }}
            >
              Note: This email address is only for copyright infringement
              claims. For other inquiries, please use the appropriate contact
              method listed in our Terms of Service.
            </p>
          </section>

          <div
            className="mt-12 rounded border-l-4 border-yellow-400 bg-yellow-50 p-6 sm:mt-10 sm:p-8"
            style={{ lineHeight: "1.75" }}
          >
            <p className="mb-2 font-semibold">Important Legal Notice</p>
            <p className="text-sm">
              This page describes Gruby&apos;s procedures for responding to
              claims of copyright infringement. Please note that submitting a
              false or misleading DMCA notice may result in legal liability. If
              you are unsure whether content infringes your copyright, we
              recommend consulting with an attorney before submitting a notice.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
