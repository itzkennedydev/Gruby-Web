import type { Metadata } from "next";
import { DocsLayout } from "@/components/DocsLayout";

export const metadata: Metadata = {
  title: "Third-Party Services Disclosure | Gruby",
  description: "Gruby Third-Party Services Disclosure - Effective December 22, 2025",
};

export default function ThirdPartyServicesPage() {
  return (
    <DocsLayout title="Third-Party Services" currentPath="/third-party-services">
          <h1
            className="mb-6 font-semibold sm:mb-4"
            style={{
              fontSize: "clamp(1.875rem, 4vw + 1rem, 3rem)",
              lineHeight: "1.2",
            }}
          >
            THIRD-PARTY SERVICES DISCLOSURE
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
            Gruby uses various third-party services to provide, improve, and secure our mobile application. This disclosure provides transparency about the categories of services we use, their purposes, and how they may affect your data. Your use of Gruby constitutes acceptance of these third-party services.
          </p>

          <section className="mb-10 sm:mb-8">
            <h2
              className="mb-6 mt-10 font-semibold sm:mb-4 sm:mt-8"
              style={{
                fontSize: "clamp(1.5rem, 2.5vw + 0.75rem, 1.875rem)",
                lineHeight: "1.3",
              }}
            >
              1. CATEGORIES OF THIRD-PARTY SERVICES
            </h2>

            <h3
              className="mb-4 mt-8 font-semibold sm:mb-3 sm:mt-6"
              style={{
                fontSize: "clamp(1.25rem, 2vw + 0.5rem, 1.5rem)",
                lineHeight: "1.4",
              }}
            >
              1.1 Cloud Infrastructure Providers
            </h3>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              <strong>Purpose:</strong> Our core backend infrastructure including:
            </p>
            <ul
              className="mb-6 list-disc pl-6 sm:mb-4"
              style={{ lineHeight: "1.75" }}
            >
              <li className="mb-2"><strong>Authentication Services:</strong> Manages user account creation, login, and session management</li>
              <li className="mb-2"><strong>Database Services:</strong> Stores user data, recipes, shopping lists, social connections, and all app content</li>
              <li className="mb-2"><strong>Cloud Storage:</strong> Stores user-uploaded media including photos, videos, and profile images</li>
              <li className="mb-2"><strong>Serverless Computing:</strong> Backend logic for processing, automation, and integrations</li>
            </ul>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              <strong>Data Processed:</strong> Account information, user content, usage data, device information
            </p>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              <strong>Data Location:</strong> United States
            </p>
          </section>

          <section className="mb-10 sm:mb-8">
            <h3
              className="mb-4 mt-8 font-semibold sm:mb-3 sm:mt-6"
              style={{
                fontSize: "clamp(1.25rem, 2vw + 0.5rem, 1.5rem)",
                lineHeight: "1.4",
              }}
            >
              1.2 AI Service Providers
            </h3>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              <strong>Purpose:</strong> Powers our AI-driven features including:
            </p>
            <ul
              className="mb-6 list-disc pl-6 sm:mb-4"
              style={{ lineHeight: "1.75" }}
            >
              <li className="mb-2"><strong>AI Budget Coach:</strong> Conversational assistant for meal planning and budget optimization</li>
              <li className="mb-2"><strong>Recipe Recommendations:</strong> Personalized recipe suggestions based on preferences and history</li>
              <li className="mb-2"><strong>Meal Planning:</strong> Intelligent meal plan generation</li>
              <li className="mb-2"><strong>Conversational Assistance:</strong> Natural language interaction for various app features</li>
            </ul>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              <strong>Data Processed:</strong> Your queries, dietary preferences, cooking history, shopping data (used for context)
            </p>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              <strong>Important Notes:</strong>
            </p>
            <ul
              className="mb-6 list-disc pl-6 sm:mb-4"
              style={{ lineHeight: "1.75" }}
            >
              <li className="mb-2">AI responses are generated and may not always be accurate</li>
              <li className="mb-2">AI outputs should not be considered professional medical, dietary, or financial advice</li>
              <li className="mb-2">We have data processing agreements with our AI providers</li>
            </ul>
          </section>

          <section className="mb-10 sm:mb-8">
            <h3
              className="mb-4 mt-8 font-semibold sm:mb-3 sm:mt-6"
              style={{
                fontSize: "clamp(1.25rem, 2vw + 0.5rem, 1.5rem)",
                lineHeight: "1.4",
              }}
            >
              1.3 Computer Vision Providers
            </h3>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              <strong>Purpose:</strong> Image analysis for:
            </p>
            <ul
              className="mb-6 list-disc pl-6 sm:mb-4"
              style={{ lineHeight: "1.75" }}
            >
              <li className="mb-2"><strong>Barcode Scanning:</strong> Reading product barcodes for shopping and pantry features</li>
              <li className="mb-2"><strong>OCR (Optical Character Recognition):</strong> Extracting text from images for recipe import</li>
            </ul>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              <strong>Data Processed:</strong> Images you capture for scanning (not stored beyond processing)
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
              2. AUTHENTICATION PROVIDERS
            </h2>

            <h3
              className="mb-4 mt-8 font-semibold sm:mb-3 sm:mt-6"
              style={{
                fontSize: "clamp(1.25rem, 2vw + 0.5rem, 1.5rem)",
                lineHeight: "1.4",
              }}
            >
              2.1 Apple Sign-In
            </h3>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              <strong>Purpose:</strong> Optional single sign-on authentication
            </p>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              <strong>Data We Receive:</strong> Name, email address (or Apple&apos;s private relay email if you choose to hide your email), and a unique identifier
            </p>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              <strong>Your Control:</strong> You can choose to hide your email address using Apple&apos;s private relay feature
            </p>

            <h3
              className="mb-4 mt-8 font-semibold sm:mb-3 sm:mt-6"
              style={{
                fontSize: "clamp(1.25rem, 2vw + 0.5rem, 1.5rem)",
                lineHeight: "1.4",
              }}
            >
              2.2 Google Sign-In
            </h3>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              <strong>Purpose:</strong> Optional single sign-on authentication
            </p>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              <strong>Data We Receive:</strong> Name, email address, profile picture, and a unique identifier
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
              3. GROCERY PARTNER SERVICES
            </h2>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              <strong>Purpose:</strong> Smart shopping features including:
            </p>
            <ul
              className="mb-6 list-disc pl-6 sm:mb-4"
              style={{ lineHeight: "1.75" }}
            >
              <li className="mb-2"><strong>Real-time Pricing:</strong> Current grocery prices for shopping list items</li>
              <li className="mb-2"><strong>Product Data:</strong> Product information, images, and availability</li>
              <li className="mb-2"><strong>Store Locator:</strong> Finding nearby grocery stores</li>
              <li className="mb-2"><strong>Price Comparison:</strong> Comparing prices across products</li>
            </ul>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              <strong>Data We Share:</strong> Shopping list items (product searches), general location (for store locating)
            </p>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              <strong>Data We Receive:</strong> Product pricing, availability, store locations, product images
            </p>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              <strong>Important Notes:</strong>
            </p>
            <ul
              className="mb-6 list-disc pl-6 sm:mb-4"
              style={{ lineHeight: "1.75" }}
            >
              <li className="mb-2">Prices are estimates and may differ from in-store prices</li>
              <li className="mb-2">Product availability is subject to change</li>
              <li className="mb-2">Any purchases made at partner stores are subject to their terms</li>
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
              4. VIDEO AND CONTENT PLATFORMS
            </h2>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              When you import recipes from video platforms (YouTube, TikTok, Instagram) or websites, we extract recipe information from those sources. We do not access your accounts on these platforms.
            </p>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              <strong>Data Processed:</strong> Video/post URLs you provide for import
            </p>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              We may also use stock photo services to provide images for recipes when users don&apos;t have their own images.
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
              5. NOTIFICATION SERVICES
            </h2>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              <strong>Purpose:</strong> Delivering push notifications for:
            </p>
            <ul
              className="mb-6 list-disc pl-6 sm:mb-4"
              style={{ lineHeight: "1.75" }}
            >
              <li className="mb-2">New messages</li>
              <li className="mb-2">Gathering invitations and updates</li>
              <li className="mb-2">Expiration reminders</li>
              <li className="mb-2">Social interactions (likes, comments, follows)</li>
              <li className="mb-2">App updates and announcements</li>
            </ul>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              <strong>Data Processed:</strong> Push notification tokens (device identifiers), notification content
            </p>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              <strong>Your Control:</strong> You can disable push notifications in your device settings or app settings
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
              6. ANALYTICS AND MONITORING
            </h2>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              <strong>Purpose:</strong> Error tracking, crash reporting, and performance monitoring to identify and fix bugs
            </p>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              <strong>Data Processed:</strong> Error logs, stack traces, device information, app state at time of error. We do not intentionally send personal data to analytics providers.
            </p>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              <strong>Data Retention:</strong> 90 days for error logs
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
              7. END-TO-END ENCRYPTION
            </h2>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              <strong>Purpose:</strong> Provides end-to-end encryption for direct messages between users
            </p>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              <strong>How It Works:</strong>
            </p>
            <ul
              className="mb-6 list-disc pl-6 sm:mb-4"
              style={{ lineHeight: "1.75" }}
            >
              <li className="mb-2">Messages are encrypted on your device before transmission</li>
              <li className="mb-2">Only you and your recipient can decrypt and read messages</li>
              <li className="mb-2">Gruby cannot read the content of encrypted messages</li>
              <li className="mb-2">Encryption keys are managed locally on your device</li>
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
              8. SUMMARY OF SERVICE CATEGORIES
            </h2>
            <div className="overflow-x-auto mb-6">
              <table className="min-w-full border-collapse border border-gray-300 text-sm">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Category</th>
                    <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Purpose</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">Cloud Infrastructure</td>
                    <td className="border border-gray-300 px-4 py-2">Backend services, database, storage</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2">AI Services</td>
                    <td className="border border-gray-300 px-4 py-2">Budget Coach, recommendations, meal planning</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">Computer Vision</td>
                    <td className="border border-gray-300 px-4 py-2">OCR, barcode scanning</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2">Grocery Partners</td>
                    <td className="border border-gray-300 px-4 py-2">Real-time pricing, product data</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">Authentication</td>
                    <td className="border border-gray-300 px-4 py-2">Apple Sign-In, Google Sign-In</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2">Notification Services</td>
                    <td className="border border-gray-300 px-4 py-2">Push notifications</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">Analytics</td>
                    <td className="border border-gray-300 px-4 py-2">Error tracking, performance monitoring</td>
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
              9. YOUR CHOICES
            </h2>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              You have control over certain third-party services:
            </p>
            <ul
              className="mb-6 list-disc pl-6 sm:mb-4"
              style={{ lineHeight: "1.75" }}
            >
              <li className="mb-2"><strong>Authentication:</strong> Choose email/password, Apple, or Google sign-in</li>
              <li className="mb-2"><strong>Push Notifications:</strong> Enable/disable in device or app settings</li>
              <li className="mb-2"><strong>Analytics:</strong> Limit tracking via device privacy settings</li>
              <li className="mb-2"><strong>Location Services:</strong> Grant or deny location permission</li>
              <li className="mb-2"><strong>AI Features:</strong> Optional - you don&apos;t have to use AI-powered features</li>
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
              10. CHANGES TO THIS DISCLOSURE
            </h2>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              We may update this Third-Party Services Disclosure when we add, remove, or change service providers. We will post updates to this page with a new effective date.
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
              11. CONTACT US
            </h2>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              If you have questions about our third-party services, please contact us:
            </p>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              <strong>Gruby Privacy Team</strong><br />
              Email: <a href="mailto:privacy@gruby.app" className="text-[#222222] hover:underline">privacy@gruby.app</a>
            </p>
          </section>
    </DocsLayout>
  );
}
