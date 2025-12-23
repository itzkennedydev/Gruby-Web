import type { Metadata } from 'next';
import { DocsLayout } from '@/components/DocsLayout';

export const metadata: Metadata = {
  title: 'Privacy Policy | Gruby',
  description: 'Gruby Privacy Policy - Effective December 22, 2025',
};

export default function PrivacyPage() {
  return (
    <DocsLayout title="Privacy Policy" currentPath="/privacy">
      <h1 className="font-semibold mb-6 sm:mb-4" style={{ fontSize: 'clamp(1.875rem, 4vw + 1rem, 3rem)', lineHeight: '1.2' }}>GRUBY PRIVACY POLICY</h1>

          <p className="text-gray-600 mb-8 sm:mb-6" style={{ fontSize: 'clamp(0.875rem, 1vw + 0.5rem, 0.875rem)', lineHeight: '1.6' }}>
            <strong>Effective Date: December 22, 2025</strong>
          </p>

          <p className="mb-10 sm:mb-8" style={{ fontSize: 'clamp(1rem, 1.25vw + 0.75rem, 1.125rem)', lineHeight: '1.75' }}>
            This Privacy Policy describes how Gruby (&quot;Company,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) collects, uses, discloses, and protects the personal information of users (&quot;User,&quot; &quot;you,&quot; or &quot;your&quot;) of the Gruby mobile application and related services (collectively, the &quot;Service&quot;). Gruby is a social cooking platform combining recipe discovery, meal planning, smart shopping, and social networking. By using the Service, you consent to the collection and use of your information as described in this Privacy Policy.
          </p>

          <section className="mb-10 sm:mb-8">
            <h2 className="font-semibold mt-10 sm:mt-8 mb-6 sm:mb-4" style={{ fontSize: 'clamp(1.5rem, 2.5vw + 0.75rem, 1.875rem)', lineHeight: '1.3' }}>1. INFORMATION WE COLLECT</h2>

            <h3 className="font-semibold mt-8 sm:mt-6 mb-4 sm:mb-3" style={{ fontSize: 'clamp(1.25rem, 2vw + 0.5rem, 1.5rem)', lineHeight: '1.4' }}>1.1 Information You Provide Directly</h3>

            <p className="mb-6 sm:mb-4" style={{ lineHeight: '1.75' }}>
              <strong>Account Information:</strong> When you create an account, we collect your email address, password (stored in hashed form), display name, and username. If you register using Apple Sign-In or Google Sign-In, we receive basic profile information as permitted by those services.
            </p>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: '1.75' }}>
              <strong>Profile Information:</strong> You may optionally provide a profile photo/avatar, biographical information, location, and phone number. You can choose to make your profile public or private.
            </p>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: '1.75' }}>
              <strong>User Content:</strong> We collect recipes, photographs, videos, reviews, comments, stories (24-hour ephemeral content), and other content you submit to the Service.
            </p>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: '1.75' }}>
              <strong>Direct Messages:</strong> Messages you send to other users are end-to-end encrypted using TweetNaCl encryption. We cannot read the content of your encrypted messages; we only store the encrypted data and metadata necessary for delivery.
            </p>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: '1.75' }}>
              <strong>Dietary and Health Information:</strong> You may provide dietary preferences, restrictions, allergies, macro tracking goals, and nutritional targets. This information is considered sensitive and is used solely to personalize your experience.
            </p>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: '1.75' }}>
              <strong>Financial and Shopping Information:</strong> We collect shopping list data, budget limits, estimated and actual shopping costs, savings calculations, and cost-splitting information for Gatherings.
            </p>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: '1.75' }}>
              <strong>Pantry Information:</strong> Ingredient inventory, expiration dates, and nutritional data you enter for pantry management.
            </p>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: '1.75' }}>
              <strong>Gatherings and Circles:</strong> Information about collaborative cooking events, participant lists, member roles in groups (Circles), and shared recipe collections.
            </p>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: '1.75' }}>
              <strong>Communications:</strong> We collect information when you contact us for support, provide feedback, or interact with the AI Budget Coach.
            </p>

            <h3 className="text-xl sm:text-2xl font-semibold mt-8 sm:mt-6 mb-4 sm:mb-3" style={{ lineHeight: '1.4' }}>1.2 Information Collected Automatically</h3>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: '1.75' }}>
              <strong>Usage Data:</strong> We automatically collect information about your interactions with the Service, including recipes viewed, saved, created, and shared; features used; time spent on the application; navigation patterns; search queries; story views; engagement metrics (likes, comments, saves); and cooking behavior analytics.
            </p>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: '1.75' }}>
              <strong>Device Information:</strong> We collect device identifiers, operating system type and version, device model, app version, platform (iOS/Android), mobile network information, and connectivity state.
            </p>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: '1.75' }}>
              <strong>Push Notification Tokens:</strong> When you enable push notifications, we collect device tokens to send you message notifications, reminders, and Gathering invitations.
            </p>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: '1.75' }}>
              <strong>Log Data:</strong> Our servers automatically record information including your IP address, access times, app crashes, error logs, and system activity. Audit logs are maintained for security events.
            </p>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: '1.75' }}>
              <strong>Camera and Media Library Access:</strong> When you grant permission, we access your camera to take photos/videos for recipes and your media library to upload existing photos. We also use camera access for barcode/OCR scanning features.
            </p>

            <h3 className="text-xl sm:text-2xl font-semibold mt-8 sm:mt-6 mb-4 sm:mb-3" style={{ lineHeight: '1.4' }}>1.3 Information from Third Parties</h3>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: '1.75' }}>
              <strong>Authentication Providers:</strong> When you sign in using Apple or Google, we receive your name, email address, and account identifier as authorized by you.
            </p>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: '1.75' }}>
              <strong>Kroger API:</strong> If you use Kroger integration features, we receive real-time grocery pricing, product availability, and store location data. We share shopping list data with Kroger to provide pricing information.
            </p>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: '1.75' }}>
              <strong>Video Platforms:</strong> When you import recipes from YouTube, TikTok, or Instagram, we extract recipe information from those platforms. We do not receive your credentials for these services.
            </p>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: '1.75' }}>
              <strong>Pexels API:</strong> We use Pexels to provide stock photos for recipes. Pexels may collect certain information as described in their privacy policy.
            </p>

            <h3 className="text-xl sm:text-2xl font-semibold mt-8 sm:mt-6 mb-4 sm:mb-3" style={{ lineHeight: '1.4' }}>1.4 Location Information</h3>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: '1.75' }}>
              When you grant location permissions, we collect your device location to: (a) find nearby grocery stores and provide localized pricing via the Kroger API; (b) enable location-based Gathering discovery; and (c) provide location-based recommendations. You can disable location services at any time in your device settings. We may also infer your general location from your IP address for localized content.
            </p>

            <h3 className="text-xl sm:text-2xl font-semibold mt-8 sm:mt-6 mb-4 sm:mb-3" style={{ lineHeight: '1.4' }}>1.5 AI and Machine Learning Data</h3>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: '1.75' }}>
              <strong>AI Services:</strong> We use AI service providers to power our AI Budget Coach, recipe recommendations, and conversational assistance features. When you interact with AI features, your queries and relevant context (such as dietary preferences and shopping history) are processed by our AI providers. Their use of this data is governed by their privacy policies and our data processing agreements.
            </p>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: '1.75' }}>
              <strong>Computer Vision Services:</strong> We use computer vision services for OCR (optical character recognition) to scan barcodes and extract text from images. Images processed through these services are subject to our providers&apos; privacy practices.
            </p>
          </section>

          <section className="mb-10 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl font-semibold mt-10 sm:mt-8 mb-6 sm:mb-4" style={{ lineHeight: '1.3' }}>2. LEGAL BASES FOR PROCESSING (GDPR)</h2>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: '1.75' }}>
              For users in the European Economic Area (&quot;EEA&quot;), United Kingdom, or Switzerland, we process personal information under the following legal bases pursuant to the General Data Protection Regulation (&quot;GDPR&quot;):
            </p>
            <ul className="list-disc list-inside mb-6 sm:mb-4 space-y-3 sm:space-y-2 ml-4" style={{ lineHeight: '1.75' }}>
              <li><strong>Contractual Necessity (Article 6(1)(b)):</strong> Processing necessary to provide the Service and fulfill our agreement with you, including account management, recipe sharing, shopping list features, and social networking functionality.</li>
              <li><strong>Legitimate Interests (Article 6(1)(f)):</strong> Processing for purposes such as improving our Service, preventing fraud, ensuring security, conducting analytics, and providing customer support, where such interests are not overridden by your rights.</li>
              <li><strong>Consent (Article 6(1)(a)):</strong> Processing based on your explicit consent, including location services, push notifications, AI-powered features, and marketing communications. You may withdraw consent at any time.</li>
              <li><strong>Legal Obligation (Article 6(1)(c)):</strong> Processing necessary to comply with applicable laws and regulations.</li>
            </ul>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: '1.75' }}>
              <strong>Special Category Data:</strong> Dietary and health-related information (such as allergies and dietary restrictions) may constitute special category data under Article 9 of the GDPR. We process this data based on your explicit consent (Article 9(2)(a)) for the purpose of personalizing recipes and meal planning.
            </p>
          </section>

          <section className="mb-10 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl font-semibold mt-10 sm:mt-8 mb-6 sm:mb-4" style={{ lineHeight: '1.3' }}>3. HOW WE USE YOUR INFORMATION</h2>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: '1.75' }}>We use your information for the following purposes:</p>
            <ul className="list-disc list-inside mb-6 sm:mb-4 space-y-3 sm:space-y-2 ml-4" style={{ lineHeight: '1.75' }}>
              <li><strong>Service Provision:</strong> To create and manage your account, authenticate your identity, provide and personalize the Service, deliver features you request, process shopping lists, and manage Gatherings and Circles.</li>
              <li><strong>AI-Powered Features:</strong> To provide recipe recommendations, AI Budget Coach assistance, conversational help, and intelligent meal planning.</li>
              <li><strong>Personalization:</strong> To generate recipe recommendations, create meal plans, tailor content based on your preferences, dietary restrictions, cooking history, and usage patterns.</li>
              <li><strong>Social Features:</strong> To enable the community feed, stories, direct messaging (encrypted), following/followers, Circles, and Gatherings functionality.</li>
              <li><strong>Smart Shopping:</strong> To provide real-time grocery pricing, price comparison, budget tracking, savings calculations, and shopping list management via grocery partner integrations.</li>
              <li><strong>Notifications:</strong> To send push notifications for messages, reminders, Gathering invitations, and expiration alerts.</li>
              <li><strong>Communication:</strong> To send service-related communications, respond to inquiries, and provide customer support.</li>
              <li><strong>Analytics:</strong> To power your personal savings dashboard, track cooking statistics, award achievement badges, and analyze engagement metrics.</li>
              <li><strong>Improvement:</strong> To analyze usage patterns, diagnose technical issues, and improve the Service&apos;s functionality and user experience.</li>
              <li><strong>Content Moderation:</strong> To review and moderate user-generated content for compliance with our Community Guidelines.</li>
              <li><strong>Safety and Security:</strong> To detect, prevent, and address fraud, abuse, security incidents, and violations of our Terms of Service. We maintain audit logs of security events.</li>
              <li><strong>Legal Compliance:</strong> To comply with applicable laws, regulations, legal processes, and governmental requests.</li>
            </ul>
          </section>

          <section className="mb-10 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl font-semibold mt-10 sm:mt-8 mb-6 sm:mb-4" style={{ lineHeight: '1.3' }}>4. HOW WE SHARE YOUR INFORMATION</h2>
            <p className="mb-4 font-semibold text-lg">
              We do not sell your personal information.
            </p>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: '1.75' }}>We may share your information in the following circumstances:</p>

            <h3 className="text-xl sm:text-2xl font-semibold mt-8 sm:mt-6 mb-4 sm:mb-3" style={{ lineHeight: '1.4' }}>4.1 Service Providers</h3>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: '1.75' }}>
              We share information with third-party vendors who perform services on our behalf:
            </p>
            <ul className="list-disc list-inside mb-6 sm:mb-4 space-y-3 sm:space-y-2 ml-4" style={{ lineHeight: '1.75' }}>
              <li><strong>Cloud Infrastructure Providers:</strong> Authentication, database, storage, and serverless computing for backend infrastructure.</li>
              <li><strong>AI Service Providers:</strong> AI-powered features including the Budget Coach and recipe recommendations.</li>
              <li><strong>Computer Vision Providers:</strong> OCR and barcode scanning functionality.</li>
              <li><strong>Push Notification Providers:</strong> Delivery of push notifications to your device.</li>
              <li><strong>Analytics and Monitoring Providers:</strong> Error tracking and application performance monitoring.</li>
              <li><strong>Media Service Providers:</strong> Stock photo services for recipe imagery.</li>
            </ul>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: '1.75' }}>
              These providers are contractually obligated to protect your information and use it only for specified purposes.
            </p>

            <h3 className="text-xl sm:text-2xl font-semibold mt-8 sm:mt-6 mb-4 sm:mb-3" style={{ lineHeight: '1.4' }}>4.2 Third-Party Integrations</h3>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: '1.75' }}>
              <strong>Apple and Google:</strong> Authentication data is processed by Apple and Google in accordance with their privacy policies.
            </p>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: '1.75' }}>
              <strong>Kroger:</strong> If you use Kroger integration features, we share shopping list data and receive pricing, product, and store information. Your use of Kroger services is subject to Kroger&apos;s privacy policy.
            </p>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: '1.75' }}>
              <strong>Video Platforms:</strong> When importing recipes from YouTube, TikTok, or Instagram, we interact with these platforms to extract recipe content. These platforms have their own privacy policies.
            </p>

            <h3 className="text-xl sm:text-2xl font-semibold mt-8 sm:mt-6 mb-4 sm:mb-3" style={{ lineHeight: '1.4' }}>4.3 User Content and Social Features</h3>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: '1.75' }}>
              Recipes, reviews, comments, stories, and other content you choose to make public will be visible to other users of the Service. Your profile information (display name, avatar, bio) is visible according to your privacy settings. Followers and following lists may be visible to other users. Content shared in Circles is visible to Circle members. Gathering information is visible to Gathering participants.
            </p>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: '1.75' }}>
              <strong>Direct Messages:</strong> Direct messages are end-to-end encrypted. We cannot access the content of these messages; only the sender and recipient can read them.
            </p>

            <h3 className="text-xl sm:text-2xl font-semibold mt-8 sm:mt-6 mb-4 sm:mb-3" style={{ lineHeight: '1.4' }}>4.4 Legal Requirements</h3>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: '1.75' }}>
              We may disclose your information if required to do so by law or in response to valid legal process, including subpoenas, court orders, or government requests. We may also disclose information to: (a) enforce our Terms of Service; (b) protect our rights, privacy, safety, or property; (c) protect the rights, privacy, safety, or property of you or others; or (d) detect, prevent, or address fraud, security, or technical issues.
            </p>

            <h3 className="text-xl sm:text-2xl font-semibold mt-8 sm:mt-6 mb-4 sm:mb-3" style={{ lineHeight: '1.4' }}>4.5 Business Transfers</h3>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: '1.75' }}>
              In connection with any merger, acquisition, sale of assets, financing, or transfer of all or a portion of our business, your information may be transferred to the acquiring entity. We will notify you via email or prominent notice on the Service of any change in ownership or uses of your personal information.
            </p>

            <h3 className="text-xl sm:text-2xl font-semibold mt-8 sm:mt-6 mb-4 sm:mb-3" style={{ lineHeight: '1.4' }}>4.6 Aggregated or De-Identified Data</h3>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: '1.75' }}>
              We may share aggregated or de-identified information that cannot reasonably be used to identify you for any purpose, including research, analytics, and improving the Service.
            </p>
          </section>

          <section className="mb-10 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl font-semibold mt-10 sm:mt-8 mb-6 sm:mb-4" style={{ lineHeight: '1.3' }}>5. DATA RETENTION</h2>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: '1.75' }}>
              We retain your personal information for as long as your account is active or as needed to provide the Service. Specific retention periods include:
            </p>
            <ul className="list-disc list-inside mb-6 sm:mb-4 space-y-3 sm:space-y-2 ml-4" style={{ lineHeight: '1.75' }}>
              <li><strong>Account Data:</strong> Retained while your account is active.</li>
              <li><strong>User Content:</strong> Retained while your account is active; deleted upon account deletion except where shared with or copied by other users.</li>
              <li><strong>Stories:</strong> Automatically deleted 24 hours after posting.</li>
              <li><strong>Direct Messages:</strong> Retained in encrypted form until you or the recipient deletes them.</li>
              <li><strong>Audit Logs:</strong> Retained for 2 years for security purposes.</li>
              <li><strong>Error Logs:</strong> Retained for 90 days.</li>
              <li><strong>Analytics Data:</strong> Retained for 26 months in accordance with our analytics provider retention policies.</li>
            </ul>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: '1.75' }}>Upon account deletion:</p>
            <ul className="list-disc list-inside mb-6 sm:mb-4 space-y-3 sm:space-y-2 ml-4" style={{ lineHeight: '1.75' }}>
              <li>Personal data is deleted within thirty (30) days with cascading removal across all related data</li>
              <li>Backup copies are purged within ninety (90) days</li>
              <li>Anonymized, aggregated data may be retained indefinitely</li>
              <li>Data subject to legal holds or preservation requirements will be retained as required</li>
            </ul>
          </section>

          <section className="mb-10 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl font-semibold mt-10 sm:mt-8 mb-6 sm:mb-4" style={{ lineHeight: '1.3' }}>6. DATA SECURITY</h2>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: '1.75' }}>We implement technical and organizational security measures designed to protect your personal information, including:</p>
            <ul className="list-disc list-inside mb-6 sm:mb-4 space-y-3 sm:space-y-2 ml-4" style={{ lineHeight: '1.75' }}>
              <li>Encryption of data in transit using TLS/SSL protocols</li>
              <li>Encryption of sensitive data at rest</li>
              <li>End-to-end encryption for direct messages</li>
              <li>Secure authentication mechanisms including OAuth 2.0 for Apple and Google Sign-In</li>
              <li>Password hashing using industry-standard algorithms</li>
              <li>Access controls limiting employee access to personal data</li>
              <li>Database security rules governing data access</li>
              <li>Audit logging for security events</li>
              <li>Regular security assessments and monitoring</li>
              <li>Incident response procedures</li>
            </ul>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: '1.75' }}>
              Despite these measures, no method of electronic transmission or storage is completely secure. We cannot guarantee absolute security of your information.
            </p>
          </section>

          <section className="mb-10 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl font-semibold mt-10 sm:mt-8 mb-6 sm:mb-4" style={{ lineHeight: '1.3' }}>7. YOUR PRIVACY RIGHTS</h2>

            <h3 className="text-xl sm:text-2xl font-semibold mt-8 sm:mt-6 mb-4 sm:mb-3" style={{ lineHeight: '1.4' }}>7.1 General Rights</h3>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: '1.75' }}>Subject to applicable law, you have the right to:</p>
            <ul className="list-disc list-inside mb-6 sm:mb-4 space-y-3 sm:space-y-2 ml-4" style={{ lineHeight: '1.75' }}>
              <li><strong>Access:</strong> Request information about the personal data we hold about you and receive a copy of your data.</li>
              <li><strong>Correction:</strong> Request correction of inaccurate personal data.</li>
              <li><strong>Deletion:</strong> Request deletion of your personal data, subject to certain exceptions. We provide account deletion functionality with cascading data removal.</li>
              <li><strong>Portability:</strong> Request a copy of your personal data in a structured, machine-readable format. We provide data export functionality within the app.</li>
              <li><strong>Restriction:</strong> Request restriction of processing in certain circumstances.</li>
              <li><strong>Objection:</strong> Object to processing based on legitimate interests.</li>
              <li><strong>Withdraw Consent:</strong> Withdraw consent where processing is based on consent, including location services, push notifications, and AI features.</li>
            </ul>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: '1.75' }}>
              To exercise these rights, contact us at <a href="mailto:privacy@gruby.app" className="text-blue-600 hover:underline">privacy@gruby.app</a> or use the privacy controls within the application settings.
            </p>

            <h3 className="text-xl sm:text-2xl font-semibold mt-8 sm:mt-6 mb-4 sm:mb-3" style={{ lineHeight: '1.4' }}>7.2 California Privacy Rights (CCPA/CPRA)</h3>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: '1.75' }}>
              If you are a California resident, you have additional rights under the California Consumer Privacy Act, as amended by the California Privacy Rights Act (collectively, &quot;CCPA&quot;), Cal. Civ. Code Sections 1798.100-1798.199.100:
            </p>
            <ul className="list-disc list-inside mb-6 sm:mb-4 space-y-3 sm:space-y-2 ml-4" style={{ lineHeight: '1.75' }}>
              <li><strong>Right to Know:</strong> You may request disclosure of the categories and specific pieces of personal information we have collected, the sources of collection, the purposes for collection, and the categories of third parties with whom we share personal information.</li>
              <li><strong>Right to Delete:</strong> You may request deletion of your personal information, subject to certain exceptions.</li>
              <li><strong>Right to Correct:</strong> You may request correction of inaccurate personal information.</li>
              <li><strong>Right to Opt-Out of Sale/Sharing:</strong> We do not sell or share your personal information for cross-context behavioral advertising as those terms are defined under the CCPA.</li>
              <li><strong>Right to Limit Use of Sensitive Personal Information:</strong> You may request that we limit our use of sensitive personal information (such as dietary restrictions and health information) to purposes necessary to provide the Service.</li>
              <li><strong>Right to Non-Discrimination:</strong> We will not discriminate against you for exercising your privacy rights.</li>
            </ul>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: '1.75' }}><strong>Categories of Personal Information Collected:</strong></p>
            <ul className="list-disc list-inside mb-6 sm:mb-4 space-y-3 sm:space-y-2 ml-4" style={{ lineHeight: '1.75' }}>
              <li>Identifiers (name, email, username, device identifiers)</li>
              <li>Personal information under Cal. Civ. Code Section 1798.80(e) (name, telephone number)</li>
              <li>Protected classification characteristics (dietary restrictions that may indicate religious practices or health conditions)</li>
              <li>Commercial information (shopping history, budget information)</li>
              <li>Geolocation data (when permission granted)</li>
              <li>Audio, visual, or similar information (photos, videos you upload)</li>
              <li>Internet or network activity (usage data, browsing history within the app)</li>
              <li>Inferences drawn from collected information (recipe preferences, cooking patterns)</li>
              <li>Sensitive personal information (dietary restrictions, health-related preferences)</li>
            </ul>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: '1.75' }}>
              To submit a verifiable consumer request, contact us at <a href="mailto:privacy@gruby.app" className="text-blue-600 hover:underline">privacy@gruby.app</a>. You may designate an authorized agent to submit requests on your behalf. We will verify your identity before responding to requests.
            </p>

            <h3 className="text-xl sm:text-2xl font-semibold mt-8 sm:mt-6 mb-4 sm:mb-3" style={{ lineHeight: '1.4' }}>7.3 Virginia, Colorado, Connecticut, Utah, and Other State Privacy Rights</h3>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: '1.75' }}>
              Residents of Virginia (VCDPA), Colorado (CPA), Connecticut (CTDPA), Utah (UCPA), and other states with comprehensive privacy laws have similar rights to access, correct, delete, and obtain a copy of their personal data, as well as the right to opt out of targeted advertising and profiling. To exercise these rights, contact us at <a href="mailto:privacy@gruby.app" className="text-blue-600 hover:underline">privacy@gruby.app</a>. You may appeal any decision regarding your request by emailing <a href="mailto:privacy@gruby.app" className="text-blue-600 hover:underline">privacy@gruby.app</a> with &quot;Privacy Appeal&quot; in the subject line.
            </p>

            <h3 className="text-xl sm:text-2xl font-semibold mt-8 sm:mt-6 mb-4 sm:mb-3" style={{ lineHeight: '1.4' }}>7.4 European Privacy Rights (GDPR)</h3>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: '1.75' }}>
              If you are in the EEA, UK, or Switzerland, you have rights under the GDPR including the rights described in Section 7.1 above. You also have the right to lodge a complaint with your local data protection authority.
            </p>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: '1.75' }}>
              <strong>Data Controller:</strong> Gruby is the data controller for purposes of the GDPR.
            </p>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: '1.75' }}>
              <strong>Data Transfers:</strong> Your information may be transferred to and processed in the United States. We rely on Standard Contractual Clauses (SCCs) approved by the European Commission and supplementary measures for such transfers.
            </p>
          </section>

          <section className="mb-10 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl font-semibold mt-10 sm:mt-8 mb-6 sm:mb-4" style={{ lineHeight: '1.3' }}>8. CHILDREN&apos;S PRIVACY</h2>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: '1.75' }}>
              The Service is not directed to children under the age of thirteen (13). We do not knowingly collect personal information from children under 13 in compliance with the Children&apos;s Online Privacy Protection Act (&quot;COPPA&quot;), 15 U.S.C. Sections 6501-6506, and its implementing regulations at 16 C.F.R. Part 312.
            </p>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: '1.75' }}>
              If we become aware that we have collected personal information from a child under 13 without verifiable parental consent, we will take steps to delete such information within a reasonable time. If you believe we have collected information from a child under 13, please contact us immediately at <a href="mailto:privacy@gruby.app" className="text-blue-600 hover:underline">privacy@gruby.app</a>.
            </p>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: '1.75' }}>
              Users between the ages of 13 and 18 (or the age of majority in their jurisdiction) should have parental or guardian consent to use the Service and to the collection and use of their personal information as described in this Privacy Policy.
            </p>
          </section>

          <section className="mb-10 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl font-semibold mt-10 sm:mt-8 mb-6 sm:mb-4" style={{ lineHeight: '1.3' }}>9. TRACKING AND ADVERTISING</h2>

            <h3 className="text-xl sm:text-2xl font-semibold mt-8 sm:mt-6 mb-4 sm:mb-3" style={{ lineHeight: '1.4' }}>9.1 Analytics</h3>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: '1.75' }}>
              We use analytics services to understand how users interact with the Service. These tools may collect information about your device and usage patterns.
            </p>

            <h3 className="text-xl sm:text-2xl font-semibold mt-8 sm:mt-6 mb-4 sm:mb-3" style={{ lineHeight: '1.4' }}>9.2 Apple App Tracking Transparency</h3>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: '1.75' }}>
              We comply with Apple&apos;s App Tracking Transparency framework. We will request your permission before tracking your activity across other companies&apos; apps and websites for advertising purposes. You may change your tracking preferences at any time in your device Settings under Privacy and Security, then Tracking.
            </p>

            <h3 className="text-xl sm:text-2xl font-semibold mt-8 sm:mt-6 mb-4 sm:mb-3" style={{ lineHeight: '1.4' }}>9.3 Do Not Track</h3>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: '1.75' }}>
              We do not currently respond to &quot;Do Not Track&quot; browser signals as there is no industry standard for compliance.
            </p>

            <h3 className="text-xl sm:text-2xl font-semibold mt-8 sm:mt-6 mb-4 sm:mb-3" style={{ lineHeight: '1.4' }}>9.4 Global Privacy Control</h3>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: '1.75' }}>
              We honor Global Privacy Control (GPC) signals as a valid opt-out request under applicable state privacy laws.
            </p>
          </section>

          <section className="mb-10 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl font-semibold mt-10 sm:mt-8 mb-6 sm:mb-4" style={{ lineHeight: '1.3' }}>10. THIRD-PARTY LINKS</h2>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: '1.75' }}>
              The Service may contain links to third-party websites or services. We are not responsible for the privacy practices of these third parties. We encourage you to review the privacy policies of any third-party sites you visit.
            </p>
          </section>

          <section className="mb-10 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl font-semibold mt-10 sm:mt-8 mb-6 sm:mb-4" style={{ lineHeight: '1.3' }}>11. INTERNATIONAL DATA TRANSFERS</h2>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: '1.75' }}>
              Your information may be transferred to and processed in countries other than your country of residence, including the United States, where our servers and service providers are located. These countries may have data protection laws that differ from those in your country. By using the Service, you consent to such transfers. We implement appropriate safeguards for international transfers, including Standard Contractual Clauses where required by law.
            </p>
          </section>

          <section className="mb-10 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl font-semibold mt-10 sm:mt-8 mb-6 sm:mb-4" style={{ lineHeight: '1.3' }}>12. CHANGES TO THIS PRIVACY POLICY</h2>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: '1.75' }}>
              We may update this Privacy Policy from time to time. We will notify you of material changes by posting the updated policy on the Service and updating the &quot;Effective Date&quot; above. For material changes, we will provide additional notice, such as email notification or in-app alert, at least 30 days before the changes take effect. Your continued use of the Service after the effective date of the revised policy constitutes acceptance of the changes.
            </p>
          </section>

          <section className="mb-10 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl font-semibold mt-10 sm:mt-8 mb-6 sm:mb-4" style={{ lineHeight: '1.3' }}>13. CONTACT US</h2>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: '1.75' }}>If you have questions, concerns, or requests regarding this Privacy Policy or our privacy practices, please contact us:</p>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: '1.75' }}>
              <strong>Gruby Privacy Team</strong><br />
              Email: <a href="mailto:privacy@gruby.app" className="text-blue-600 hover:underline">privacy@gruby.app</a>
            </p>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: '1.75' }}>
              For general inquiries:<br />
              Email: <a href="mailto:support@gruby.app" className="text-blue-600 hover:underline">support@gruby.app</a>
            </p>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: '1.75' }}>
              For GDPR-related inquiries:<br />
              Email: <a href="mailto:dpo@gruby.app" className="text-blue-600 hover:underline">dpo@gruby.app</a>
            </p>
          </section>
    </DocsLayout>
  );
}
