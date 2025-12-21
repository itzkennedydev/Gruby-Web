import type { Metadata } from "next";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Community Guidelines | Gruby",
  description: "Gruby Community Guidelines - Effective December 15, 2025",
};

export default function CommunityGuidelinesPage() {
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
            GRUBY COMMUNITY GUIDELINES
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
            Welcome to Gruby! Our community is built on a foundation of sharing,
            learning, and supporting each other in the kitchen. These Community
            Guidelines help ensure Gruby remains a safe, respectful, and helpful
            space for everyone who loves cooking at home.
          </p>

          <section className="mb-10 sm:mb-8">
            <h2
              className="mb-6 mt-10 font-semibold sm:mb-4 sm:mt-8"
              style={{
                fontSize: "clamp(1.5rem, 2.5vw + 0.75rem, 1.875rem)",
                lineHeight: "1.3",
              }}
            >
              1. BE RESPECTFUL
            </h2>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              Treat everyone with kindness and respect. We&apos;re all here to
              learn and share our love of cooking. Disagreements are fine, but
              personal attacks, harassment, bullying, or hate speech will not be
              tolerated.
            </p>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              <strong>This means:</strong>
            </p>
            <ul
              className="mb-6 list-disc pl-6 sm:mb-4"
              style={{ lineHeight: "1.75" }}
            >
              <li className="mb-2">
                No discrimination based on race, ethnicity, national origin,
                religion, gender, sexual orientation, disability, or age
              </li>
              <li className="mb-2">No harassment, threats, or intimidation</li>
              <li className="mb-2">No bullying or personal attacks</li>
              <li className="mb-2">
                Respect different cooking styles, skill levels, and dietary
                choices
              </li>
              <li className="mb-2">
                Constructive criticism is welcome; mean-spirited comments are
                not
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
              2. SHARE AUTHENTIC CONTENT
            </h2>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              Post content that you&apos;ve created or have permission to share.
              Give credit where credit is due. We&apos;re building a community
              of home chefs sharing genuine experiences.
            </p>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              <strong>Guidelines for recipes and content:</strong>
            </p>
            <ul
              className="mb-6 list-disc pl-6 sm:mb-4"
              style={{ lineHeight: "1.75" }}
            >
              <li className="mb-2">
                Only post recipes you&apos;ve actually made or created
              </li>
              <li className="mb-2">
                If you&apos;re sharing someone else&apos;s recipe, give proper
                attribution
              </li>
              <li className="mb-2">Use your own photos and videos</li>
              <li className="mb-2">
                Don&apos;t copy recipes verbatim from cookbooks, blogs, or other
                sources without permission
              </li>
              <li className="mb-2">Be honest in your reviews and ratings</li>
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
              3. KEEP IT SAFE
            </h2>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              Food safety matters. When sharing recipes, include important
              safety information and allergen warnings.
            </p>
            <ul
              className="mb-6 list-disc pl-6 sm:mb-4"
              style={{ lineHeight: "1.75" }}
            >
              <li className="mb-2">
                Include cooking temperatures and times for meat, poultry, and
                eggs
              </li>
              <li className="mb-2">
                Warn about common allergens (nuts, dairy, gluten, shellfish,
                etc.)
              </li>
              <li className="mb-2">
                Don&apos;t share recipes that could be dangerous if prepared
                incorrectly
              </li>
              <li className="mb-2">
                If you modify a recipe, note the changes so others can follow
                safely
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
              4. NO SPAM OR SELF-PROMOTION
            </h2>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              Gruby is for sharing recipes and connecting with other home cooks,
              not for advertising or selling products.
            </p>
            <ul
              className="mb-6 list-disc pl-6 sm:mb-4"
              style={{ lineHeight: "1.75" }}
            >
              <li className="mb-2">
                Don&apos;t post repetitive or irrelevant content
              </li>
              <li className="mb-2">
                Don&apos;t use Gruby to promote your business, products, or
                services
              </li>
              <li className="mb-2">
                Don&apos;t include affiliate links or promotional codes
              </li>
              <li className="mb-2">
                Don&apos;t direct users to external sites for commercial
                purposes
              </li>
              <li className="mb-2">
                Don&apos;t create multiple accounts to manipulate ratings or
                visibility
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
              5. APPROPRIATE CONTENT ONLY
            </h2>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              Keep content family-friendly and appropriate for all ages. Gruby
              is about food, cooking, and community.
            </p>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              <strong>Do not post:</strong>
            </p>
            <ul
              className="mb-6 list-disc pl-6 sm:mb-4"
              style={{ lineHeight: "1.75" }}
            >
              <li className="mb-2">Sexually explicit or suggestive content</li>
              <li className="mb-2">Graphic violence or disturbing imagery</li>
              <li className="mb-2">Illegal activities or dangerous behavior</li>
              <li className="mb-2">
                Misinformation or misleading health claims
              </li>
              <li className="mb-2">
                Content that promotes eating disorders or unhealthy
                relationships with food
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
              6. RESPECT PRIVACY
            </h2>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              Protect your privacy and the privacy of others. Don&apos;t share
              personal information that could identify individuals without their
              consent.
            </p>
            <ul
              className="mb-6 list-disc pl-6 sm:mb-4"
              style={{ lineHeight: "1.75" }}
            >
              <li className="mb-2">
                Don&apos;t post other people&apos;s personal information
                (addresses, phone numbers, email addresses)
              </li>
              <li className="mb-2">
                Don&apos;t post photos of others without their permission
              </li>
              <li className="mb-2">
                Be cautious about sharing your own personal information
              </li>
              <li className="mb-2">
                Respect private messages and don&apos;t share them publicly
                without consent
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
              7. INTELLECTUAL PROPERTY
            </h2>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              Respect copyright, trademarks, and other intellectual property
              rights. Don&apos;t post content that infringes on others&apos;
              rights.
            </p>
            <ul
              className="mb-6 list-disc pl-6 sm:mb-4"
              style={{ lineHeight: "1.75" }}
            >
              <li className="mb-2">
                Only upload photos and videos you own or have permission to use
              </li>
              <li className="mb-2">
                Don&apos;t copy entire recipes from copyrighted sources
              </li>
              <li className="mb-2">
                Give credit when adapting or inspired by someone else&apos;s
                recipe
              </li>
              <li className="mb-2">
                Don&apos;t use copyrighted music in videos without permission
              </li>
            </ul>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              If you believe your copyright has been infringed, see our{" "}
              <a href="/dmca" className="text-[#222222] hover:underline">
                DMCA Policy
              </a>
              .
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
              8. REPORTING VIOLATIONS
            </h2>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              If you see content that violates these guidelines, please report
              it. Help us keep Gruby a positive space for everyone.
            </p>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              <strong>How to report:</strong>
            </p>
            <ul
              className="mb-6 list-disc pl-6 sm:mb-4"
              style={{ lineHeight: "1.75" }}
            >
              <li className="mb-2">
                Use the &quot;Report&quot; button on any post, comment, or
                profile
              </li>
              <li className="mb-2">
                Provide specific details about the violation
              </li>
              <li className="mb-2">
                For urgent safety concerns, email us at{" "}
                <a
                  href="mailto:safety@gruby.app"
                  className="text-[#222222] hover:underline"
                >
                  safety@gruby.app
                </a>
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
              9. CONSEQUENCES OF VIOLATIONS
            </h2>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              Violations of these Community Guidelines may result in:
            </p>
            <ul
              className="mb-6 list-disc pl-6 sm:mb-4"
              style={{ lineHeight: "1.75" }}
            >
              <li className="mb-2">Content removal</li>
              <li className="mb-2">Temporary suspension of account features</li>
              <li className="mb-2">Permanent account termination</li>
              <li className="mb-2">
                Reporting to law enforcement (for illegal activities)
              </li>
            </ul>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              We consider the severity and frequency of violations when
              determining appropriate actions. Repeated or egregious violations
              will result in stricter consequences.
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
              10. APPEALS
            </h2>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              If you believe content was removed or your account was restricted
              in error, you may appeal the decision by emailing{" "}
              <a
                href="mailto:appeals@gruby.app"
                className="text-[#222222] hover:underline"
              >
                appeals@gruby.app
              </a>{" "}
              within 30 days. Include your username and a clear explanation of
              why you believe the action was incorrect.
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
              11. UPDATES TO THESE GUIDELINES
            </h2>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              We may update these Community Guidelines from time to time to
              reflect changes in our community, features, or legal requirements.
              Continued use of Gruby after updates constitutes acceptance of the
              revised guidelines.
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
              12. CONTACT US
            </h2>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              Questions about these Community Guidelines? Reach out to us at:
            </p>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              Email:{" "}
              <a
                href="mailto:community@gruby.app"
                className="text-[#222222] hover:underline"
              >
                community@gruby.app
              </a>
            </p>
          </section>

          <div
            className="mt-12 rounded-lg bg-gray-50 p-6 sm:mt-10 sm:p-8"
            style={{ lineHeight: "1.75" }}
          >
            <p
              className="mb-4"
              style={{ fontSize: "clamp(1rem, 1.25vw + 0.75rem, 1.125rem)" }}
            >
              <strong>Thank you for being part of the Gruby community!</strong>
            </p>
            <p style={{ fontSize: "clamp(0.875rem, 1vw + 0.5rem, 1rem)" }}>
              Together, we&apos;re making home cooking more accessible,
              affordable, and enjoyable for everyone. Let&apos;s cook, share,
              and save money together.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
