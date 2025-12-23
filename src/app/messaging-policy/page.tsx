import type { Metadata } from "next";
import { DocsLayout } from "@/components/DocsLayout";

export const metadata: Metadata = {
  title: "Messaging and Communications Policy | Gruby",
  description: "Gruby Messaging and Communications Policy - Effective December 22, 2025",
};

export default function MessagingPolicyPage() {
  return (
    <DocsLayout title="Messaging Policy" currentPath="/messaging-policy">
          <h1
            className="mb-6 font-semibold sm:mb-4"
            style={{
              fontSize: "clamp(1.875rem, 4vw + 1rem, 3rem)",
              lineHeight: "1.2",
            }}
          >
            MESSAGING AND COMMUNICATIONS POLICY
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
            This Messaging and Communications Policy explains how messaging works in the Gruby application, including our end-to-end encryption implementation, what data we can and cannot access, your responsibilities when messaging, and how we handle communications across the platform.
          </p>

          <section className="mb-10 sm:mb-8">
            <h2
              className="mb-6 mt-10 font-semibold sm:mb-4 sm:mt-8"
              style={{
                fontSize: "clamp(1.5rem, 2.5vw + 0.75rem, 1.875rem)",
                lineHeight: "1.3",
              }}
            >
              1. END-TO-END ENCRYPTION
            </h2>

            <h3
              className="mb-4 mt-8 font-semibold sm:mb-3 sm:mt-6"
              style={{
                fontSize: "clamp(1.25rem, 2vw + 0.5rem, 1.5rem)",
                lineHeight: "1.4",
              }}
            >
              1.1 How It Works
            </h3>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              Direct messages between Gruby users are protected with end-to-end encryption using the TweetNaCl cryptography library. This means:
            </p>
            <ul
              className="mb-6 list-disc pl-6 sm:mb-4"
              style={{ lineHeight: "1.75" }}
            >
              <li className="mb-2"><strong>Messages are encrypted on your device</strong> before being sent to our servers</li>
              <li className="mb-2"><strong>Only you and your recipient</strong> can decrypt and read the message content</li>
              <li className="mb-2"><strong>Gruby cannot read</strong> the content of your encrypted messages</li>
              <li className="mb-2"><strong>Encryption keys are generated</strong> and stored locally on your device</li>
              <li className="mb-2"><strong>Even if our servers were compromised,</strong> message content would remain protected</li>
            </ul>

            <h3
              className="mb-4 mt-8 font-semibold sm:mb-3 sm:mt-6"
              style={{
                fontSize: "clamp(1.25rem, 2vw + 0.5rem, 1.5rem)",
                lineHeight: "1.4",
              }}
            >
              1.2 Technical Implementation
            </h3>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              Our encryption uses the following approach:
            </p>
            <ul
              className="mb-6 list-disc pl-6 sm:mb-4"
              style={{ lineHeight: "1.75" }}
            >
              <li className="mb-2">Public-key cryptography for key exchange</li>
              <li className="mb-2">Symmetric encryption for message content</li>
              <li className="mb-2">Cryptographic nonces to prevent replay attacks</li>
              <li className="mb-2">TweetNaCl&apos;s authenticated encryption (crypto_box)</li>
            </ul>

            <h3
              className="mb-4 mt-8 font-semibold sm:mb-3 sm:mt-6"
              style={{
                fontSize: "clamp(1.25rem, 2vw + 0.5rem, 1.5rem)",
                lineHeight: "1.4",
              }}
            >
              1.3 What This Means for You
            </h3>
            <div
              className="mb-6 rounded-lg bg-gray-50 p-6"
              style={{ lineHeight: "1.75" }}
            >
              <p className="mb-4">
                <strong>Benefits:</strong>
              </p>
              <ul className="mb-4 list-disc pl-6">
                <li className="mb-2">Your private conversations stay private</li>
                <li className="mb-2">Protection against server-side data breaches</li>
                <li className="mb-2">Gruby employees cannot read your messages</li>
              </ul>
              <p className="mb-4">
                <strong>Limitations:</strong>
              </p>
              <ul className="list-disc pl-6">
                <li className="mb-2">If you lose access to your device, encrypted messages cannot be recovered</li>
                <li className="mb-2">We cannot help you recover message content</li>
                <li className="mb-2">We cannot provide message content to law enforcement (we don&apos;t have it)</li>
              </ul>
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
              2. WHAT WE CAN AND CANNOT ACCESS
            </h2>

            <h3
              className="mb-4 mt-8 font-semibold sm:mb-3 sm:mt-6"
              style={{
                fontSize: "clamp(1.25rem, 2vw + 0.5rem, 1.5rem)",
                lineHeight: "1.4",
              }}
            >
              2.1 Data We Can Access (Metadata)
            </h3>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              To deliver messages and maintain the service, we access and store:
            </p>
            <ul
              className="mb-6 list-disc pl-6 sm:mb-4"
              style={{ lineHeight: "1.75" }}
            >
              <li className="mb-2">Sender and recipient identifiers</li>
              <li className="mb-2">Timestamps of when messages are sent</li>
              <li className="mb-2">Message delivery status</li>
              <li className="mb-2">Conversation participant lists</li>
              <li className="mb-2">Message count and frequency patterns</li>
              <li className="mb-2">Whether a message contains attachments (but not the attachment content)</li>
            </ul>

            <h3
              className="mb-4 mt-8 font-semibold sm:mb-3 sm:mt-6"
              style={{
                fontSize: "clamp(1.25rem, 2vw + 0.5rem, 1.5rem)",
                lineHeight: "1.4",
              }}
            >
              2.2 Data We Cannot Access
            </h3>
            <ul
              className="mb-6 list-disc pl-6 sm:mb-4"
              style={{ lineHeight: "1.75" }}
            >
              <li className="mb-2">The actual content of your messages</li>
              <li className="mb-2">Photos, videos, or files shared in messages</li>
              <li className="mb-2">Recipe links or content shared privately</li>
              <li className="mb-2">Any text you type in direct messages</li>
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
              3. TYPES OF COMMUNICATIONS IN GRUBY
            </h2>

            <h3
              className="mb-4 mt-8 font-semibold sm:mb-3 sm:mt-6"
              style={{
                fontSize: "clamp(1.25rem, 2vw + 0.5rem, 1.5rem)",
                lineHeight: "1.4",
              }}
            >
              3.1 Direct Messages (End-to-End Encrypted)
            </h3>
            <ul
              className="mb-6 list-disc pl-6 sm:mb-4"
              style={{ lineHeight: "1.75" }}
            >
              <li className="mb-2">One-on-one private conversations between users</li>
              <li className="mb-2">Fully end-to-end encrypted</li>
              <li className="mb-2">Only visible to sender and recipient</li>
              <li className="mb-2">Retained until you or the recipient deletes them</li>
            </ul>

            <h3
              className="mb-4 mt-8 font-semibold sm:mb-3 sm:mt-6"
              style={{
                fontSize: "clamp(1.25rem, 2vw + 0.5rem, 1.5rem)",
                lineHeight: "1.4",
              }}
            >
              3.2 Gathering Chats
            </h3>
            <ul
              className="mb-6 list-disc pl-6 sm:mb-4"
              style={{ lineHeight: "1.75" }}
            >
              <li className="mb-2">Group chats associated with Gatherings (collaborative cooking events)</li>
              <li className="mb-2">Visible to all Gathering participants</li>
              <li className="mb-2">Not end-to-end encrypted (for moderation purposes)</li>
              <li className="mb-2">Stored for the duration of the Gathering and a reasonable period after</li>
            </ul>

            <h3
              className="mb-4 mt-8 font-semibold sm:mb-3 sm:mt-6"
              style={{
                fontSize: "clamp(1.25rem, 2vw + 0.5rem, 1.5rem)",
                lineHeight: "1.4",
              }}
            >
              3.3 Circle Communications
            </h3>
            <ul
              className="mb-6 list-disc pl-6 sm:mb-4"
              style={{ lineHeight: "1.75" }}
            >
              <li className="mb-2">Shared content and discussions within Circles (friend groups)</li>
              <li className="mb-2">Visible to Circle members only</li>
              <li className="mb-2">Not end-to-end encrypted</li>
              <li className="mb-2">Subject to Circle administrator moderation</li>
            </ul>

            <h3
              className="mb-4 mt-8 font-semibold sm:mb-3 sm:mt-6"
              style={{
                fontSize: "clamp(1.25rem, 2vw + 0.5rem, 1.5rem)",
                lineHeight: "1.4",
              }}
            >
              3.4 Public Content (Not Encrypted)
            </h3>
            <ul
              className="mb-6 list-disc pl-6 sm:mb-4"
              style={{ lineHeight: "1.75" }}
            >
              <li className="mb-2">Comments on recipes</li>
              <li className="mb-2">Public posts and stories</li>
              <li className="mb-2">Reviews and ratings</li>
              <li className="mb-2">Community feed content</li>
            </ul>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              This content is not encrypted and is visible according to your privacy settings.
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
              4. MESSAGING RULES AND GUIDELINES
            </h2>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              While we cannot read your encrypted messages, you remain responsible for your conduct. You agree NOT to use messaging to:
            </p>

            <h3
              className="mb-4 mt-8 font-semibold sm:mb-3 sm:mt-6"
              style={{
                fontSize: "clamp(1.25rem, 2vw + 0.5rem, 1.5rem)",
                lineHeight: "1.4",
              }}
            >
              4.1 Prohibited Content
            </h3>
            <ul
              className="mb-6 list-disc pl-6 sm:mb-4"
              style={{ lineHeight: "1.75" }}
            >
              <li className="mb-2">Send harassing, threatening, or abusive messages</li>
              <li className="mb-2">Share explicit, obscene, or sexually suggestive content</li>
              <li className="mb-2">Distribute malware, viruses, or malicious links</li>
              <li className="mb-2">Engage in phishing or fraud attempts</li>
              <li className="mb-2">Share illegal content or facilitate illegal activities</li>
              <li className="mb-2">Send hate speech or discriminatory content</li>
              <li className="mb-2">Share child sexual abuse material (CSAM) - this is reported to authorities</li>
            </ul>

            <h3
              className="mb-4 mt-8 font-semibold sm:mb-3 sm:mt-6"
              style={{
                fontSize: "clamp(1.25rem, 2vw + 0.5rem, 1.5rem)",
                lineHeight: "1.4",
              }}
            >
              4.2 Spam and Commercial Messages
            </h3>
            <ul
              className="mb-6 list-disc pl-6 sm:mb-4"
              style={{ lineHeight: "1.75" }}
            >
              <li className="mb-2">Send unsolicited commercial messages or advertisements</li>
              <li className="mb-2">Send bulk or automated messages</li>
              <li className="mb-2">Promote products or services without consent</li>
              <li className="mb-2">Send chain messages or pyramid schemes</li>
              <li className="mb-2">Repeatedly message users who have asked you to stop</li>
            </ul>

            <h3
              className="mb-4 mt-8 font-semibold sm:mb-3 sm:mt-6"
              style={{
                fontSize: "clamp(1.25rem, 2vw + 0.5rem, 1.5rem)",
                lineHeight: "1.4",
              }}
            >
              4.3 Expected Behavior
            </h3>
            <ul
              className="mb-6 list-disc pl-6 sm:mb-4"
              style={{ lineHeight: "1.75" }}
            >
              <li className="mb-2">Respect other users&apos; wishes to end conversations</li>
              <li className="mb-2">Use messaging for legitimate, food-related purposes</li>
              <li className="mb-2">Be respectful and courteous in your communications</li>
              <li className="mb-2">Report inappropriate behavior through the app</li>
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
              5. REPORTING AND MODERATION
            </h2>

            <h3
              className="mb-4 mt-8 font-semibold sm:mb-3 sm:mt-6"
              style={{
                fontSize: "clamp(1.25rem, 2vw + 0.5rem, 1.5rem)",
                lineHeight: "1.4",
              }}
            >
              5.1 How to Report
            </h3>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              If you receive inappropriate messages, you can:
            </p>
            <ul
              className="mb-6 list-disc pl-6 sm:mb-4"
              style={{ lineHeight: "1.75" }}
            >
              <li className="mb-2"><strong>Block the user:</strong> Prevents them from messaging you</li>
              <li className="mb-2"><strong>Report the conversation:</strong> Use the report feature in the app</li>
              <li className="mb-2"><strong>Email us:</strong> Contact <a href="mailto:safety@gruby.app" className="text-[#222222] hover:underline">safety@gruby.app</a> for urgent concerns</li>
            </ul>

            <h3
              className="mb-4 mt-8 font-semibold sm:mb-3 sm:mt-6"
              style={{
                fontSize: "clamp(1.25rem, 2vw + 0.5rem, 1.5rem)",
                lineHeight: "1.4",
              }}
            >
              5.2 How We Handle Reports
            </h3>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              When you report a message or user:
            </p>
            <ul
              className="mb-6 list-disc pl-6 sm:mb-4"
              style={{ lineHeight: "1.75" }}
            >
              <li className="mb-2">For encrypted messages, we receive metadata (who sent to whom, when) but NOT message content</li>
              <li className="mb-2">You may choose to include screenshots of the problematic messages in your report</li>
              <li className="mb-2">We review patterns of behavior (frequency, multiple reports, etc.)</li>
              <li className="mb-2">We may take action based on behavioral patterns and user reports</li>
            </ul>

            <h3
              className="mb-4 mt-8 font-semibold sm:mb-3 sm:mt-6"
              style={{
                fontSize: "clamp(1.25rem, 2vw + 0.5rem, 1.5rem)",
                lineHeight: "1.4",
              }}
            >
              5.3 Actions We May Take
            </h3>
            <ul
              className="mb-6 list-disc pl-6 sm:mb-4"
              style={{ lineHeight: "1.75" }}
            >
              <li className="mb-2">Warning the offending user</li>
              <li className="mb-2">Temporarily restricting messaging capabilities</li>
              <li className="mb-2">Temporarily suspending the account</li>
              <li className="mb-2">Permanently terminating the account</li>
              <li className="mb-2">Reporting to law enforcement (for illegal activities)</li>
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
              6. MESSAGE RETENTION AND DELETION
            </h2>

            <h3
              className="mb-4 mt-8 font-semibold sm:mb-3 sm:mt-6"
              style={{
                fontSize: "clamp(1.25rem, 2vw + 0.5rem, 1.5rem)",
                lineHeight: "1.4",
              }}
            >
              6.1 Retention
            </h3>
            <ul
              className="mb-6 list-disc pl-6 sm:mb-4"
              style={{ lineHeight: "1.75" }}
            >
              <li className="mb-2"><strong>Direct Messages:</strong> Retained in encrypted form until you or the recipient deletes them</li>
              <li className="mb-2"><strong>Gathering Chats:</strong> Retained for the duration of the Gathering plus 90 days</li>
              <li className="mb-2"><strong>Message Metadata:</strong> May be retained for security and abuse prevention purposes</li>
            </ul>

            <h3
              className="mb-4 mt-8 font-semibold sm:mb-3 sm:mt-6"
              style={{
                fontSize: "clamp(1.25rem, 2vw + 0.5rem, 1.5rem)",
                lineHeight: "1.4",
              }}
            >
              6.2 Deleting Messages
            </h3>
            <ul
              className="mb-6 list-disc pl-6 sm:mb-4"
              style={{ lineHeight: "1.75" }}
            >
              <li className="mb-2"><strong>Delete for yourself:</strong> Removes the message from your view only; the recipient still has their copy</li>
              <li className="mb-2"><strong>Message deletion does not affect:</strong> Screenshots the recipient may have taken</li>
            </ul>

            <h3
              className="mb-4 mt-8 font-semibold sm:mb-3 sm:mt-6"
              style={{
                fontSize: "clamp(1.25rem, 2vw + 0.5rem, 1.5rem)",
                lineHeight: "1.4",
              }}
            >
              6.3 Account Deletion
            </h3>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              When you delete your account:
            </p>
            <ul
              className="mb-6 list-disc pl-6 sm:mb-4"
              style={{ lineHeight: "1.75" }}
            >
              <li className="mb-2">Your copy of all messages is deleted</li>
              <li className="mb-2">Recipients retain their copies of messages you sent</li>
              <li className="mb-2">Your encryption keys are deleted (messages become unrecoverable)</li>
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
              7. LAW ENFORCEMENT AND LEGAL REQUESTS
            </h2>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              When we receive legal requests for messaging data:
            </p>
            <ul
              className="mb-6 list-disc pl-6 sm:mb-4"
              style={{ lineHeight: "1.75" }}
            >
              <li className="mb-2"><strong>Message Content:</strong> We cannot provide the content of end-to-end encrypted messages because we do not have access to them</li>
              <li className="mb-2"><strong>Metadata:</strong> We may be required to provide message metadata (sender, recipient, timestamps) in response to valid legal process</li>
              <li className="mb-2"><strong>Account Information:</strong> We may provide account information as required by law</li>
              <li className="mb-2"><strong>Transparency:</strong> We will notify users of legal requests unless prohibited by law or court order</li>
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
              8. PUSH NOTIFICATIONS
            </h2>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              Message notifications are handled as follows:
            </p>
            <ul
              className="mb-6 list-disc pl-6 sm:mb-4"
              style={{ lineHeight: "1.75" }}
            >
              <li className="mb-2">Push notifications for new messages do NOT contain message content</li>
              <li className="mb-2">Notifications only indicate that you have a new message</li>
              <li className="mb-2">You can customize notification settings in the app</li>
              <li className="mb-2">You can disable message notifications entirely</li>
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
              9. GRUBY-INITIATED COMMUNICATIONS
            </h2>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              Gruby may communicate with you through:
            </p>
            <ul
              className="mb-6 list-disc pl-6 sm:mb-4"
              style={{ lineHeight: "1.75" }}
            >
              <li className="mb-2"><strong>Email:</strong> Service announcements, security alerts, account-related notices</li>
              <li className="mb-2"><strong>Push Notifications:</strong> Feature updates, reminders (expiration alerts, Gathering reminders)</li>
              <li className="mb-2"><strong>In-App Messages:</strong> Tips, feature announcements, surveys</li>
            </ul>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              <strong>Opting Out:</strong> You can manage your communication preferences in app settings. Note that you cannot opt out of essential service communications (security alerts, Terms of Service changes, etc.).
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
              10. CHANGES TO THIS POLICY
            </h2>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              We may update this Messaging and Communications Policy from time to time. We will notify you of material changes (especially any changes affecting encryption) by posting the updated policy and sending a notification through the app.
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
              If you have questions about messaging or this policy, please contact us:
            </p>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              <strong>Gruby Privacy Team</strong><br />
              Email: <a href="mailto:privacy@gruby.app" className="text-[#222222] hover:underline">privacy@gruby.app</a>
            </p>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              <strong>For Safety Concerns</strong><br />
              Email: <a href="mailto:safety@gruby.app" className="text-[#222222] hover:underline">safety@gruby.app</a>
            </p>
          </section>
    </DocsLayout>
  );
}
