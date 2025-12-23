import type { Metadata } from "next";
import { DocsLayout } from "@/components/DocsLayout";

export const metadata: Metadata = {
  title: "Acceptable Use Policy | Gruby",
  description: "Gruby Acceptable Use Policy - Effective December 22, 2025",
};

export default function AcceptableUsePage() {
  return (
    <DocsLayout title="Acceptable Use" currentPath="/acceptable-use">
          <h1
            className="mb-6 font-semibold sm:mb-4"
            style={{
              fontSize: "clamp(1.875rem, 4vw + 1rem, 3rem)",
              lineHeight: "1.2",
            }}
          >
            ACCEPTABLE USE POLICY
          </h1>

          <p
            className="mb-8 text-gray-600 sm:mb-6"
            style={{
              fontSize: "clamp(0.875rem, 1vw + 0.5rem, 0.875rem)",
              lineHeight: "1.6",
            }}
          >
            <strong>Effective Date: December 22, 2025</strong>
          </p>

          <p
            className="mb-10 sm:mb-8"
            style={{
              fontSize: "clamp(1rem, 1.25vw + 0.75rem, 1.125rem)",
              lineHeight: "1.75",
            }}
          >
            This Acceptable Use Policy (&quot;AUP&quot;) governs your use of the Gruby mobile application and related services (the &quot;Service&quot;). This AUP is incorporated into and forms part of our Terms of Service. By using the Service, you agree to comply with this policy.
          </p>

          <section className="mb-10 sm:mb-8">
            <h2
              className="mb-6 mt-10 font-semibold sm:mb-4 sm:mt-8"
              style={{
                fontSize: "clamp(1.5rem, 2.5vw + 0.75rem, 1.875rem)",
                lineHeight: "1.3",
              }}
            >
              1. GENERAL PRINCIPLES
            </h2>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              Gruby is designed to be a positive, supportive community for home cooks to share recipes, plan meals, manage groceries, and connect with others. You agree to use the Service in a manner that:
            </p>
            <ul
              className="mb-6 list-disc pl-6 sm:mb-4"
              style={{ lineHeight: "1.75" }}
            >
              <li className="mb-2">Respects other users and their content</li>
              <li className="mb-2">Complies with all applicable laws and regulations</li>
              <li className="mb-2">Does not harm or disrupt the Service or its users</li>
              <li className="mb-2">Maintains the integrity and security of the platform</li>
              <li className="mb-2">Promotes a safe and welcoming environment</li>
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
              2. PROHIBITED CONTENT
            </h2>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              You may not post, upload, share, or transmit any content that:
            </p>

            <h3
              className="mb-4 mt-8 font-semibold sm:mb-3 sm:mt-6"
              style={{
                fontSize: "clamp(1.25rem, 2vw + 0.5rem, 1.5rem)",
                lineHeight: "1.4",
              }}
            >
              2.1 Illegal or Harmful Content
            </h3>
            <ul
              className="mb-6 list-disc pl-6 sm:mb-4"
              style={{ lineHeight: "1.75" }}
            >
              <li className="mb-2">Violates any applicable law, regulation, or third-party rights</li>
              <li className="mb-2">Promotes or facilitates illegal activities</li>
              <li className="mb-2">Contains instructions for dangerous or illegal activities</li>
              <li className="mb-2">Promotes violence, terrorism, or extremism</li>
              <li className="mb-2">Encourages self-harm or harm to others</li>
              <li className="mb-2">Contains dangerous food safety misinformation</li>
            </ul>

            <h3
              className="mb-4 mt-8 font-semibold sm:mb-3 sm:mt-6"
              style={{
                fontSize: "clamp(1.25rem, 2vw + 0.5rem, 1.5rem)",
                lineHeight: "1.4",
              }}
            >
              2.2 Abusive or Offensive Content
            </h3>
            <ul
              className="mb-6 list-disc pl-6 sm:mb-4"
              style={{ lineHeight: "1.75" }}
            >
              <li className="mb-2">Harasses, bullies, intimidates, or threatens any person</li>
              <li className="mb-2">Contains hate speech or discrimination based on race, ethnicity, national origin, religion, gender, sexual orientation, disability, age, or any other protected characteristic</li>
              <li className="mb-2">Is defamatory, libelous, or knowingly false</li>
              <li className="mb-2">Is obscene, vulgar, or sexually explicit</li>
              <li className="mb-2">Depicts graphic violence or gore</li>
              <li className="mb-2">Exploits or endangers minors in any way</li>
            </ul>

            <h3
              className="mb-4 mt-8 font-semibold sm:mb-3 sm:mt-6"
              style={{
                fontSize: "clamp(1.25rem, 2vw + 0.5rem, 1.5rem)",
                lineHeight: "1.4",
              }}
            >
              2.3 Deceptive or Fraudulent Content
            </h3>
            <ul
              className="mb-6 list-disc pl-6 sm:mb-4"
              style={{ lineHeight: "1.75" }}
            >
              <li className="mb-2">Impersonates any person, business, or entity</li>
              <li className="mb-2">Contains false or misleading information</li>
              <li className="mb-2">Is intended to defraud or scam users</li>
              <li className="mb-2">Contains phishing attempts or malicious links</li>
              <li className="mb-2">Makes false health, medical, or nutritional claims</li>
              <li className="mb-2">Misrepresents affiliate relationships or sponsorships</li>
            </ul>

            <h3
              className="mb-4 mt-8 font-semibold sm:mb-3 sm:mt-6"
              style={{
                fontSize: "clamp(1.25rem, 2vw + 0.5rem, 1.5rem)",
                lineHeight: "1.4",
              }}
            >
              2.4 Intellectual Property Violations
            </h3>
            <ul
              className="mb-6 list-disc pl-6 sm:mb-4"
              style={{ lineHeight: "1.75" }}
            >
              <li className="mb-2">Infringes any copyright, trademark, patent, trade secret, or other intellectual property right</li>
              <li className="mb-2">Contains content you do not have the right to share</li>
              <li className="mb-2">Copies recipes, photos, or videos from others without permission or attribution</li>
              <li className="mb-2">Uses copyrighted music, images, or other media without authorization</li>
            </ul>

            <h3
              className="mb-4 mt-8 font-semibold sm:mb-3 sm:mt-6"
              style={{
                fontSize: "clamp(1.25rem, 2vw + 0.5rem, 1.5rem)",
                lineHeight: "1.4",
              }}
            >
              2.5 Privacy Violations
            </h3>
            <ul
              className="mb-6 list-disc pl-6 sm:mb-4"
              style={{ lineHeight: "1.75" }}
            >
              <li className="mb-2">Shares personal information of others without consent</li>
              <li className="mb-2">Doxes or outs individuals</li>
              <li className="mb-2">Shares private communications without consent</li>
              <li className="mb-2">Contains non-consensual intimate imagery</li>
              <li className="mb-2">Violates the privacy of minors</li>
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
              3. PROHIBITED ACTIVITIES
            </h2>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              You may not engage in any of the following activities:
            </p>

            <h3
              className="mb-4 mt-8 font-semibold sm:mb-3 sm:mt-6"
              style={{
                fontSize: "clamp(1.25rem, 2vw + 0.5rem, 1.5rem)",
                lineHeight: "1.4",
              }}
            >
              3.1 Account Abuse
            </h3>
            <ul
              className="mb-6 list-disc pl-6 sm:mb-4"
              style={{ lineHeight: "1.75" }}
            >
              <li className="mb-2">Creating multiple accounts to evade bans or restrictions</li>
              <li className="mb-2">Sharing account credentials with others</li>
              <li className="mb-2">Selling, trading, or transferring accounts</li>
              <li className="mb-2">Using automated systems to create accounts</li>
              <li className="mb-2">Accessing others&apos; accounts without authorization</li>
            </ul>

            <h3
              className="mb-4 mt-8 font-semibold sm:mb-3 sm:mt-6"
              style={{
                fontSize: "clamp(1.25rem, 2vw + 0.5rem, 1.5rem)",
                lineHeight: "1.4",
              }}
            >
              3.2 Platform Manipulation
            </h3>
            <ul
              className="mb-6 list-disc pl-6 sm:mb-4"
              style={{ lineHeight: "1.75" }}
            >
              <li className="mb-2">Using bots, scripts, or automated tools to interact with the Service</li>
              <li className="mb-2">Artificially inflating likes, followers, views, or engagement</li>
              <li className="mb-2">Coordinating inauthentic behavior or fake engagement</li>
              <li className="mb-2">Manipulating search results, recommendations, or feeds</li>
              <li className="mb-2">Exploiting bugs or vulnerabilities instead of reporting them</li>
            </ul>

            <h3
              className="mb-4 mt-8 font-semibold sm:mb-3 sm:mt-6"
              style={{
                fontSize: "clamp(1.25rem, 2vw + 0.5rem, 1.5rem)",
                lineHeight: "1.4",
              }}
            >
              3.3 Spam and Commercial Abuse
            </h3>
            <ul
              className="mb-6 list-disc pl-6 sm:mb-4"
              style={{ lineHeight: "1.75" }}
            >
              <li className="mb-2">Sending unsolicited messages or communications (spam)</li>
              <li className="mb-2">Posting repetitive, unwanted, or irrelevant content</li>
              <li className="mb-2">Using the Service for unauthorized commercial purposes</li>
              <li className="mb-2">Advertising products or services without authorization</li>
              <li className="mb-2">Including affiliate links or promotional codes without disclosure</li>
              <li className="mb-2">Soliciting money from other users</li>
            </ul>

            <h3
              className="mb-4 mt-8 font-semibold sm:mb-3 sm:mt-6"
              style={{
                fontSize: "clamp(1.25rem, 2vw + 0.5rem, 1.5rem)",
                lineHeight: "1.4",
              }}
            >
              3.4 Security Violations
            </h3>
            <ul
              className="mb-6 list-disc pl-6 sm:mb-4"
              style={{ lineHeight: "1.75" }}
            >
              <li className="mb-2">Attempting to bypass security measures or access controls</li>
              <li className="mb-2">Probing, scanning, or testing the vulnerability of systems</li>
              <li className="mb-2">Interfering with the Service or its infrastructure</li>
              <li className="mb-2">Launching denial-of-service attacks</li>
              <li className="mb-2">Distributing viruses, malware, or other harmful code</li>
              <li className="mb-2">Reverse engineering, decompiling, or disassembling the Service</li>
              <li className="mb-2">Scraping, harvesting, or collecting user data without authorization</li>
            </ul>

            <h3
              className="mb-4 mt-8 font-semibold sm:mb-3 sm:mt-6"
              style={{
                fontSize: "clamp(1.25rem, 2vw + 0.5rem, 1.5rem)",
                lineHeight: "1.4",
              }}
            >
              3.5 Abuse of Features
            </h3>
            <ul
              className="mb-6 list-disc pl-6 sm:mb-4"
              style={{ lineHeight: "1.75" }}
            >
              <li className="mb-2">Misusing the reporting or moderation systems</li>
              <li className="mb-2">Filing false or malicious reports against users or content</li>
              <li className="mb-2">Abusing the direct messaging feature for harassment</li>
              <li className="mb-2">Using Gatherings or Circles for unauthorized purposes</li>
              <li className="mb-2">Manipulating cost-splitting features for fraud</li>
              <li className="mb-2">Misusing the AI Budget Coach or other AI features</li>
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
              4. FOOD SAFETY REQUIREMENTS
            </h2>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              When sharing recipes or food-related content, you must:
            </p>
            <ul
              className="mb-6 list-disc pl-6 sm:mb-4"
              style={{ lineHeight: "1.75" }}
            >
              <li className="mb-2">Include accurate cooking temperatures and times for foods that require them (especially meats, poultry, eggs, and seafood)</li>
              <li className="mb-2">Clearly identify common allergens (nuts, dairy, gluten, shellfish, eggs, soy, etc.) in recipes</li>
              <li className="mb-2">Not share recipes that are dangerously unsafe when prepared as instructed</li>
              <li className="mb-2">Not make false medical or health claims about recipes or ingredients</li>
              <li className="mb-2">Not promote dangerous dietary practices</li>
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
              5. GATHERINGS AND CIRCLES RULES
            </h2>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              When participating in Gatherings (collaborative cooking events) or Circles (friend groups), you agree to:
            </p>
            <ul
              className="mb-6 list-disc pl-6 sm:mb-4"
              style={{ lineHeight: "1.75" }}
            >
              <li className="mb-2">Respect other participants and their contributions</li>
              <li className="mb-2">Not use these features for purposes unrelated to cooking or food</li>
              <li className="mb-2">Honor cost-splitting arrangements in good faith</li>
              <li className="mb-2">Not use location sharing to stalk, harass, or endanger others</li>
              <li className="mb-2">Follow any additional rules established by Gathering hosts or Circle administrators</li>
              <li className="mb-2">Report inappropriate behavior to Gruby</li>
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
              6. MESSAGING CONDUCT
            </h2>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              When using direct messaging (which is end-to-end encrypted), you must:
            </p>
            <ul
              className="mb-6 list-disc pl-6 sm:mb-4"
              style={{ lineHeight: "1.75" }}
            >
              <li className="mb-2">Only message users for legitimate, food-related purposes</li>
              <li className="mb-2">Not send spam, unsolicited advertising, or chain messages</li>
              <li className="mb-2">Not send harassing, threatening, or abusive messages</li>
              <li className="mb-2">Not share explicit or inappropriate content</li>
              <li className="mb-2">Respect users who ask you to stop messaging them</li>
            </ul>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              Note: While messages are encrypted, message metadata (sender, recipient, timestamp) is retained and abusive patterns may be detected and acted upon.
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
              7. AI FEATURE USAGE
            </h2>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              When using AI-powered features (Budget Coach, recipe recommendations, etc.), you agree:
            </p>
            <ul
              className="mb-6 list-disc pl-6 sm:mb-4"
              style={{ lineHeight: "1.75" }}
            >
              <li className="mb-2">Not to attempt to manipulate or &quot;jailbreak&quot; the AI system</li>
              <li className="mb-2">Not to input harmful, illegal, or abusive content</li>
              <li className="mb-2">Not to use AI features to generate prohibited content</li>
              <li className="mb-2">To understand that AI recommendations are informational only and not professional advice</li>
              <li className="mb-2">That AI outputs should be verified, especially for dietary or health-related matters</li>
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
              8. ENFORCEMENT AND CONSEQUENCES
            </h2>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              We reserve the right to take action when this policy is violated, including:
            </p>

            <h3
              className="mb-4 mt-8 font-semibold sm:mb-3 sm:mt-6"
              style={{
                fontSize: "clamp(1.25rem, 2vw + 0.5rem, 1.5rem)",
                lineHeight: "1.4",
              }}
            >
              8.1 Content Actions
            </h3>
            <ul
              className="mb-6 list-disc pl-6 sm:mb-4"
              style={{ lineHeight: "1.75" }}
            >
              <li className="mb-2">Removing or hiding violating content</li>
              <li className="mb-2">Adding warnings or labels to content</li>
              <li className="mb-2">Reducing content visibility or reach</li>
            </ul>

            <h3
              className="mb-4 mt-8 font-semibold sm:mb-3 sm:mt-6"
              style={{
                fontSize: "clamp(1.25rem, 2vw + 0.5rem, 1.5rem)",
                lineHeight: "1.4",
              }}
            >
              8.2 Account Actions
            </h3>
            <ul
              className="mb-6 list-disc pl-6 sm:mb-4"
              style={{ lineHeight: "1.75" }}
            >
              <li className="mb-2">Issuing warnings to your account</li>
              <li className="mb-2">Temporarily restricting account features</li>
              <li className="mb-2">Temporarily suspending your account</li>
              <li className="mb-2">Permanently terminating your account</li>
            </ul>

            <h3
              className="mb-4 mt-8 font-semibold sm:mb-3 sm:mt-6"
              style={{
                fontSize: "clamp(1.25rem, 2vw + 0.5rem, 1.5rem)",
                lineHeight: "1.4",
              }}
            >
              8.3 Legal Actions
            </h3>
            <ul
              className="mb-6 list-disc pl-6 sm:mb-4"
              style={{ lineHeight: "1.75" }}
            >
              <li className="mb-2">Reporting illegal activity to law enforcement</li>
              <li className="mb-2">Cooperating with legal investigations</li>
              <li className="mb-2">Pursuing civil remedies for violations</li>
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
              9. REPORTING VIOLATIONS
            </h2>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              If you encounter content or behavior that violates this policy:
            </p>
            <ul
              className="mb-6 list-disc pl-6 sm:mb-4"
              style={{ lineHeight: "1.75" }}
            >
              <li className="mb-2">Use the &quot;Report&quot; feature in the app</li>
              <li className="mb-2">Email <a href="mailto:safety@gruby.app" className="text-[#222222] hover:underline">safety@gruby.app</a> for urgent safety concerns</li>
              <li className="mb-2">Email <a href="mailto:abuse@gruby.app" className="text-[#222222] hover:underline">abuse@gruby.app</a> for other violations</li>
            </ul>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              Please provide as much detail as possible when reporting, including screenshots if available. We take all reports seriously and will investigate promptly.
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
              If you believe we took action against your account or content in error, you may appeal by emailing <a href="mailto:appeals@gruby.app" className="text-[#222222] hover:underline">appeals@gruby.app</a> within 30 days of the action. Include:
            </p>
            <ul
              className="mb-6 list-disc pl-6 sm:mb-4"
              style={{ lineHeight: "1.75" }}
            >
              <li className="mb-2">Your username</li>
              <li className="mb-2">A description of the action taken</li>
              <li className="mb-2">Why you believe the action was incorrect</li>
              <li className="mb-2">Any supporting information</li>
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
              11. CHANGES TO THIS POLICY
            </h2>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              We may update this Acceptable Use Policy from time to time. We will notify you of material changes by posting the updated policy on this page with a new effective date. Your continued use of the Service after the effective date constitutes acceptance of the changes.
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
              If you have questions about this Acceptable Use Policy, please contact us:
            </p>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              <strong>Gruby Trust and Safety Team</strong><br />
              Email: <a href="mailto:safety@gruby.app" className="text-[#222222] hover:underline">safety@gruby.app</a>
            </p>
          </section>
    </DocsLayout>
  );
}
