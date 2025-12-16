import type { Metadata } from "next";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Cookie Policy | Gruby",
  description: "Gruby Cookie Policy - Effective December 15, 2025",
};

export default function CookiePolicyPage() {
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
            GRUBY COOKIE POLICY
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
            This Cookie Policy explains how Gruby (&quot;we,&quot;
            &quot;us,&quot; or &quot;our&quot;) uses cookies and similar
            tracking technologies on our website and mobile application
            (collectively, the &quot;Service&quot;). By using the Service, you
            consent to the use of cookies as described in this policy.
          </p>

          <section className="mb-10 sm:mb-8">
            <h2
              className="mb-6 mt-10 font-semibold sm:mb-4 sm:mt-8"
              style={{
                fontSize: "clamp(1.5rem, 2.5vw + 0.75rem, 1.875rem)",
                lineHeight: "1.3",
              }}
            >
              1. WHAT ARE COOKIES
            </h2>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              Cookies are small text files that are stored on your device when
              you visit a website or use a mobile application. They help us
              recognize you, remember your preferences, and improve your
              experience. Similar technologies include pixels, web beacons, and
              local storage.
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
              2. TYPES OF COOKIES WE USE
            </h2>

            <h3
              className="mb-4 mt-8 font-semibold sm:mb-3 sm:mt-6"
              style={{
                fontSize: "clamp(1.25rem, 2vw + 0.5rem, 1.5rem)",
                lineHeight: "1.4",
              }}
            >
              2.1 Essential Cookies
            </h3>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              These cookies are necessary for the Service to function properly.
              They enable core functionality such as security, authentication,
              and maintaining your session. Without these cookies, certain
              features of the Service cannot be provided.
            </p>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              <strong>Examples:</strong> Session cookies, authentication tokens,
              security cookies.
            </p>

            <h3
              className="mb-4 mt-8 font-semibold sm:mb-3 sm:mt-6"
              style={{
                fontSize: "clamp(1.25rem, 2vw + 0.5rem, 1.5rem)",
                lineHeight: "1.4",
              }}
            >
              2.2 Analytics Cookies
            </h3>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              These cookies help us understand how users interact with the
              Service by collecting information about usage patterns, popular
              features, and areas for improvement. We use this data to optimize
              the Service and provide a better user experience.
            </p>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              <strong>Examples:</strong> Google Analytics, Firebase Analytics,
              page view tracking, feature usage metrics.
            </p>

            <h3
              className="mb-4 mt-8 font-semibold sm:mb-3 sm:mt-6"
              style={{
                fontSize: "clamp(1.25rem, 2vw + 0.5rem, 1.5rem)",
                lineHeight: "1.4",
              }}
            >
              2.3 Functional Cookies
            </h3>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              These cookies enable enhanced functionality and personalization,
              such as remembering your preferences, saved recipes, dietary
              restrictions, and display settings (light/dark mode).
            </p>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              <strong>Examples:</strong> User preferences, saved settings,
              shopping list items, recently viewed recipes.
            </p>

            <h3
              className="mb-4 mt-8 font-semibold sm:mb-3 sm:mt-6"
              style={{
                fontSize: "clamp(1.25rem, 2vw + 0.5rem, 1.5rem)",
                lineHeight: "1.4",
              }}
            >
              2.4 Performance Cookies
            </h3>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              These cookies help us monitor application performance, identify
              errors, and improve loading times. They collect information about
              page load times, server response times, and error reports.
            </p>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              <strong>Examples:</strong> Sentry error tracking, performance
              monitoring, crash reports.
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
              3. THIRD-PARTY COOKIES
            </h2>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              We work with trusted third-party service providers who may set
              cookies on your device when you use the Service:
            </p>
            <ul
              className="mb-6 list-disc pl-6 sm:mb-4"
              style={{ lineHeight: "1.75" }}
            >
              <li className="mb-2">
                <strong>Firebase:</strong> Authentication, database, and
                analytics services
              </li>
              <li className="mb-2">
                <strong>Google Analytics:</strong> Website and app usage
                analytics
              </li>
              <li className="mb-2">
                <strong>Sentry:</strong> Error tracking and performance
                monitoring
              </li>
              <li className="mb-2">
                <strong>Vercel:</strong> Web hosting and performance
                optimization
              </li>
            </ul>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              These third parties have their own privacy policies and cookie
              policies. We do not control or have access to these third-party
              cookies.
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
              4. HOW TO MANAGE COOKIES
            </h2>

            <h3
              className="mb-4 mt-8 font-semibold sm:mb-3 sm:mt-6"
              style={{
                fontSize: "clamp(1.25rem, 2vw + 0.5rem, 1.5rem)",
                lineHeight: "1.4",
              }}
            >
              4.1 Browser Settings
            </h3>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              Most web browsers allow you to control cookies through their
              settings. You can set your browser to refuse all or some cookies,
              or to alert you when cookies are being set. However, if you
              disable or refuse cookies, some parts of the Service may not
              function properly.
            </p>
            <ul
              className="mb-6 list-disc pl-6 sm:mb-4"
              style={{ lineHeight: "1.75" }}
            >
              <li className="mb-2">
                <strong>Chrome:</strong> Settings &gt; Privacy and security &gt;
                Cookies and other site data
              </li>
              <li className="mb-2">
                <strong>Firefox:</strong> Settings &gt; Privacy & Security &gt;
                Cookies and Site Data
              </li>
              <li className="mb-2">
                <strong>Safari:</strong> Preferences &gt; Privacy &gt; Manage
                Website Data
              </li>
              <li className="mb-2">
                <strong>Edge:</strong> Settings &gt; Cookies and site
                permissions &gt; Cookies and site data
              </li>
            </ul>

            <h3
              className="mb-4 mt-8 font-semibold sm:mb-3 sm:mt-6"
              style={{
                fontSize: "clamp(1.25rem, 2vw + 0.5rem, 1.5rem)",
                lineHeight: "1.4",
              }}
            >
              4.2 Mobile Device Settings
            </h3>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              On mobile devices, you can manage tracking and analytics through
              your device settings:
            </p>
            <ul
              className="mb-6 list-disc pl-6 sm:mb-4"
              style={{ lineHeight: "1.75" }}
            >
              <li className="mb-2">
                <strong>iOS:</strong> Settings &gt; Privacy &gt; Tracking /
                Settings &gt; Privacy &gt; Apple Advertising
              </li>
              <li className="mb-2">
                <strong>Android:</strong> Settings &gt; Google &gt; Ads /
                Settings &gt; Privacy &gt; Ads
              </li>
            </ul>

            <h3
              className="mb-4 mt-8 font-semibold sm:mb-3 sm:mt-6"
              style={{
                fontSize: "clamp(1.25rem, 2vw + 0.5rem, 1.5rem)",
                lineHeight: "1.4",
              }}
            >
              4.3 Analytics Opt-Out
            </h3>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              You can opt out of Google Analytics by installing the{" "}
              <a
                href="https://tools.google.com/dlpage/gaoptout"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#FF1E00] hover:underline"
              >
                Google Analytics Opt-out Browser Add-on
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
              5. DATA RETENTION
            </h2>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              Session cookies expire when you close your browser or app.
              Persistent cookies remain on your device until they expire or you
              delete them. Analytics data is typically retained for 26 months in
              accordance with Google Analytics retention policies.
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
              6. YOUR RIGHTS
            </h2>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              Depending on your location, you may have certain rights regarding
              cookies and tracking:
            </p>
            <ul
              className="mb-6 list-disc pl-6 sm:mb-4"
              style={{ lineHeight: "1.75" }}
            >
              <li className="mb-2">
                The right to be informed about the cookies we use
              </li>
              <li className="mb-2">
                The right to consent to or refuse non-essential cookies
              </li>
              <li className="mb-2">
                The right to withdraw your consent at any time
              </li>
              <li className="mb-2">
                The right to access data collected through cookies
              </li>
              <li className="mb-2">The right to have cookie data deleted</li>
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
              7. UPDATES TO THIS POLICY
            </h2>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              We may update this Cookie Policy from time to time to reflect
              changes in our practices or for other operational, legal, or
              regulatory reasons. We will notify you of any material changes by
              posting the updated policy on this page with a new effective date.
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
              8. CONTACT US
            </h2>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              If you have questions about this Cookie Policy or our use of
              cookies, please contact us at:
            </p>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              Email:{" "}
              <a
                href="mailto:privacy@gruby.app"
                className="text-[#FF1E00] hover:underline"
              >
                privacy@gruby.app
              </a>
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
}
