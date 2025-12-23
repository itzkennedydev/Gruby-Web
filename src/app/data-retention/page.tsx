import type { Metadata } from "next";
import { DocsLayout } from "@/components/DocsLayout";

export const metadata: Metadata = {
  title: "Data Retention Policy | Gruby",
  description: "Gruby Data Retention Policy - Effective December 22, 2025",
};

export default function DataRetentionPage() {
  return (
    <DocsLayout title="Data Retention" currentPath="/data-retention">
          <h1
            className="mb-6 font-semibold sm:mb-4"
            style={{
              fontSize: "clamp(1.875rem, 4vw + 1rem, 3rem)",
              lineHeight: "1.2",
            }}
          >
            DATA RETENTION POLICY
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
            This Data Retention Policy describes how Gruby (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) retains, manages, and deletes your data when you use the Gruby mobile application (the &quot;Service&quot;). We retain your information only as long as necessary to provide our services, comply with legal obligations, resolve disputes, and enforce our agreements.
          </p>

          <section className="mb-10 sm:mb-8">
            <h2
              className="mb-6 mt-10 font-semibold sm:mb-4 sm:mt-8"
              style={{
                fontSize: "clamp(1.5rem, 2.5vw + 0.75rem, 1.875rem)",
                lineHeight: "1.3",
              }}
            >
              1. DATA RETENTION OVERVIEW
            </h2>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              We apply different retention periods to different categories of data based on legal requirements, business necessity, and your choices. The following table summarizes our retention practices:
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="min-w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Data Category</th>
                    <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Retention Period</th>
                    <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Basis</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">Account Information</td>
                    <td className="border border-gray-300 px-4 py-2">Duration of account + 30 days</td>
                    <td className="border border-gray-300 px-4 py-2">Service provision</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2">User Content (recipes, photos, videos)</td>
                    <td className="border border-gray-300 px-4 py-2">Duration of account + 30 days</td>
                    <td className="border border-gray-300 px-4 py-2">User control</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">Stories (ephemeral content)</td>
                    <td className="border border-gray-300 px-4 py-2">24 hours</td>
                    <td className="border border-gray-300 px-4 py-2">Feature design</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2">Direct Messages (encrypted)</td>
                    <td className="border border-gray-300 px-4 py-2">Until deleted by user</td>
                    <td className="border border-gray-300 px-4 py-2">User control</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">Shopping Lists</td>
                    <td className="border border-gray-300 px-4 py-2">Duration of account</td>
                    <td className="border border-gray-300 px-4 py-2">Service provision</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2">Pantry Data</td>
                    <td className="border border-gray-300 px-4 py-2">Duration of account</td>
                    <td className="border border-gray-300 px-4 py-2">Service provision</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">Dietary Preferences</td>
                    <td className="border border-gray-300 px-4 py-2">Duration of account</td>
                    <td className="border border-gray-300 px-4 py-2">Service provision</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2">Financial/Budget Data</td>
                    <td className="border border-gray-300 px-4 py-2">Duration of account + 7 years</td>
                    <td className="border border-gray-300 px-4 py-2">Legal compliance</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">Analytics Data</td>
                    <td className="border border-gray-300 px-4 py-2">26 months</td>
                    <td className="border border-gray-300 px-4 py-2">Service improvement</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2">Audit Logs</td>
                    <td className="border border-gray-300 px-4 py-2">2 years</td>
                    <td className="border border-gray-300 px-4 py-2">Security</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">Error Logs (Sentry)</td>
                    <td className="border border-gray-300 px-4 py-2">90 days</td>
                    <td className="border border-gray-300 px-4 py-2">Technical support</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2">Support Communications</td>
                    <td className="border border-gray-300 px-4 py-2">3 years</td>
                    <td className="border border-gray-300 px-4 py-2">Customer service</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">Backups</td>
                    <td className="border border-gray-300 px-4 py-2">90 days (rolling)</td>
                    <td className="border border-gray-300 px-4 py-2">Disaster recovery</td>
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
              2. DETAILED RETENTION SCHEDULES
            </h2>

            <h3
              className="mb-4 mt-8 font-semibold sm:mb-3 sm:mt-6"
              style={{
                fontSize: "clamp(1.25rem, 2vw + 0.5rem, 1.5rem)",
                lineHeight: "1.4",
              }}
            >
              2.1 Account and Profile Data
            </h3>
            <ul
              className="mb-6 list-disc pl-6 sm:mb-4"
              style={{ lineHeight: "1.75" }}
            >
              <li className="mb-2"><strong>Email address, username, display name:</strong> Retained while your account is active. Deleted within 30 days of account deletion.</li>
              <li className="mb-2"><strong>Password (hashed):</strong> Deleted immediately upon account deletion.</li>
              <li className="mb-2"><strong>Profile photo/avatar:</strong> Deleted within 30 days of account deletion or when you remove it.</li>
              <li className="mb-2"><strong>Bio and location (optional):</strong> Deleted within 30 days of account deletion.</li>
              <li className="mb-2"><strong>Phone number (optional):</strong> Deleted within 30 days of account deletion.</li>
            </ul>

            <h3
              className="mb-4 mt-8 font-semibold sm:mb-3 sm:mt-6"
              style={{
                fontSize: "clamp(1.25rem, 2vw + 0.5rem, 1.5rem)",
                lineHeight: "1.4",
              }}
            >
              2.2 User-Generated Content
            </h3>
            <ul
              className="mb-6 list-disc pl-6 sm:mb-4"
              style={{ lineHeight: "1.75" }}
            >
              <li className="mb-2"><strong>Recipes:</strong> Retained while your account is active. Deleted within 30 days of account deletion, except for recipes that have been saved or shared by other users.</li>
              <li className="mb-2"><strong>Photos and Videos:</strong> Deleted from our systems within 30 days of account deletion or when you remove them.</li>
              <li className="mb-2"><strong>Comments and Reviews:</strong> Deleted within 30 days of account deletion.</li>
              <li className="mb-2"><strong>Stories:</strong> Automatically deleted 24 hours after posting. Story view data is deleted after 7 days.</li>
              <li className="mb-2"><strong>Saved/Favorited Content:</strong> Your saved items are deleted upon account deletion. Content you saved from others remains with its creator.</li>
            </ul>

            <h3
              className="mb-4 mt-8 font-semibold sm:mb-3 sm:mt-6"
              style={{
                fontSize: "clamp(1.25rem, 2vw + 0.5rem, 1.5rem)",
                lineHeight: "1.4",
              }}
            >
              2.3 Social and Communication Data
            </h3>
            <ul
              className="mb-6 list-disc pl-6 sm:mb-4"
              style={{ lineHeight: "1.75" }}
            >
              <li className="mb-2"><strong>Direct Messages:</strong> Messages are end-to-end encrypted and retained until you or the recipient deletes them. When you delete your account, your copy of messages is deleted; recipients retain their copies.</li>
              <li className="mb-2"><strong>Following/Followers Lists:</strong> Deleted within 30 days of account deletion.</li>
              <li className="mb-2"><strong>Blocked Users List:</strong> Deleted within 30 days of account deletion.</li>
              <li className="mb-2"><strong>Circle Memberships:</strong> Your membership is removed upon account deletion. Circle data owned by others remains.</li>
              <li className="mb-2"><strong>Gathering Participation:</strong> Your participation records are removed upon account deletion. Gathering data created by others remains.</li>
            </ul>

            <h3
              className="mb-4 mt-8 font-semibold sm:mb-3 sm:mt-6"
              style={{
                fontSize: "clamp(1.25rem, 2vw + 0.5rem, 1.5rem)",
                lineHeight: "1.4",
              }}
            >
              2.4 Shopping and Financial Data
            </h3>
            <ul
              className="mb-6 list-disc pl-6 sm:mb-4"
              style={{ lineHeight: "1.75" }}
            >
              <li className="mb-2"><strong>Shopping Lists:</strong> Retained while your account is active. Deleted within 30 days of account deletion.</li>
              <li className="mb-2"><strong>Shopping History:</strong> Retained for savings calculations while your account is active. Anonymized upon account deletion.</li>
              <li className="mb-2"><strong>Budget Settings:</strong> Deleted within 30 days of account deletion.</li>
              <li className="mb-2"><strong>Cost-Splitting Records:</strong> Retained for 7 years for financial record-keeping purposes, then deleted.</li>
              <li className="mb-2"><strong>Savings Analytics:</strong> Aggregated and anonymized data may be retained indefinitely for service improvement.</li>
            </ul>

            <h3
              className="mb-4 mt-8 font-semibold sm:mb-3 sm:mt-6"
              style={{
                fontSize: "clamp(1.25rem, 2vw + 0.5rem, 1.5rem)",
                lineHeight: "1.4",
              }}
            >
              2.5 Health and Dietary Data
            </h3>
            <ul
              className="mb-6 list-disc pl-6 sm:mb-4"
              style={{ lineHeight: "1.75" }}
            >
              <li className="mb-2"><strong>Dietary Preferences/Restrictions:</strong> Deleted within 30 days of account deletion.</li>
              <li className="mb-2"><strong>Allergy Information:</strong> Deleted within 30 days of account deletion.</li>
              <li className="mb-2"><strong>Nutritional Goals/Macro Tracking:</strong> Deleted within 30 days of account deletion.</li>
              <li className="mb-2"><strong>Pantry Inventory:</strong> Deleted within 30 days of account deletion.</li>
              <li className="mb-2"><strong>Expiration Reminders:</strong> Deleted when the reminder is triggered or upon account deletion.</li>
            </ul>

            <h3
              className="mb-4 mt-8 font-semibold sm:mb-3 sm:mt-6"
              style={{
                fontSize: "clamp(1.25rem, 2vw + 0.5rem, 1.5rem)",
                lineHeight: "1.4",
              }}
            >
              2.6 Technical and Security Data
            </h3>
            <ul
              className="mb-6 list-disc pl-6 sm:mb-4"
              style={{ lineHeight: "1.75" }}
            >
              <li className="mb-2"><strong>Device Information:</strong> Deleted within 30 days of account deletion.</li>
              <li className="mb-2"><strong>Push Notification Tokens:</strong> Deleted immediately upon disabling notifications or account deletion.</li>
              <li className="mb-2"><strong>IP Addresses:</strong> Retained in logs for 90 days for security purposes.</li>
              <li className="mb-2"><strong>Audit Logs (security events):</strong> Retained for 2 years for security and compliance purposes.</li>
              <li className="mb-2"><strong>Error Reports (Sentry):</strong> Retained for 90 days.</li>
              <li className="mb-2"><strong>Analytics Data (Firebase):</strong> Retained for 26 months in accordance with Firebase Analytics retention policies.</li>
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
              3. ACCOUNT DELETION PROCESS
            </h2>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              When you delete your account, the following process occurs:
            </p>

            <h3
              className="mb-4 mt-8 font-semibold sm:mb-3 sm:mt-6"
              style={{
                fontSize: "clamp(1.25rem, 2vw + 0.5rem, 1.5rem)",
                lineHeight: "1.4",
              }}
            >
              3.1 Immediate Actions (Day 0)
            </h3>
            <ul
              className="mb-6 list-disc pl-6 sm:mb-4"
              style={{ lineHeight: "1.75" }}
            >
              <li className="mb-2">Account is deactivated and inaccessible</li>
              <li className="mb-2">Profile becomes invisible to other users</li>
              <li className="mb-2">Authentication credentials are invalidated</li>
              <li className="mb-2">Push notification tokens are deleted</li>
            </ul>

            <h3
              className="mb-4 mt-8 font-semibold sm:mb-3 sm:mt-6"
              style={{
                fontSize: "clamp(1.25rem, 2vw + 0.5rem, 1.5rem)",
                lineHeight: "1.4",
              }}
            >
              3.2 Within 30 Days
            </h3>
            <ul
              className="mb-6 list-disc pl-6 sm:mb-4"
              style={{ lineHeight: "1.75" }}
            >
              <li className="mb-2">Personal data is permanently deleted from primary databases</li>
              <li className="mb-2">User content (recipes, photos, videos) is deleted</li>
              <li className="mb-2">Social connections are removed</li>
              <li className="mb-2">Dietary and health data is deleted</li>
              <li className="mb-2">Shopping lists and pantry data are deleted</li>
              <li className="mb-2">Cascading deletion across all related data</li>
            </ul>

            <h3
              className="mb-4 mt-8 font-semibold sm:mb-3 sm:mt-6"
              style={{
                fontSize: "clamp(1.25rem, 2vw + 0.5rem, 1.5rem)",
                lineHeight: "1.4",
              }}
            >
              3.3 Within 90 Days
            </h3>
            <ul
              className="mb-6 list-disc pl-6 sm:mb-4"
              style={{ lineHeight: "1.75" }}
            >
              <li className="mb-2">Backup copies are purged</li>
              <li className="mb-2">Cached data is cleared from CDNs and edge servers</li>
              <li className="mb-2">Storage references are cleaned up</li>
            </ul>

            <h3
              className="mb-4 mt-8 font-semibold sm:mb-3 sm:mt-6"
              style={{
                fontSize: "clamp(1.25rem, 2vw + 0.5rem, 1.5rem)",
                lineHeight: "1.4",
              }}
            >
              3.4 Retained After Deletion
            </h3>
            <ul
              className="mb-6 list-disc pl-6 sm:mb-4"
              style={{ lineHeight: "1.75" }}
            >
              <li className="mb-2">Anonymized, aggregated analytics data (cannot identify you)</li>
              <li className="mb-2">Audit logs (for 2 years, for security purposes)</li>
              <li className="mb-2">Data subject to legal holds or preservation requirements</li>
              <li className="mb-2">Cost-splitting records (for 7 years, for legal compliance)</li>
              <li className="mb-2">Content that has been shared with or saved by other users (in their accounts)</li>
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
              4. DATA EXPORT
            </h2>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              Before deleting your account, you can export your data:
            </p>
            <ul
              className="mb-6 list-disc pl-6 sm:mb-4"
              style={{ lineHeight: "1.75" }}
            >
              <li className="mb-2"><strong>In-App Export:</strong> Use the data export feature in your account settings to download your data in a machine-readable format (JSON).</li>
              <li className="mb-2"><strong>Manual Request:</strong> Contact <a href="mailto:privacy@gruby.app" className="text-[#222222] hover:underline">privacy@gruby.app</a> to request a data export.</li>
            </ul>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              Your data export will include:
            </p>
            <ul
              className="mb-6 list-disc pl-6 sm:mb-4"
              style={{ lineHeight: "1.75" }}
            >
              <li className="mb-2">Profile information</li>
              <li className="mb-2">Recipes you created</li>
              <li className="mb-2">Photos and videos you uploaded</li>
              <li className="mb-2">Comments and reviews</li>
              <li className="mb-2">Shopping lists and history</li>
              <li className="mb-2">Dietary preferences</li>
              <li className="mb-2">Pantry inventory</li>
              <li className="mb-2">Following/followers lists</li>
              <li className="mb-2">Circle and Gathering membership data</li>
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
              5. THIRD-PARTY DATA RETENTION
            </h2>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              Our third-party service providers have their own data retention policies:
            </p>
            <ul
              className="mb-6 list-disc pl-6 sm:mb-4"
              style={{ lineHeight: "1.75" }}
            >
              <li className="mb-2"><strong>Firebase:</strong> Data is deleted in accordance with our deletion requests. Analytics data follows Firebase Analytics retention policies (default 26 months).</li>
              <li className="mb-2"><strong>Google Gemini AI:</strong> AI interaction data is subject to Google&apos;s data retention policies and our data processing agreement.</li>
              <li className="mb-2"><strong>Sentry:</strong> Error reports are retained for 90 days.</li>
              <li className="mb-2"><strong>Expo:</strong> Push notification tokens are deleted immediately upon our request.</li>
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
              6. LEGAL HOLDS AND EXCEPTIONS
            </h2>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              We may retain data beyond the stated retention periods when:
            </p>
            <ul
              className="mb-6 list-disc pl-6 sm:mb-4"
              style={{ lineHeight: "1.75" }}
            >
              <li className="mb-2"><strong>Legal Obligations:</strong> Required by law, regulation, or court order</li>
              <li className="mb-2"><strong>Legal Proceedings:</strong> Data is subject to a legal hold in connection with litigation, investigation, or regulatory inquiry</li>
              <li className="mb-2"><strong>Dispute Resolution:</strong> Necessary to resolve disputes or enforce our agreements</li>
              <li className="mb-2"><strong>Security:</strong> Required for fraud prevention or security investigations</li>
              <li className="mb-2"><strong>Tax and Financial Records:</strong> Required for financial record-keeping (typically 7 years)</li>
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
              7. YOUR RIGHTS
            </h2>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              You have the following rights regarding your data:
            </p>
            <ul
              className="mb-6 list-disc pl-6 sm:mb-4"
              style={{ lineHeight: "1.75" }}
            >
              <li className="mb-2"><strong>Access:</strong> Request information about the data we hold about you</li>
              <li className="mb-2"><strong>Export:</strong> Download a copy of your data in a portable format</li>
              <li className="mb-2"><strong>Correction:</strong> Request correction of inaccurate data</li>
              <li className="mb-2"><strong>Deletion:</strong> Delete your account and personal data</li>
              <li className="mb-2"><strong>Restriction:</strong> Request restriction of processing in certain circumstances</li>
            </ul>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              To exercise these rights, visit your account settings or contact us at <a href="mailto:privacy@gruby.app" className="text-[#222222] hover:underline">privacy@gruby.app</a>.
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
              8. INACTIVE ACCOUNTS
            </h2>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              For accounts that have been inactive for an extended period:
            </p>
            <ul
              className="mb-6 list-disc pl-6 sm:mb-4"
              style={{ lineHeight: "1.75" }}
            >
              <li className="mb-2"><strong>12 months of inactivity:</strong> We may send you a reminder email about your account</li>
              <li className="mb-2"><strong>24 months of inactivity:</strong> We may send a final notice that your account will be scheduled for deletion</li>
              <li className="mb-2"><strong>After 24+ months:</strong> Inactive accounts may be deleted at our discretion</li>
            </ul>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              You can prevent account deletion by logging in or contacting us before the deletion occurs.
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
              9. CHANGES TO THIS POLICY
            </h2>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              We may update this Data Retention Policy from time to time. We will notify you of material changes by posting the updated policy on this page with a new effective date. Your continued use of the Service after the effective date constitutes acceptance of the changes.
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
              10. CONTACT US
            </h2>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              If you have questions about this Data Retention Policy or want to exercise your data rights, please contact us:
            </p>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              <strong>Gruby Privacy Team</strong><br />
              Email: <a href="mailto:privacy@gruby.app" className="text-[#222222] hover:underline">privacy@gruby.app</a>
            </p>
          </section>
    </DocsLayout>
  );
}
