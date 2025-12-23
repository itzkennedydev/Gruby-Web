import type { Metadata } from "next";
import { DocsLayout } from "@/components/DocsLayout";

export const metadata: Metadata = {
  title: "Location Services Disclosure | Gruby",
  description:
    "Gruby Location Services Disclosure - How we use your location data",
};

export default function LocationServicesPage() {
  return (
    <DocsLayout title="Location Services" currentPath="/location-services">
          <h1
            className="mb-6 font-semibold sm:mb-4"
            style={{
              fontSize: "clamp(1.875rem, 4vw + 1rem, 3rem)",
              lineHeight: "1.2",
            }}
          >
            GRUBY LOCATION SERVICES DISCLOSURE
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
            This Location Services Disclosure explains how Gruby (&quot;we,&quot;
            &quot;us,&quot; or &quot;our&quot;) collects, uses, and protects your
            location data when you use our mobile application. We are committed
            to transparency about our location practices and giving you control
            over your location information.
          </p>

          <section className="mb-10 sm:mb-8">
            <h2
              className="mb-6 mt-10 font-semibold sm:mb-4 sm:mt-8"
              style={{
                fontSize: "clamp(1.5rem, 2.5vw + 0.75rem, 1.875rem)",
                lineHeight: "1.3",
              }}
            >
              1. LOCATION DATA WE COLLECT
            </h2>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              With your permission, Gruby may collect the following types of
              location information:
            </p>

            <h3
              className="mb-4 mt-8 font-semibold sm:mb-3 sm:mt-6"
              style={{
                fontSize: "clamp(1.25rem, 2vw + 0.5rem, 1.5rem)",
                lineHeight: "1.4",
              }}
            >
              1.1 Precise Location
            </h3>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              GPS coordinates from your device, typically accurate within 10-50
              meters. This is collected only when you actively use location-based
              features.
            </p>

            <h3
              className="mb-4 mt-8 font-semibold sm:mb-3 sm:mt-6"
              style={{
                fontSize: "clamp(1.25rem, 2vw + 0.5rem, 1.5rem)",
                lineHeight: "1.4",
              }}
            >
              1.2 Coarse Location
            </h3>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              Approximate location based on city, ZIP code, or general area.
              This may be derived from your IP address or network information.
            </p>

            <h3
              className="mb-4 mt-8 font-semibold sm:mb-3 sm:mt-6"
              style={{
                fontSize: "clamp(1.25rem, 2vw + 0.5rem, 1.5rem)",
                lineHeight: "1.4",
              }}
            >
              1.3 User-Provided Location
            </h3>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              Location information you manually enter, such as your preferred
              grocery store, delivery address, or Gathering location.
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
              2. HOW WE USE YOUR LOCATION
            </h2>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              We use location data for the following specific purposes:
            </p>

            <div className="mb-6 overflow-x-auto sm:mb-4">
              <table className="min-w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold">
                      Feature
                    </th>
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold">
                      Location Type
                    </th>
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold">
                      Purpose
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-3">
                      Store Locator
                    </td>
                    <td className="border border-gray-300 px-4 py-3">
                      Precise or Coarse
                    </td>
                    <td className="border border-gray-300 px-4 py-3">
                      Find nearby grocery stores and show distance/directions
                    </td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3">
                      Grocery Price Lookup
                    </td>
                    <td className="border border-gray-300 px-4 py-3">
                      Coarse (ZIP code)
                    </td>
                    <td className="border border-gray-300 px-4 py-3">
                      Show accurate, location-specific pricing via Kroger API
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-3">
                      Gatherings Discovery
                    </td>
                    <td className="border border-gray-300 px-4 py-3">
                      Coarse or Precise
                    </td>
                    <td className="border border-gray-300 px-4 py-3">
                      Find nearby Gatherings and cooking events in your area
                    </td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3">
                      Gathering Hosting
                    </td>
                    <td className="border border-gray-300 px-4 py-3">
                      User-Provided
                    </td>
                    <td className="border border-gray-300 px-4 py-3">
                      Set and share Gathering location with invited participants
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-3">
                      Regional Content
                    </td>
                    <td className="border border-gray-300 px-4 py-3">
                      Coarse (Country/Region)
                    </td>
                    <td className="border border-gray-300 px-4 py-3">
                      Show locally relevant recipes, ingredients, and units
                    </td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3">
                      Shopping List Optimization
                    </td>
                    <td className="border border-gray-300 px-4 py-3">
                      User-Provided
                    </td>
                    <td className="border border-gray-300 px-4 py-3">
                      Organize lists by store layout for your preferred store
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
              3. WHEN LOCATION IS COLLECTED
            </h2>

            <h3
              className="mb-4 mt-8 font-semibold sm:mb-3 sm:mt-6"
              style={{
                fontSize: "clamp(1.25rem, 2vw + 0.5rem, 1.5rem)",
                lineHeight: "1.4",
              }}
            >
              3.1 Foreground Collection Only
            </h3>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              <strong>
                Gruby only collects precise location when the app is actively in
                use (foreground).
              </strong>{" "}
              We do NOT track your location in the background when the app is
              closed or minimized. This is an important privacy protection.
            </p>

            <h3
              className="mb-4 mt-8 font-semibold sm:mb-3 sm:mt-6"
              style={{
                fontSize: "clamp(1.25rem, 2vw + 0.5rem, 1.5rem)",
                lineHeight: "1.4",
              }}
            >
              3.2 On-Demand Collection
            </h3>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              We request location only when you use specific features that
              require it. For example:
            </p>
            <ul
              className="mb-6 list-disc pl-6 sm:mb-4"
              style={{ lineHeight: "1.75" }}
            >
              <li className="mb-2">
                When you tap &quot;Find Stores Near Me&quot;
              </li>
              <li className="mb-2">
                When you search for Gatherings in your area
              </li>
              <li className="mb-2">
                When you view grocery prices (for location-based pricing)
              </li>
              <li className="mb-2">
                When you create a Gathering and choose to share your location
              </li>
            </ul>

            <h3
              className="mb-4 mt-8 font-semibold sm:mb-3 sm:mt-6"
              style={{
                fontSize: "clamp(1.25rem, 2vw + 0.5rem, 1.5rem)",
                lineHeight: "1.4",
              }}
            >
              3.3 No Continuous Tracking
            </h3>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              We do not continuously track or monitor your movements. Each
              location request is a one-time snapshot used for the specific
              feature you requested.
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
              4. LOCATION SHARING WITH THIRD PARTIES
            </h2>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              We share location data with third parties only as necessary to
              provide our services:
            </p>

            <h3
              className="mb-4 mt-8 font-semibold sm:mb-3 sm:mt-6"
              style={{
                fontSize: "clamp(1.25rem, 2vw + 0.5rem, 1.5rem)",
                lineHeight: "1.4",
              }}
            >
              4.1 Kroger API
            </h3>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              Your ZIP code or coarse location is sent to the Kroger API to
              retrieve accurate, location-specific grocery pricing. Kroger
              receives only the minimum location data needed (typically ZIP
              code), not your precise GPS coordinates.
            </p>

            <h3
              className="mb-4 mt-8 font-semibold sm:mb-3 sm:mt-6"
              style={{
                fontSize: "clamp(1.25rem, 2vw + 0.5rem, 1.5rem)",
                lineHeight: "1.4",
              }}
            >
              4.2 Other Gruby Users
            </h3>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              <strong>Gathering Locations:</strong> When you host a Gathering
              and provide a location, that location is shared only with users
              you invite or approve to join. Public Gatherings display a general
              area (neighborhood or city) to help users find nearby events, but
              the exact address is only revealed to confirmed participants.
            </p>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              <strong>Profile Location:</strong> If you choose to display your
              general location on your profile (e.g., &quot;San Francisco,
              CA&quot;), this is visible to other users based on your privacy
              settings.
            </p>

            <h3
              className="mb-4 mt-8 font-semibold sm:mb-3 sm:mt-6"
              style={{
                fontSize: "clamp(1.25rem, 2vw + 0.5rem, 1.5rem)",
                lineHeight: "1.4",
              }}
            >
              4.3 Firebase/Google Cloud
            </h3>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              Location data may be stored in Firebase Firestore as part of your
              user preferences or Gathering data. Google&apos;s infrastructure
              processes this data in accordance with their{" "}
              <a
                href="https://cloud.google.com/terms/data-processing-terms"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#222222] hover:underline"
              >
                Data Processing Terms
              </a>
              .
            </p>

            <h3
              className="mb-4 mt-8 font-semibold sm:mb-3 sm:mt-6"
              style={{
                fontSize: "clamp(1.25rem, 2vw + 0.5rem, 1.5rem)",
                lineHeight: "1.4",
              }}
            >
              4.4 What We Never Do
            </h3>
            <ul
              className="mb-6 list-disc pl-6 sm:mb-4"
              style={{ lineHeight: "1.75" }}
            >
              <li className="mb-2">
                We never sell your location data to advertisers or data brokers
              </li>
              <li className="mb-2">
                We never share your precise location with other users without
                your explicit consent
              </li>
              <li className="mb-2">
                We never use your location for advertising targeting
              </li>
              <li className="mb-2">
                We never build movement profiles or track your travel patterns
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
              5. LOCATION DATA RETENTION
            </h2>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              We retain location data only as long as necessary:
            </p>
            <ul
              className="mb-6 list-disc pl-6 sm:mb-4"
              style={{ lineHeight: "1.75" }}
            >
              <li className="mb-2">
                <strong>Store lookup queries:</strong> Not stored beyond the
                immediate request
              </li>
              <li className="mb-2">
                <strong>Preferred store selection:</strong> Retained until you
                change it or delete your account
              </li>
              <li className="mb-2">
                <strong>Gathering locations:</strong> Retained for 30 days after
                the Gathering ends, then deleted
              </li>
              <li className="mb-2">
                <strong>Profile location:</strong> Retained until you remove it
                or delete your account
              </li>
              <li className="mb-2">
                <strong>Price lookup location:</strong> Not stored; used only
                for the immediate API request
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
              6. YOUR LOCATION CONTROLS
            </h2>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              You have full control over your location data:
            </p>

            <h3
              className="mb-4 mt-8 font-semibold sm:mb-3 sm:mt-6"
              style={{
                fontSize: "clamp(1.25rem, 2vw + 0.5rem, 1.5rem)",
                lineHeight: "1.4",
              }}
            >
              6.1 Device-Level Controls
            </h3>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              You can manage Gruby&apos;s access to your location through your
              device settings:
            </p>
            <ul
              className="mb-6 list-disc pl-6 sm:mb-4"
              style={{ lineHeight: "1.75" }}
            >
              <li className="mb-2">
                <strong>iOS:</strong> Settings &gt; Privacy & Security &gt;
                Location Services &gt; Gruby
              </li>
              <li className="mb-2">
                <strong>Android:</strong> Settings &gt; Apps &gt; Gruby &gt;
                Permissions &gt; Location
              </li>
            </ul>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              Options typically include:
            </p>
            <ul
              className="mb-6 list-disc pl-6 sm:mb-4"
              style={{ lineHeight: "1.75" }}
            >
              <li className="mb-2">
                <strong>Never:</strong> Gruby cannot access your location
              </li>
              <li className="mb-2">
                <strong>Ask Next Time:</strong> Prompted each time a feature
                needs location
              </li>
              <li className="mb-2">
                <strong>While Using the App:</strong> Location available only
                when app is open (recommended)
              </li>
            </ul>

            <h3
              className="mb-4 mt-8 font-semibold sm:mb-3 sm:mt-6"
              style={{
                fontSize: "clamp(1.25rem, 2vw + 0.5rem, 1.5rem)",
                lineHeight: "1.4",
              }}
            >
              6.2 In-App Controls
            </h3>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              Within Gruby, you can:
            </p>
            <ul
              className="mb-6 list-disc pl-6 sm:mb-4"
              style={{ lineHeight: "1.75" }}
            >
              <li className="mb-2">Manually enter your ZIP code for pricing</li>
              <li className="mb-2">
                Choose whether to display your location on your profile
              </li>
              <li className="mb-2">
                Set Gathering locations manually without using GPS
              </li>
              <li className="mb-2">
                Search for stores by address instead of &quot;near me&quot;
              </li>
            </ul>

            <h3
              className="mb-4 mt-8 font-semibold sm:mb-3 sm:mt-6"
              style={{
                fontSize: "clamp(1.25rem, 2vw + 0.5rem, 1.5rem)",
                lineHeight: "1.4",
              }}
            >
              6.3 Delete Location Data
            </h3>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              You can request deletion of stored location data by:
            </p>
            <ul
              className="mb-6 list-disc pl-6 sm:mb-4"
              style={{ lineHeight: "1.75" }}
            >
              <li className="mb-2">
                Removing your preferred store in Settings
              </li>
              <li className="mb-2">
                Clearing your profile location in Account Settings
              </li>
              <li className="mb-2">
                Requesting full data deletion via Settings &gt; Privacy &gt;
                Delete My Data
              </li>
              <li className="mb-2">
                Emailing{" "}
                <a
                  href="mailto:privacy@gruby.app"
                  className="text-[#222222] hover:underline"
                >
                  privacy@gruby.app
                </a>{" "}
                with a deletion request
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
              7. LOCATION ACCURACY AND PRECISION
            </h2>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              Understanding location accuracy:
            </p>
            <ul
              className="mb-6 list-disc pl-6 sm:mb-4"
              style={{ lineHeight: "1.75" }}
            >
              <li className="mb-2">
                <strong>GPS (Precise):</strong> Accuracy within 10-50 meters
                when outdoors with clear sky view
              </li>
              <li className="mb-2">
                <strong>Wi-Fi positioning:</strong> Accuracy within 15-40 meters
                in urban areas
              </li>
              <li className="mb-2">
                <strong>Cell tower triangulation:</strong> Accuracy within
                100-300 meters
              </li>
              <li className="mb-2">
                <strong>IP-based:</strong> City-level accuracy only
              </li>
            </ul>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              We use the minimum precision necessary for each feature. Store
              finding uses precise location; pricing only needs ZIP code
              accuracy.
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
              8. USING GRUBY WITHOUT LOCATION
            </h2>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              <strong>
                Location access is optional. You can use most of Gruby without
                enabling location services.
              </strong>
            </p>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              Features that work without location:
            </p>
            <ul
              className="mb-6 list-disc pl-6 sm:mb-4"
              style={{ lineHeight: "1.75" }}
            >
              <li className="mb-2">Browsing and saving recipes</li>
              <li className="mb-2">
                Creating and managing your pantry inventory
              </li>
              <li className="mb-2">
                Building and organizing shopping lists
              </li>
              <li className="mb-2">Messaging with friends and Circles</li>
              <li className="mb-2">
                AI recipe suggestions and ingredient scanning
              </li>
              <li className="mb-2">Meal planning and cooking timers</li>
              <li className="mb-2">
                Participating in Gatherings (host provides address manually)
              </li>
            </ul>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              Features that require location or manual ZIP entry:
            </p>
            <ul
              className="mb-6 list-disc pl-6 sm:mb-4"
              style={{ lineHeight: "1.75" }}
            >
              <li className="mb-2">
                Automatic &quot;stores near me&quot; feature
              </li>
              <li className="mb-2">
                Location-specific grocery pricing (can enter ZIP manually)
              </li>
              <li className="mb-2">
                Discovering nearby public Gatherings (can search by city)
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
              9. CHILDREN AND LOCATION DATA
            </h2>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              Gruby does not knowingly collect precise location data from
              children under 13. If you are a parent or guardian and believe
              your child has provided location data to Gruby, please contact us
              at{" "}
              <a
                href="mailto:privacy@gruby.app"
                className="text-[#222222] hover:underline"
              >
                privacy@gruby.app
              </a>{" "}
              so we can delete it.
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
              10. SECURITY OF LOCATION DATA
            </h2>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              We protect your location data with:
            </p>
            <ul
              className="mb-6 list-disc pl-6 sm:mb-4"
              style={{ lineHeight: "1.75" }}
            >
              <li className="mb-2">
                Encryption in transit (HTTPS/TLS) and at rest
              </li>
              <li className="mb-2">
                Access controls limiting which systems and personnel can access
                location data
              </li>
              <li className="mb-2">
                Data minimization - we only collect and store what is necessary
              </li>
              <li className="mb-2">
                Regular security audits and vulnerability assessments
              </li>
              <li className="mb-2">
                Secure cloud infrastructure (Google Cloud Platform/Firebase)
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
              11. JURISDICTION-SPECIFIC RIGHTS
            </h2>

            <h3
              className="mb-4 mt-8 font-semibold sm:mb-3 sm:mt-6"
              style={{
                fontSize: "clamp(1.25rem, 2vw + 0.5rem, 1.5rem)",
                lineHeight: "1.4",
              }}
            >
              11.1 California Residents (CCPA/CPRA)
            </h3>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              Under California law, precise geolocation is considered
              &quot;sensitive personal information.&quot; You have the right to:
            </p>
            <ul
              className="mb-6 list-disc pl-6 sm:mb-4"
              style={{ lineHeight: "1.75" }}
            >
              <li className="mb-2">
                Know what location data we collect and how it&apos;s used
              </li>
              <li className="mb-2">Request deletion of your location data</li>
              <li className="mb-2">
                Limit the use of your sensitive personal information
              </li>
              <li className="mb-2">
                Not be discriminated against for exercising these rights
              </li>
            </ul>

            <h3
              className="mb-4 mt-8 font-semibold sm:mb-3 sm:mt-6"
              style={{
                fontSize: "clamp(1.25rem, 2vw + 0.5rem, 1.5rem)",
                lineHeight: "1.4",
              }}
            >
              11.2 European Users (GDPR)
            </h3>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              Location data is considered personal data under GDPR. We process
              location data based on your consent. You have the right to:
            </p>
            <ul
              className="mb-6 list-disc pl-6 sm:mb-4"
              style={{ lineHeight: "1.75" }}
            >
              <li className="mb-2">Withdraw consent at any time</li>
              <li className="mb-2">
                Access your location data we have stored
              </li>
              <li className="mb-2">Request rectification or deletion</li>
              <li className="mb-2">Data portability</li>
              <li className="mb-2">
                Lodge a complaint with a supervisory authority
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
              12. CHANGES TO THIS DISCLOSURE
            </h2>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              We may update this Location Services Disclosure to reflect changes
              in our practices or for legal, operational, or regulatory reasons.
              If we make material changes to how we collect or use location
              data, we will notify you through the app or via email before the
              changes take effect.
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
              13. CONTACT US
            </h2>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              Questions about our location practices? Contact us:
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
              Subject line: &quot;Location Services Inquiry&quot;
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
              <strong>Our Commitment</strong>
            </p>
            <p style={{ fontSize: "clamp(0.875rem, 1vw + 0.5rem, 1rem)" }}>
              We believe your location is personal. We collect it only when it
              genuinely improves your cooking and shopping experience, and we
              give you meaningful control over how it&apos;s used.
            </p>
          </div>
    </DocsLayout>
  );
}
