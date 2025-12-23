import type { Metadata } from "next";
import { DocsLayout } from "@/components/DocsLayout";

export const metadata: Metadata = {
  title: "Community Guidelines | Gruby",
  description: "Gruby Community Guidelines - Effective December 15, 2025",
};

export default function CommunityGuidelinesPage() {
  return (
    <DocsLayout title="Community Guidelines" currentPath="/community-guidelines">
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
              <li className="mb-2">
                Be patient with beginners and welcoming to new community members
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
              2. CIRCLES AND SOCIAL GROUPS
            </h2>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              Circles are private groups for friends and family to share
              recipes, coordinate meals, and stay connected through cooking.
              Please respect the trust that comes with Circle membership.
            </p>

            <h3
              className="mb-4 mt-8 font-semibold sm:mb-3 sm:mt-6"
              style={{
                fontSize: "clamp(1.25rem, 2vw + 0.5rem, 1.5rem)",
                lineHeight: "1.4",
              }}
            >
              2.1 Circle Etiquette
            </h3>
            <ul
              className="mb-6 list-disc pl-6 sm:mb-4"
              style={{ lineHeight: "1.75" }}
            >
              <li className="mb-2">
                Respect Circle privacy - don&apos;t share Circle content outside
                the group without permission
              </li>
              <li className="mb-2">
                Only invite people you know and trust to your Circles
              </li>
              <li className="mb-2">
                Circle admins are responsible for maintaining a positive
                environment
              </li>
              <li className="mb-2">
                If you leave a Circle, respect that you no longer have access to
                shared content
              </li>
              <li className="mb-2">
                Don&apos;t create Circles to circumvent blocks or bans
              </li>
            </ul>

            <h3
              className="mb-4 mt-8 font-semibold sm:mb-3 sm:mt-6"
              style={{
                fontSize: "clamp(1.25rem, 2vw + 0.5rem, 1.5rem)",
                lineHeight: "1.4",
              }}
            >
              2.2 Following and Followers
            </h3>
            <ul
              className="mb-6 list-disc pl-6 sm:mb-4"
              style={{ lineHeight: "1.75" }}
            >
              <li className="mb-2">
                Respect users&apos; follow request settings (public vs. approval
                required)
              </li>
              <li className="mb-2">
                Don&apos;t follow/unfollow repeatedly to get attention
              </li>
              <li className="mb-2">
                Respect when someone unfollows you or declines your follow
                request
              </li>
              <li className="mb-2">
                Don&apos;t use automation to artificially grow followers
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
              3. DIRECT MESSAGING
            </h2>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              Gruby offers end-to-end encrypted messaging to protect your
              conversations. With this privacy comes responsibility.
            </p>

            <h3
              className="mb-4 mt-8 font-semibold sm:mb-3 sm:mt-6"
              style={{
                fontSize: "clamp(1.25rem, 2vw + 0.5rem, 1.5rem)",
                lineHeight: "1.4",
              }}
            >
              3.1 Messaging Guidelines
            </h3>
            <ul
              className="mb-6 list-disc pl-6 sm:mb-4"
              style={{ lineHeight: "1.75" }}
            >
              <li className="mb-2">
                Only message people who want to hear from you
              </li>
              <li className="mb-2">
                Respect when someone doesn&apos;t respond or asks you to stop
                messaging
              </li>
              <li className="mb-2">
                Don&apos;t send unsolicited promotional messages or spam
              </li>
              <li className="mb-2">
                Don&apos;t use messages to harass, threaten, or intimidate
              </li>
              <li className="mb-2">
                Don&apos;t share sexually explicit or inappropriate content
              </li>
              <li className="mb-2">
                Don&apos;t screenshot or share private messages without consent
              </li>
            </ul>

            <h3
              className="mb-4 mt-8 font-semibold sm:mb-3 sm:mt-6"
              style={{
                fontSize: "clamp(1.25rem, 2vw + 0.5rem, 1.5rem)",
                lineHeight: "1.4",
              }}
            >
              3.2 Message Requests
            </h3>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              Messages from people you don&apos;t follow go to Message Requests.
              You can accept, decline, or report these messages. Declining a
              message request does not notify the sender.
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
              4. GATHERINGS
            </h2>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              Gatherings are in-person or virtual cooking events. Whether
              you&apos;re hosting or attending, please follow these guidelines
              for safe and enjoyable experiences.
            </p>

            <h3
              className="mb-4 mt-8 font-semibold sm:mb-3 sm:mt-6"
              style={{
                fontSize: "clamp(1.25rem, 2vw + 0.5rem, 1.5rem)",
                lineHeight: "1.4",
              }}
            >
              4.1 For Hosts
            </h3>
            <ul
              className="mb-6 list-disc pl-6 sm:mb-4"
              style={{ lineHeight: "1.75" }}
            >
              <li className="mb-2">
                Provide accurate information about your Gathering (date, time,
                location, menu)
              </li>
              <li className="mb-2">
                Clearly communicate any costs, dietary restrictions, or
                requirements
              </li>
              <li className="mb-2">
                Vet participants before sharing your exact address
              </li>
              <li className="mb-2">
                Be inclusive and welcoming to all approved participants
              </li>
              <li className="mb-2">
                Follow food safety guidelines when preparing and serving food
              </li>
              <li className="mb-2">
                Communicate promptly about any changes or cancellations
              </li>
              <li className="mb-2">
                Handle cost-splitting fairly and transparently
              </li>
            </ul>

            <h3
              className="mb-4 mt-8 font-semibold sm:mb-3 sm:mt-6"
              style={{
                fontSize: "clamp(1.25rem, 2vw + 0.5rem, 1.5rem)",
                lineHeight: "1.4",
              }}
            >
              4.2 For Attendees
            </h3>
            <ul
              className="mb-6 list-disc pl-6 sm:mb-4"
              style={{ lineHeight: "1.75" }}
            >
              <li className="mb-2">RSVP honestly and show up if you commit</li>
              <li className="mb-2">
                Communicate dietary restrictions or allergies in advance
              </li>
              <li className="mb-2">
                Contribute as agreed (ingredients, cooking tasks, cost-sharing)
              </li>
              <li className="mb-2">
                Respect the host&apos;s home and other participants
              </li>
              <li className="mb-2">
                Don&apos;t share the host&apos;s address with others without
                permission
              </li>
              <li className="mb-2">
                Cancel with adequate notice if you can&apos;t attend
              </li>
              <li className="mb-2">
                Pay your share of costs promptly and fairly
              </li>
            </ul>

            <h3
              className="mb-4 mt-8 font-semibold sm:mb-3 sm:mt-6"
              style={{
                fontSize: "clamp(1.25rem, 2vw + 0.5rem, 1.5rem)",
                lineHeight: "1.4",
              }}
            >
              4.3 Safety at Gatherings
            </h3>
            <ul
              className="mb-6 list-disc pl-6 sm:mb-4"
              style={{ lineHeight: "1.75" }}
            >
              <li className="mb-2">
                Meet in public first if you don&apos;t know other participants
              </li>
              <li className="mb-2">
                Trust your instincts - if something feels wrong, leave
              </li>
              <li className="mb-2">Tell someone where you&apos;re going</li>
              <li className="mb-2">
                Report any unsafe behavior to Gruby immediately
              </li>
              <li className="mb-2">
                Gruby is not responsible for what happens at in-person
                Gatherings
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
              5. SHARE AUTHENTIC CONTENT
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
              <li className="mb-2">
                Don&apos;t use AI to generate fake reviews or ratings
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
              6. FOOD SAFETY
            </h2>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              Food safety matters. When sharing recipes, include important
              safety information and allergen warnings. Unsafe recipes can cause
              real harm.
            </p>
            <ul
              className="mb-6 list-disc pl-6 sm:mb-4"
              style={{ lineHeight: "1.75" }}
            >
              <li className="mb-2">
                Include cooking temperatures and times for meat, poultry, eggs,
                and seafood
              </li>
              <li className="mb-2">
                Clearly label common allergens (nuts, dairy, gluten, shellfish,
                eggs, soy, etc.)
              </li>
              <li className="mb-2">
                Don&apos;t share recipes that could be dangerous if prepared
                incorrectly
              </li>
              <li className="mb-2">
                If you modify a recipe, note the changes so others can follow
                safely
              </li>
              <li className="mb-2">
                Include proper food storage and handling instructions
              </li>
              <li className="mb-2">
                Be especially careful with recipes involving raw eggs, raw meat,
                or home canning
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
              7. AI FEATURES
            </h2>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              Gruby uses AI to help with recipe suggestions, ingredient
              scanning, and other features. Please use these features
              responsibly.
            </p>
            <ul
              className="mb-6 list-disc pl-6 sm:mb-4"
              style={{ lineHeight: "1.75" }}
            >
              <li className="mb-2">
                AI suggestions are starting points, not guarantees - always
                verify cooking times and temperatures
              </li>
              <li className="mb-2">
                Don&apos;t try to manipulate AI features to generate harmful or
                inappropriate content
              </li>
              <li className="mb-2">
                If you share an AI-generated recipe, note that it was
                AI-assisted
              </li>
              <li className="mb-2">
                Report AI suggestions that seem unsafe or incorrect
              </li>
              <li className="mb-2">
                AI ingredient scanning may have errors - always double-check
                identified ingredients
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
              8. NO SPAM OR SELF-PROMOTION
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
                Don&apos;t include affiliate links or promotional codes in
                recipes
              </li>
              <li className="mb-2">
                Don&apos;t direct users to external sites for commercial
                purposes
              </li>
              <li className="mb-2">
                Don&apos;t create multiple accounts to manipulate ratings or
                visibility
              </li>
              <li className="mb-2">
                Don&apos;t use automated tools to post, like, or comment
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
              9. APPROPRIATE CONTENT ONLY
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
              <li className="mb-2">
                Content glorifying dangerous &quot;challenges&quot; or trends
              </li>
              <li className="mb-2">
                Recipes for illegal substances or controlled substances
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
              10. RESPECT PRIVACY
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
              <li className="mb-2">
                Don&apos;t share Gathering locations with people who
                weren&apos;t invited
              </li>
              <li className="mb-2">
                Respect Circle privacy and don&apos;t share Circle content
                externally
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
              11. INTELLECTUAL PROPERTY
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
              <li className="mb-2">
                Don&apos;t post content that infringes on trademarks
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
              12. BLOCKING AND MUTING
            </h2>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              You have the power to control your Gruby experience:
            </p>
            <ul
              className="mb-6 list-disc pl-6 sm:mb-4"
              style={{ lineHeight: "1.75" }}
            >
              <li className="mb-2">
                <strong>Block:</strong> Prevents someone from viewing your
                profile, recipes, or contacting you. They won&apos;t be notified
                they&apos;ve been blocked.
              </li>
              <li className="mb-2">
                <strong>Mute:</strong> Hides someone&apos;s content from your
                feed without unfollowing them.
              </li>
              <li className="mb-2">
                <strong>Report:</strong> Flags content or behavior that violates
                these guidelines.
              </li>
            </ul>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              Don&apos;t try to circumvent blocks by creating new accounts or
              using other users&apos; accounts.
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
              13. REPORTING VIOLATIONS
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
                Use the &quot;Report&quot; button on any post, comment, message,
                or profile
              </li>
              <li className="mb-2">
                Select the reason that best describes the violation
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
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              <strong>What happens after you report:</strong>
            </p>
            <ul
              className="mb-6 list-disc pl-6 sm:mb-4"
              style={{ lineHeight: "1.75" }}
            >
              <li className="mb-2">
                Our moderation team reviews reports, typically within 24-48
                hours
              </li>
              <li className="mb-2">
                We may contact you for additional information
              </li>
              <li className="mb-2">
                The reported user is not told who reported them
              </li>
              <li className="mb-2">
                We&apos;ll notify you when we&apos;ve taken action
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
              14. CONSEQUENCES OF VIOLATIONS
            </h2>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              Violations of these Community Guidelines may result in:
            </p>
            <ul
              className="mb-6 list-disc pl-6 sm:mb-4"
              style={{ lineHeight: "1.75" }}
            >
              <li className="mb-2">Warning and content removal</li>
              <li className="mb-2">
                Temporary restrictions on posting, messaging, or social features
              </li>
              <li className="mb-2">
                Removal from Circles or banning from Gatherings
              </li>
              <li className="mb-2">Temporary account suspension (1-30 days)</li>
              <li className="mb-2">Permanent account termination</li>
              <li className="mb-2">
                Reporting to law enforcement (for illegal activities or safety
                threats)
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
              15. APPEALS
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
              within 30 days. Include:
            </p>
            <ul
              className="mb-6 list-disc pl-6 sm:mb-4"
              style={{ lineHeight: "1.75" }}
            >
              <li className="mb-2">Your username</li>
              <li className="mb-2">
                The content or action you&apos;re appealing
              </li>
              <li className="mb-2">
                A clear explanation of why you believe the action was incorrect
              </li>
              <li className="mb-2">Any supporting context or information</li>
            </ul>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              We review appeals carefully and will respond within 7 business
              days.
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
              16. UPDATES TO THESE GUIDELINES
            </h2>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              We may update these Community Guidelines from time to time to
              reflect changes in our community, features, or legal requirements.
              We&apos;ll notify you of significant changes through the app or
              email. Continued use of Gruby after updates constitutes acceptance
              of the revised guidelines.
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
              17. CONTACT US
            </h2>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              Questions about these Community Guidelines? Reach out to us at:
            </p>
            <ul
              className="mb-6 list-disc pl-6 sm:mb-4"
              style={{ lineHeight: "1.75" }}
            >
              <li className="mb-2">
                General inquiries:{" "}
                <a
                  href="mailto:community@gruby.app"
                  className="text-[#222222] hover:underline"
                >
                  community@gruby.app
                </a>
              </li>
              <li className="mb-2">
                Safety concerns:{" "}
                <a
                  href="mailto:safety@gruby.app"
                  className="text-[#222222] hover:underline"
                >
                  safety@gruby.app
                </a>
              </li>
              <li className="mb-2">
                Appeals:{" "}
                <a
                  href="mailto:appeals@gruby.app"
                  className="text-[#222222] hover:underline"
                >
                  appeals@gruby.app
                </a>
              </li>
            </ul>
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
              affordable, and enjoyable for everyone. Whether you&apos;re
              sharing recipes, hosting Gatherings, or connecting with your
              Circles, you&apos;re helping build something special. Let&apos;s
              cook, share, and save money together.
            </p>
          </div>
    </DocsLayout>
  );
}
