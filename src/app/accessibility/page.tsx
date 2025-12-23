import type { Metadata } from "next";
import { DocsLayout } from "@/components/DocsLayout";

export const metadata: Metadata = {
  title: "Accessibility Statement | Gruby",
  description: "Gruby Accessibility Statement - Effective December 15, 2025",
};

export default function AccessibilityPage() {
  return (
    <DocsLayout title="Accessibility" currentPath="/accessibility">
          <h1
            className="mb-6 font-semibold sm:mb-4"
            style={{
              fontSize: "clamp(1.875rem, 4vw + 1rem, 3rem)",
              lineHeight: "1.2",
            }}
          >
            GRUBY ACCESSIBILITY STATEMENT
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
            At Gruby, we are committed to making our platform accessible to
            everyone, including users with disabilities. We believe that cooking
            and saving money should be available to all, regardless of ability
            or assistive technology needs.
          </p>

          <section className="mb-10 sm:mb-8">
            <h2
              className="mb-6 mt-10 font-semibold sm:mb-4 sm:mt-8"
              style={{
                fontSize: "clamp(1.5rem, 2.5vw + 0.75rem, 1.875rem)",
                lineHeight: "1.3",
              }}
            >
              1. OUR COMMITMENT
            </h2>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              Gruby strives to conform to the{" "}
              <a
                href="https://www.w3.org/WAI/WCAG21/quickref/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#222222] hover:underline"
              >
                Web Content Accessibility Guidelines (WCAG) 2.1
              </a>{" "}
              at Level AA. These guidelines provide a framework for making web
              content more accessible to people with disabilities, including
              those affecting vision, hearing, mobility, and cognition.
            </p>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              We are continually improving the accessibility of our Service and
              welcome feedback from our users to help us identify areas for
              improvement.
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
              2. ACCESSIBILITY FEATURES
            </h2>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              Gruby includes the following accessibility features:
            </p>

            <h3
              className="mb-4 mt-8 font-semibold sm:mb-3 sm:mt-6"
              style={{
                fontSize: "clamp(1.25rem, 2vw + 0.5rem, 1.5rem)",
                lineHeight: "1.4",
              }}
            >
              2.1 Screen Reader Compatibility
            </h3>
            <ul
              className="mb-6 list-disc pl-6 sm:mb-4"
              style={{ lineHeight: "1.75" }}
            >
              <li className="mb-2">
                Semantic HTML markup for proper content structure
              </li>
              <li className="mb-2">
                ARIA (Accessible Rich Internet Applications) labels and
                landmarks for navigation
              </li>
              <li className="mb-2">
                Alternative text descriptions for images and icons
              </li>
              <li className="mb-2">
                Descriptive link text that provides context
              </li>
              <li className="mb-2">
                Properly labeled form fields and input elements
              </li>
            </ul>

            <h3
              className="mb-4 mt-8 font-semibold sm:mb-3 sm:mt-6"
              style={{
                fontSize: "clamp(1.25rem, 2vw + 0.5rem, 1.5rem)",
                lineHeight: "1.4",
              }}
            >
              2.2 Keyboard Navigation
            </h3>
            <ul
              className="mb-6 list-disc pl-6 sm:mb-4"
              style={{ lineHeight: "1.75" }}
            >
              <li className="mb-2">
                Full keyboard navigation support without requiring a mouse
              </li>
              <li className="mb-2">
                Visible focus indicators for interactive elements
              </li>
              <li className="mb-2">
                Logical tab order throughout the interface
              </li>
              <li className="mb-2">
                Keyboard shortcuts documented in app settings
              </li>
              <li className="mb-2">
                Skip navigation links for quick access to main content
              </li>
            </ul>

            <h3
              className="mb-4 mt-8 font-semibold sm:mb-3 sm:mt-6"
              style={{
                fontSize: "clamp(1.25rem, 2vw + 0.5rem, 1.5rem)",
                lineHeight: "1.4",
              }}
            >
              2.3 Visual Design
            </h3>
            <ul
              className="mb-6 list-disc pl-6 sm:mb-4"
              style={{ lineHeight: "1.75" }}
            >
              <li className="mb-2">
                Color contrast ratios meeting WCAG AA standards (minimum 4.5:1
                for normal text)
              </li>
              <li className="mb-2">
                Information conveyed through multiple means, not color alone
              </li>
              <li className="mb-2">
                Resizable text without loss of functionality (up to 200% zoom)
              </li>
              <li className="mb-2">
                Responsive design that adapts to different screen sizes and
                orientations
              </li>
              <li className="mb-2">Dark mode option to reduce eye strain</li>
            </ul>

            <h3
              className="mb-4 mt-8 font-semibold sm:mb-3 sm:mt-6"
              style={{
                fontSize: "clamp(1.25rem, 2vw + 0.5rem, 1.5rem)",
                lineHeight: "1.4",
              }}
            >
              2.4 Content and Readability
            </h3>
            <ul
              className="mb-6 list-disc pl-6 sm:mb-4"
              style={{ lineHeight: "1.75" }}
            >
              <li className="mb-2">
                Clear, simple language written at an accessible reading level
              </li>
              <li className="mb-2">
                Headings and labels that clearly describe content and purpose
              </li>
              <li className="mb-2">
                Consistent navigation and layout patterns throughout the app
              </li>
              <li className="mb-2">
                Error messages that clearly explain the issue and how to fix it
              </li>
              <li className="mb-2">
                Instructions provided for complex interactions
              </li>
            </ul>

            <h3
              className="mb-4 mt-8 font-semibold sm:mb-3 sm:mt-6"
              style={{
                fontSize: "clamp(1.25rem, 2vw + 0.5rem, 1.5rem)",
                lineHeight: "1.4",
              }}
            >
              2.5 Multimedia and Media
            </h3>
            <ul
              className="mb-6 list-disc pl-6 sm:mb-4"
              style={{ lineHeight: "1.75" }}
            >
              <li className="mb-2">
                Recipe images include descriptive alternative text
              </li>
              <li className="mb-2">
                Videos include captions and transcripts where applicable
              </li>
              <li className="mb-2">Audio content includes text alternatives</li>
              <li className="mb-2">
                Auto-playing media can be paused or stopped
              </li>
            </ul>

            <h3
              className="mb-4 mt-8 font-semibold sm:mb-3 sm:mt-6"
              style={{
                fontSize: "clamp(1.25rem, 2vw + 0.5rem, 1.5rem)",
                lineHeight: "1.4",
              }}
            >
              2.6 Mobile Accessibility
            </h3>
            <ul
              className="mb-6 list-disc pl-6 sm:mb-4"
              style={{ lineHeight: "1.75" }}
            >
              <li className="mb-2">
                Compatible with iOS VoiceOver and Android TalkBack
              </li>
              <li className="mb-2">
                Support for platform-specific accessibility features
              </li>
              <li className="mb-2">
                Touch targets sized appropriately for easy interaction (minimum
                44x44 pixels)
              </li>
              <li className="mb-2">
                Gesture alternatives for complex touch interactions
              </li>
              <li className="mb-2">Support for system font size preferences</li>
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
              3. ASSISTIVE TECHNOLOGIES
            </h2>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              Gruby is designed to work with the following assistive
              technologies:
            </p>
            <ul
              className="mb-6 list-disc pl-6 sm:mb-4"
              style={{ lineHeight: "1.75" }}
            >
              <li className="mb-2">
                <strong>Screen Readers:</strong> JAWS, NVDA, VoiceOver (macOS
                and iOS), TalkBack (Android), Narrator (Windows)
              </li>
              <li className="mb-2">
                <strong>Voice Control:</strong> Dragon NaturallySpeaking, Apple
                Voice Control, Android Voice Access
              </li>
              <li className="mb-2">
                <strong>Screen Magnification:</strong> ZoomText, built-in
                platform zoom features
              </li>
              <li className="mb-2">
                <strong>Switch Access:</strong> Support for external switches
                and adaptive input devices
              </li>
              <li className="mb-2">
                <strong>Browser Extensions:</strong> High contrast modes, custom
                stylesheets, text-to-speech extensions
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
              4. KNOWN LIMITATIONS
            </h2>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              We are actively working to address the following known
              accessibility limitations:
            </p>
            <ul
              className="mb-6 list-disc pl-6 sm:mb-4"
              style={{ lineHeight: "1.75" }}
            >
              <li className="mb-2">
                Some user-generated recipe content may not include adequate
                alternative text for images (we encourage users to add
                descriptions)
              </li>
              <li className="mb-2">
                Third-party integrations (such as Kroger) may have their own
                accessibility limitations outside our control
              </li>
              <li className="mb-2">
                Certain advanced features like the AI Budget Coach are being
                continuously improved for screen reader compatibility
              </li>
              <li className="mb-2">
                Some complex interactions on mobile devices may require
                additional gestures or navigation steps
              </li>
            </ul>
            <div
              className="mb-6 mt-6 rounded-lg bg-gray-50 p-6"
              style={{ lineHeight: "1.75" }}
            >
              <p className="mb-4">
                <strong>Note:</strong> We are committed to resolving these
                limitations. If you encounter any accessibility barriers while
                using Gruby, please contact us (see Section 7 below) so we can
                work on improvements.
              </p>
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
              5. TESTING AND EVALUATION
            </h2>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              Gruby's accessibility is regularly tested using the following
              methods:
            </p>
            <ul
              className="mb-6 list-disc pl-6 sm:mb-4"
              style={{ lineHeight: "1.75" }}
            >
              <li className="mb-2">
                Automated accessibility testing tools (Axe, Lighthouse, WAVE)
              </li>
              <li className="mb-2">
                Manual testing with keyboard navigation and screen readers
              </li>
              <li className="mb-2">
                User testing with individuals who use assistive technologies
              </li>
              <li className="mb-2">
                Regular accessibility audits by third-party experts
              </li>
              <li className="mb-2">
                Continuous monitoring of accessibility standards and best
                practices
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
              6. THIRD-PARTY CONTENT
            </h2>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              Gruby integrates with third-party services, including:
            </p>
            <ul
              className="mb-6 list-disc pl-6 sm:mb-4"
              style={{ lineHeight: "1.75" }}
            >
              <li className="mb-2">
                <strong>Kroger API:</strong> Grocery shopping and pricing
                integration
              </li>
              <li className="mb-2">
                <strong>Apple Sign-In / Google Sign-In:</strong> Authentication
                services
              </li>
              <li className="mb-2">
                <strong>Stripe:</strong> Payment processing (for future
                features)
              </li>
            </ul>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              While we strive to ensure these integrations are accessible, we do
              not control the accessibility of third-party services. If you
              experience accessibility issues with a third-party integration,
              please contact us, and we will work with our partners to address
              the concern.
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
              7. FEEDBACK AND CONTACT
            </h2>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              We welcome your feedback on the accessibility of Gruby. If you
              encounter any accessibility barriers, have suggestions for
              improvement, or need assistance accessing any content or features,
              please contact us:
            </p>

            <div
              className="mb-6 mt-6 rounded-lg bg-gray-50 p-6"
              style={{ lineHeight: "1.75" }}
            >
              <p className="mb-4">
                <strong>Accessibility Team</strong>
              </p>
              <p className="mb-2">
                Email:{" "}
                <a
                  href="mailto:accessibility@gruby.app"
                  className="text-[#222222] hover:underline"
                >
                  accessibility@gruby.app
                </a>
              </p>
              <p className="mb-2">
                General Support:{" "}
                <a
                  href="mailto:support@gruby.app"
                  className="text-[#222222] hover:underline"
                >
                  support@gruby.app
                </a>
              </p>
            </div>

            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              <strong>Response Time:</strong> We aim to respond to
              accessibility-related inquiries within 2 business days. For urgent
              accessibility issues that prevent you from using critical
              features, please indicate "URGENT" in your email subject line, and
              we will prioritize your request.
            </p>

            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              When reporting an accessibility issue, please include:
            </p>
            <ul
              className="mb-6 list-disc pl-6 sm:mb-4"
              style={{ lineHeight: "1.75" }}
            >
              <li className="mb-2">
                A description of the accessibility barrier you encountered
              </li>
              <li className="mb-2">
                The page, screen, or feature where the issue occurred
              </li>
              <li className="mb-2">
                Your device type, operating system, and browser/app version
              </li>
              <li className="mb-2">
                Any assistive technology you were using (if applicable)
              </li>
              <li className="mb-2">
                Screenshots or screen recordings (if possible and helpful)
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
              8. ALTERNATIVE ACCESS
            </h2>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              If you are unable to access certain features or content on Gruby
              due to accessibility barriers, please contact our Accessibility
              Team. We will work with you to provide the information or
              functionality in an alternative format that meets your needs. This
              may include:
            </p>
            <ul
              className="mb-6 list-disc pl-6 sm:mb-4"
              style={{ lineHeight: "1.75" }}
            >
              <li className="mb-2">
                Providing recipe information in alternative formats (text-only,
                large print, etc.)
              </li>
              <li className="mb-2">
                Assisting with account setup or navigation
              </li>
              <li className="mb-2">
                Offering personalized guidance for using specific features
              </li>
              <li className="mb-2">
                Working with you to accommodate your specific needs
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
              9. ONGOING IMPROVEMENTS
            </h2>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              Accessibility is an ongoing effort. Our roadmap for accessibility
              improvements includes:
            </p>
            <ul
              className="mb-6 list-disc pl-6 sm:mb-4"
              style={{ lineHeight: "1.75" }}
            >
              <li className="mb-2">
                Enhanced screen reader support for all new features
              </li>
              <li className="mb-2">
                Expanded keyboard shortcuts and navigation options
              </li>
              <li className="mb-2">
                Improved high contrast and color customization options
              </li>
              <li className="mb-2">
                Additional caption and transcript options for multimedia content
              </li>
              <li className="mb-2">
                Regular accessibility training for our development team
              </li>
              <li className="mb-2">
                Partnerships with accessibility advocacy organizations
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
              10. UPDATES TO THIS STATEMENT
            </h2>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              We may update this Accessibility Statement from time to time to
              reflect changes in our accessibility practices, new features, or
              evolving standards. We will post any updates on this page with a
              new effective date.
            </p>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              For significant changes, we will provide notice through the app or
              via email to registered users.
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
              11. FORMAL COMPLAINTS
            </h2>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              If you are not satisfied with our response to your accessibility
              concern, you may file a formal complaint. We take all complaints
              seriously and will investigate the issue promptly.
            </p>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              To file a formal complaint, please send a detailed description of
              the issue to{" "}
              <a
                href="mailto:accessibility@gruby.app"
                className="text-[#222222] hover:underline"
              >
                accessibility@gruby.app
              </a>{" "}
              with "Formal Complaint" in the subject line. We will acknowledge
              receipt within 2 business days and provide a resolution timeline.
            </p>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              If you are located in a jurisdiction with specific accessibility
              laws or regulations (such as the Americans with Disabilities Act
              in the United States), you may also have the right to file a
              complaint with the relevant regulatory authority.
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
              12. ADDITIONAL RESOURCES
            </h2>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              For more information about web accessibility, we recommend the
              following resources:
            </p>
            <ul
              className="mb-6 list-disc pl-6 sm:mb-4"
              style={{ lineHeight: "1.75" }}
            >
              <li className="mb-2">
                <a
                  href="https://www.w3.org/WAI/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#222222] hover:underline"
                >
                  W3C Web Accessibility Initiative (WAI)
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="https://www.ada.gov/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#222222] hover:underline"
                >
                  Americans with Disabilities Act (ADA)
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="https://webaim.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#222222] hover:underline"
                >
                  WebAIM (Web Accessibility In Mind)
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="https://www.access-board.gov/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#222222] hover:underline"
                >
                  U.S. Access Board
                </a>
              </li>
            </ul>
          </section>
    </DocsLayout>
  );
}
