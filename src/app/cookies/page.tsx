import type { Metadata } from "next";
import { DocsLayout } from "@/components/DocsLayout";

export const metadata: Metadata = {
  title: "Cookie Policy | Gruby",
  description: "Gruby Cookie Policy - Effective December 15, 2025",
};

export default function CookiePolicyPage() {
  return (
    <DocsLayout title="Cookie Policy" currentPath="/cookies">
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
              experience. Similar technologies include pixels, web beacons,
              local storage, and mobile device identifiers.
            </p>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              In the context of our mobile app, &quot;cookies&quot; in this
              policy also refers to similar storage mechanisms including:
            </p>
            <ul
              className="mb-6 list-disc pl-6 sm:mb-4"
              style={{ lineHeight: "1.75" }}
            >
              <li className="mb-2">
                <strong>AsyncStorage:</strong> Local data storage on your mobile
                device
              </li>
              <li className="mb-2">
                <strong>SecureStore:</strong> Encrypted storage for sensitive
                data like authentication tokens
              </li>
              <li className="mb-2">
                <strong>Database Local Persistence:</strong> Cached data from
                our database for offline access
              </li>
              <li className="mb-2">
                <strong>Device Identifiers:</strong> Unique identifiers used for
                analytics and push notifications
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
              2. TYPES OF COOKIES WE USE
            </h2>

            <h3
              className="mb-4 mt-8 font-semibold sm:mb-3 sm:mt-6"
              style={{
                fontSize: "clamp(1.25rem, 2vw + 0.5rem, 1.5rem)",
                lineHeight: "1.4",
              }}
            >
              2.1 Essential Cookies (Strictly Necessary)
            </h3>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              These cookies are necessary for the Service to function properly.
              They enable core functionality such as security, authentication,
              and maintaining your session. Without these cookies, certain
              features of the Service cannot be provided. These cookies cannot
              be disabled.
            </p>
            <div className="mb-6 overflow-x-auto sm:mb-4">
              <table className="min-w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold">
                      Cookie/Technology
                    </th>
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold">
                      Purpose
                    </th>
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold">
                      Duration
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-3">
                      Auth Token
                    </td>
                    <td className="border border-gray-300 px-4 py-3">
                      Maintains your logged-in session securely
                    </td>
                    <td className="border border-gray-300 px-4 py-3">
                      1 hour (auto-refreshed)
                    </td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3">
                      Refresh Token
                    </td>
                    <td className="border border-gray-300 px-4 py-3">
                      Allows secure session renewal without re-login
                    </td>
                    <td className="border border-gray-300 px-4 py-3">
                      Until logout or 30 days inactive
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-3">
                      Session State
                    </td>
                    <td className="border border-gray-300 px-4 py-3">
                      Tracks authentication state across app restarts
                    </td>
                    <td className="border border-gray-300 px-4 py-3">
                      Persistent
                    </td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3">
                      CSRF Token
                    </td>
                    <td className="border border-gray-300 px-4 py-3">
                      Protects against cross-site request forgery attacks
                    </td>
                    <td className="border border-gray-300 px-4 py-3">
                      Session
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-3">
                      E2E Encryption Keys
                    </td>
                    <td className="border border-gray-300 px-4 py-3">
                      Local encryption keys for secure messaging
                    </td>
                    <td className="border border-gray-300 px-4 py-3">
                      Persistent
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3
              className="mb-4 mt-8 font-semibold sm:mb-3 sm:mt-6"
              style={{
                fontSize: "clamp(1.25rem, 2vw + 0.5rem, 1.5rem)",
                lineHeight: "1.4",
              }}
            >
              2.2 Functional Cookies
            </h3>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              These cookies enable enhanced functionality and personalization,
              such as remembering your preferences, saved recipes, dietary
              restrictions, and display settings.
            </p>
            <div className="mb-6 overflow-x-auto sm:mb-4">
              <table className="min-w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold">
                      Cookie/Technology
                    </th>
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold">
                      Purpose
                    </th>
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold">
                      Duration
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-3">
                      User Preferences
                    </td>
                    <td className="border border-gray-300 px-4 py-3">
                      Theme (light/dark mode), units (metric/imperial), language
                    </td>
                    <td className="border border-gray-300 px-4 py-3">
                      Persistent
                    </td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3">
                      Dietary Settings
                    </td>
                    <td className="border border-gray-300 px-4 py-3">
                      Your dietary restrictions and allergen filters
                    </td>
                    <td className="border border-gray-300 px-4 py-3">
                      Persistent
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-3">
                      Preferred Store
                    </td>
                    <td className="border border-gray-300 px-4 py-3">
                      Your selected grocery store for pricing
                    </td>
                    <td className="border border-gray-300 px-4 py-3">
                      Persistent
                    </td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3">
                      Recent Searches
                    </td>
                    <td className="border border-gray-300 px-4 py-3">
                      Your recent recipe and ingredient searches
                    </td>
                    <td className="border border-gray-300 px-4 py-3">
                      30 days
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-3">
                      Onboarding State
                    </td>
                    <td className="border border-gray-300 px-4 py-3">
                      Tracks which tutorials you have completed
                    </td>
                    <td className="border border-gray-300 px-4 py-3">
                      Persistent
                    </td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3">
                      Notification Preferences
                    </td>
                    <td className="border border-gray-300 px-4 py-3">
                      Your push notification settings
                    </td>
                    <td className="border border-gray-300 px-4 py-3">
                      Persistent
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3
              className="mb-4 mt-8 font-semibold sm:mb-3 sm:mt-6"
              style={{
                fontSize: "clamp(1.25rem, 2vw + 0.5rem, 1.5rem)",
                lineHeight: "1.4",
              }}
            >
              2.3 Analytics Cookies
            </h3>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              These cookies help us understand how users interact with the
              Service by collecting information about usage patterns, popular
              features, and areas for improvement. We use this data to optimize
              the Service and provide a better user experience.
            </p>
            <div className="mb-6 overflow-x-auto sm:mb-4">
              <table className="min-w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold">
                      Cookie/Technology
                    </th>
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold">
                      Purpose
                    </th>
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold">
                      Duration
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-3">
                      App Analytics
                    </td>
                    <td className="border border-gray-300 px-4 py-3">
                      App usage analytics, feature engagement, user flows
                    </td>
                    <td className="border border-gray-300 px-4 py-3">
                      14 months
                    </td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3">
                      Website Analytics
                    </td>
                    <td className="border border-gray-300 px-4 py-3">
                      Website traffic analysis, page views, session data
                    </td>
                    <td className="border border-gray-300 px-4 py-3">
                      Up to 2 years
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-3">
                      App Instance ID
                    </td>
                    <td className="border border-gray-300 px-4 py-3">
                      Identifies unique app installations for analytics
                    </td>
                    <td className="border border-gray-300 px-4 py-3">
                      Until app uninstall
                    </td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3">
                      Feature Usage Metrics
                    </td>
                    <td className="border border-gray-300 px-4 py-3">
                      Which features you use most (recipes, pantry, AI, etc.)
                    </td>
                    <td className="border border-gray-300 px-4 py-3">
                      Aggregated indefinitely
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3
              className="mb-4 mt-8 font-semibold sm:mb-3 sm:mt-6"
              style={{
                fontSize: "clamp(1.25rem, 2vw + 0.5rem, 1.5rem)",
                lineHeight: "1.4",
              }}
            >
              2.4 Performance and Error Tracking Cookies
            </h3>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              These cookies help us monitor application performance, identify
              errors, and improve loading times. They collect information about
              page load times, server response times, and error reports.
            </p>
            <div className="mb-6 overflow-x-auto sm:mb-4">
              <table className="min-w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold">
                      Cookie/Technology
                    </th>
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold">
                      Purpose
                    </th>
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold">
                      Duration
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-3">
                      Error Tracking
                    </td>
                    <td className="border border-gray-300 px-4 py-3">
                      Captures crashes and errors to help us fix bugs
                    </td>
                    <td className="border border-gray-300 px-4 py-3">
                      90 days
                    </td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3">
                      Crash Reporting
                    </td>
                    <td className="border border-gray-300 px-4 py-3">
                      Crash reporting and stability monitoring
                    </td>
                    <td className="border border-gray-300 px-4 py-3">
                      90 days
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-3">
                      Performance Metrics
                    </td>
                    <td className="border border-gray-300 px-4 py-3">
                      App load times, API response times, render performance
                    </td>
                    <td className="border border-gray-300 px-4 py-3">
                      30 days
                    </td>
                  </tr>
                </tbody>
              </table>
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
              3. THIRD-PARTY COOKIES AND SERVICES
            </h2>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              We work with trusted third-party service providers who may set
              cookies or use similar technologies on your device when you use
              the Service:
            </p>

            <h3
              className="mb-4 mt-8 font-semibold sm:mb-3 sm:mt-6"
              style={{
                fontSize: "clamp(1.25rem, 2vw + 0.5rem, 1.5rem)",
                lineHeight: "1.4",
              }}
            >
              3.1 Cloud Infrastructure Services
            </h3>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              Used for authentication, database, cloud storage, analytics, and
              push notifications.
            </p>
            <ul
              className="mb-6 list-disc pl-6 sm:mb-4"
              style={{ lineHeight: "1.75" }}
            >
              <li className="mb-2">
                <strong>Authentication:</strong> Secure sign-in and
                session management
              </li>
              <li className="mb-2">
                <strong>Database:</strong> Real-time database with
                local caching
              </li>
              <li className="mb-2">
                <strong>Cloud Storage:</strong> Recipe images and user
                content
              </li>
              <li className="mb-2">
                <strong>Analytics:</strong> Usage statistics and
                feature tracking
              </li>
              <li className="mb-2">
                <strong>Push Notifications:</strong> Push notification
                delivery
              </li>
            </ul>

            <h3
              className="mb-4 mt-8 font-semibold sm:mb-3 sm:mt-6"
              style={{
                fontSize: "clamp(1.25rem, 2vw + 0.5rem, 1.5rem)",
                lineHeight: "1.4",
              }}
            >
              3.2 AI Services
            </h3>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              Powers AI recipe suggestions, ingredient analysis, and smart
              features. API requests are made server-side; no cookies are set on
              your device directly by AI services.
            </p>

            <h3
              className="mb-4 mt-8 font-semibold sm:mb-3 sm:mt-6"
              style={{
                fontSize: "clamp(1.25rem, 2vw + 0.5rem, 1.5rem)",
                lineHeight: "1.4",
              }}
            >
              3.3 Computer Vision Services
            </h3>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              Used for ingredient scanning via camera. Images are processed
              server-side and not stored after processing.
            </p>

            <h3
              className="mb-4 mt-8 font-semibold sm:mb-3 sm:mt-6"
              style={{
                fontSize: "clamp(1.25rem, 2vw + 0.5rem, 1.5rem)",
                lineHeight: "1.4",
              }}
            >
              3.4 Grocery Partner Services
            </h3>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              Provides real-time grocery pricing and store location data. Your
              location may be shared for location-based pricing.
            </p>

            <h3
              className="mb-4 mt-8 font-semibold sm:mb-3 sm:mt-6"
              style={{
                fontSize: "clamp(1.25rem, 2vw + 0.5rem, 1.5rem)",
                lineHeight: "1.4",
              }}
            >
              3.5 Stock Photo Services
            </h3>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              Provides stock photography for recipes when user photos are not
              available.
            </p>

            <h3
              className="mb-4 mt-8 font-semibold sm:mb-3 sm:mt-6"
              style={{
                fontSize: "clamp(1.25rem, 2vw + 0.5rem, 1.5rem)",
                lineHeight: "1.4",
              }}
            >
              3.6 Push Notification Services
            </h3>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              Manages push notification delivery to your device. Stores a push
              token to identify your device.
            </p>

            <h3
              className="mb-4 mt-8 font-semibold sm:mb-3 sm:mt-6"
              style={{
                fontSize: "clamp(1.25rem, 2vw + 0.5rem, 1.5rem)",
                lineHeight: "1.4",
              }}
            >
              3.7 Error Tracking Services
            </h3>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              Captures error reports and crash data to help us identify and fix
              bugs quickly.
            </p>

            <h3
              className="mb-4 mt-8 font-semibold sm:mb-3 sm:mt-6"
              style={{
                fontSize: "clamp(1.25rem, 2vw + 0.5rem, 1.5rem)",
                lineHeight: "1.4",
              }}
            >
              3.8 Website Hosting Services
            </h3>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              Hosts our website with performance optimization and analytics.
            </p>

            <h3
              className="mb-4 mt-8 font-semibold sm:mb-3 sm:mt-6"
              style={{
                fontSize: "clamp(1.25rem, 2vw + 0.5rem, 1.5rem)",
                lineHeight: "1.4",
              }}
            >
              3.9 Apple/Google Sign-In
            </h3>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              If you sign in with Apple or Google, those services may set their
              own cookies in accordance with their privacy policies.
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
              4.1 Browser Settings (Website)
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
              4.2 Mobile Device Settings (App)
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
                <strong>iOS:</strong> Settings &gt; Privacy & Security &gt;
                Tracking (to disable app tracking requests)
              </li>
              <li className="mb-2">
                <strong>iOS:</strong> Settings &gt; Privacy & Security &gt;
                Apple Advertising (to limit ad tracking)
              </li>
              <li className="mb-2">
                <strong>Android:</strong> Settings &gt; Google &gt; Ads &gt;
                Delete advertising ID
              </li>
              <li className="mb-2">
                <strong>Android:</strong> Settings &gt; Privacy &gt; Ads &gt;
                Opt out of Ads Personalization
              </li>
            </ul>

            <h3
              className="mb-4 mt-8 font-semibold sm:mb-3 sm:mt-6"
              style={{
                fontSize: "clamp(1.25rem, 2vw + 0.5rem, 1.5rem)",
                lineHeight: "1.4",
              }}
            >
              4.3 In-App Privacy Settings
            </h3>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              Within Gruby, navigate to Settings &gt; Privacy to:
            </p>
            <ul
              className="mb-6 list-disc pl-6 sm:mb-4"
              style={{ lineHeight: "1.75" }}
            >
              <li className="mb-2">Opt out of analytics data collection</li>
              <li className="mb-2">Clear cached data and preferences</li>
              <li className="mb-2">Manage push notification settings</li>
              <li className="mb-2">Request data export or deletion</li>
            </ul>

            <h3
              className="mb-4 mt-8 font-semibold sm:mb-3 sm:mt-6"
              style={{
                fontSize: "clamp(1.25rem, 2vw + 0.5rem, 1.5rem)",
                lineHeight: "1.4",
              }}
            >
              4.4 Analytics Opt-Out
            </h3>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              You can opt out of Google Analytics by installing the{" "}
              <a
                href="https://tools.google.com/dlpage/gaoptout"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#222222] hover:underline"
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
              Different cookies have different retention periods:
            </p>
            <ul
              className="mb-6 list-disc pl-6 sm:mb-4"
              style={{ lineHeight: "1.75" }}
            >
              <li className="mb-2">
                <strong>Session cookies:</strong> Expire when you close your
                browser or app
              </li>
              <li className="mb-2">
                <strong>Persistent cookies:</strong> Remain on your device until
                they expire or you delete them
              </li>
              <li className="mb-2">
                <strong>Analytics data:</strong> Retained for 14-26 months
                depending on the service
              </li>
              <li className="mb-2">
                <strong>Error/crash reports:</strong> Retained for 90 days
              </li>
              <li className="mb-2">
                <strong>User preferences:</strong> Retained until you change
                them or delete your account
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

            <h3
              className="mb-4 mt-8 font-semibold sm:mb-3 sm:mt-6"
              style={{
                fontSize: "clamp(1.25rem, 2vw + 0.5rem, 1.5rem)",
                lineHeight: "1.4",
              }}
            >
              6.1 European Users (GDPR)
            </h3>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              If you are in the European Economic Area, we will request your
              consent before setting non-essential cookies. You can withdraw
              consent at any time through our cookie settings.
            </p>

            <h3
              className="mb-4 mt-8 font-semibold sm:mb-3 sm:mt-6"
              style={{
                fontSize: "clamp(1.25rem, 2vw + 0.5rem, 1.5rem)",
                lineHeight: "1.4",
              }}
            >
              6.2 California Residents (CCPA/CPRA)
            </h3>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              California residents may opt out of the &quot;sale&quot; or
              &quot;sharing&quot; of personal information. We do not sell your
              data, but you can limit analytics tracking through your device
              settings.
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
              7. UPDATES TO THIS POLICY
            </h2>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              We may update this Cookie Policy from time to time to reflect
              changes in our practices, the services we use, or for other
              operational, legal, or regulatory reasons. We will notify you of
              any material changes by posting the updated policy on this page
              with a new effective date.
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
              cookies and similar technologies, please contact us at:
            </p>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              Email:{" "}
              <a
                href="mailto:privacy@gruby.app"
                className="text-[#222222] hover:underline"
              >
                privacy@gruby.app
              </a>
            </p>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              Subject line: &quot;Cookie Policy Inquiry&quot;
            </p>
          </section>
    </DocsLayout>
  );
}
