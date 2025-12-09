import type { Metadata } from 'next';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Privacy Policy | Gruby',
  description: 'Gruby Privacy Policy - Effective December 6, 2025',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="max-w-4xl mx-auto" style={{ 
        paddingLeft: 'clamp(1rem, 2vw, 2rem)', 
        paddingRight: 'clamp(1rem, 2vw, 2rem)',
        paddingTop: 'clamp(3rem, 5vw, 5rem)',
        paddingBottom: 'clamp(3rem, 5vw, 5rem)',
        containerType: 'inline-size'
      }}>
        <div className="prose prose-lg max-w-none">
          <h1 className="font-semibold mb-4" style={{ fontSize: 'clamp(1.875rem, 4vw + 1rem, 3rem)' }}>GRUBY PRIVACY POLICY</h1>
          
          <p className="text-gray-600 mb-8" style={{ fontSize: 'clamp(0.875rem, 1vw + 0.5rem, 0.875rem)' }}>
            <strong>Effective Date: December 6, 2025</strong>
          </p>

          <p className="mb-8" style={{ fontSize: 'clamp(1rem, 1.25vw + 0.75rem, 1.125rem)' }}>
            This Privacy Policy describes how Gruby (&quot;Company,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) collects, uses, discloses, and protects the personal information of users (&quot;User,&quot; &quot;you,&quot; or &quot;your&quot;) of the Gruby mobile application and related services (collectively, the &quot;Service&quot;). By using the Service, you consent to the collection and use of your information as described in this Privacy Policy.
          </p>

          <section className="mb-8">
            <h2 className="font-semibold mt-8 mb-4" style={{ fontSize: 'clamp(1.5rem, 2.5vw + 0.75rem, 1.875rem)' }}>1. INFORMATION WE COLLECT</h2>
            
            <h3 className="font-semibold mt-6 mb-3" style={{ fontSize: 'clamp(1.25rem, 2vw + 0.5rem, 1.5rem)' }}>1.1 Information You Provide Directly</h3>
            <p className="mb-4">
              <strong>Account Information:</strong> When you create an account, we collect your name, email address, and authentication credentials. If you register using Apple Sign-In or Google Sign-In, we receive basic profile information as permitted by those services.
            </p>
            <p className="mb-4">
              <strong>Profile Information:</strong> You may optionally provide a profile photo, display name, and biographical information.
            </p>
            <p className="mb-4">
              <strong>User Content:</strong> We collect recipes, photographs, reviews, comments, and other content you submit to the Service.
            </p>
            <p className="mb-4">
              <strong>Preferences:</strong> We collect your dietary preferences, restrictions, allergies, household size, and budget goals when you provide them.
            </p>
            <p className="mb-4">
              <strong>Communications:</strong> We collect information when you contact us for support or provide feedback.
            </p>

            <h3 className="text-xl sm:text-2xl font-semibold mt-6 mb-3">1.2 Information Collected Automatically</h3>
            <p className="mb-4">
              <strong>Usage Data:</strong> We automatically collect information about your interactions with the Service, including recipes viewed, saved, and created; features used; time spent on the application; and navigation patterns.
            </p>
            <p className="mb-4">
              <strong>Device Information:</strong> We collect device identifiers, operating system type and version, device model, app version, and mobile network information.
            </p>
            <p className="mb-4">
              <strong>Log Data:</strong> Our servers automatically record information including your IP address, access times, app crashes, and system activity.
            </p>

            <h3 className="text-xl sm:text-2xl font-semibold mt-6 mb-3">1.3 Information from Third Parties</h3>
            <p className="mb-4">
              <strong>Authentication Providers:</strong> When you sign in using Apple or Google, we receive your name, email address, and account identifier as authorized by you.
            </p>
            <p className="mb-4">
              <strong>Kroger:</strong> If you connect your Kroger account or use Kroger integration features, we may receive purchase history, loyalty information, and pricing data as authorized by you and permitted by Kroger&apos;s terms.
            </p>

            <h3 className="text-xl sm:text-2xl font-semibold mt-6 mb-3">1.4 Location Information</h3>
            <p className="mb-4">
              We do not collect precise geolocation data. We may infer your general location from your IP address for purposes of providing localized content and grocery pricing.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl sm:text-3xl font-semibold mt-8 mb-4">2. LEGAL BASES FOR PROCESSING (GDPR)</h2>
            <p className="mb-4">
              For users in the European Economic Area (&quot;EEA&quot;), United Kingdom, or Switzerland, we process personal information under the following legal bases pursuant to the General Data Protection Regulation (&quot;GDPR&quot;):
            </p>
            <ul className="list-disc list-inside mb-4 space-y-2 ml-4">
              <li><strong>Contractual Necessity:</strong> Processing necessary to provide the Service and fulfill our agreement with you.</li>
              <li><strong>Legitimate Interests:</strong> Processing for purposes such as improving our Service, preventing fraud, and ensuring security, where such interests are not overridden by your rights.</li>
              <li><strong>Consent:</strong> Processing based on your explicit consent, which you may withdraw at any time.</li>
              <li><strong>Legal Obligation:</strong> Processing necessary to comply with applicable laws and regulations.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl sm:text-3xl font-semibold mt-8 mb-4">3. HOW WE USE YOUR INFORMATION</h2>
            <p className="mb-4">We use your information for the following purposes:</p>
            <ul className="list-disc list-inside mb-4 space-y-2 ml-4">
              <li><strong>Service Provision:</strong> To create and manage your account, provide and personalize the Service, and deliver features you request.</li>
              <li><strong>Personalization:</strong> To generate recipe recommendations, create meal plans, and tailor content based on your preferences, dietary restrictions, and usage patterns.</li>
              <li><strong>Communication:</strong> To send service-related communications, respond to inquiries, and provide customer support.</li>
              <li><strong>Improvement:</strong> To analyze usage patterns, diagnose technical issues, and improve the Service&apos;s functionality and user experience.</li>
              <li><strong>Safety and Security:</strong> To detect, prevent, and address fraud, abuse, security incidents, and violations of our Terms of Service.</li>
              <li><strong>Legal Compliance:</strong> To comply with applicable laws, regulations, legal processes, and governmental requests.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl sm:text-3xl font-semibold mt-8 mb-4">4. HOW WE SHARE YOUR INFORMATION</h2>
            <p className="mb-4 font-semibold text-lg">
              We do not sell your personal information.
            </p>
            <p className="mb-4">We may share your information in the following circumstances:</p>

            <h3 className="text-xl sm:text-2xl font-semibold mt-6 mb-3">4.1 Service Providers</h3>
            <p className="mb-4">
              We share information with third-party vendors who perform services on our behalf, including cloud hosting, analytics, customer support, and infrastructure services. These providers are contractually obligated to protect your information and use it only for specified purposes.
            </p>

            <h3 className="text-xl sm:text-2xl font-semibold mt-6 mb-3">4.2 Third-Party Integrations</h3>
            <p className="mb-4">
              <strong>Apple and Google:</strong> Authentication data is processed by Apple and Google in accordance with their privacy policies.
            </p>
            <p className="mb-4">
              <strong>Kroger:</strong> If you use Kroger integration features, we share and receive information with Kroger as necessary to provide those features. This may include shopping list data and account identifiers. Your use of Kroger services is subject to Kroger&apos;s privacy policy.
            </p>

            <h3 className="text-xl sm:text-2xl font-semibold mt-6 mb-3">4.3 User Content</h3>
            <p className="mb-4">
              Recipes, reviews, and other content you choose to make public will be visible to other users of the Service.
            </p>

            <h3 className="text-xl sm:text-2xl font-semibold mt-6 mb-3">4.4 Legal Requirements</h3>
            <p className="mb-4">
              We may disclose your information if required to do so by law or in response to valid legal process, including subpoenas, court orders, or government requests. We may also disclose information to: (a) enforce our Terms of Service; (b) protect our rights, privacy, safety, or property; (c) protect the rights, privacy, safety, or property of you or others; or (d) detect, prevent, or address fraud, security, or technical issues.
            </p>

            <h3 className="text-xl sm:text-2xl font-semibold mt-6 mb-3">4.5 Business Transfers</h3>
            <p className="mb-4">
              In connection with any merger, acquisition, sale of assets, financing, or transfer of all or a portion of our business, your information may be transferred to the acquiring entity. We will notify you via email or prominent notice on the Service of any change in ownership or uses of your personal information.
            </p>

            <h3 className="text-xl sm:text-2xl font-semibold mt-6 mb-3">4.6 Aggregated or De-Identified Data</h3>
            <p className="mb-4">
              We may share aggregated or de-identified information that cannot reasonably be used to identify you for any purpose.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl sm:text-3xl font-semibold mt-8 mb-4">5. DATA RETENTION</h2>
            <p className="mb-4">
              We retain your personal information for as long as your account is active or as needed to provide the Service. We may retain certain information as necessary to comply with legal obligations, resolve disputes, enforce agreements, or as otherwise permitted by law.
            </p>
            <p className="mb-4">Upon account deletion:</p>
            <ul className="list-disc list-inside mb-4 space-y-2 ml-4">
              <li>Personal data is deleted within thirty (30) days</li>
              <li>Backup copies are purged within ninety (90) days</li>
              <li>Anonymized, aggregated data may be retained indefinitely</li>
              <li>Data subject to legal holds or preservation requirements will be retained as required</li>
            </ul>
            <p className="mb-4">
              User Content that has been shared with or copied by other users may persist after your account is deleted.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl sm:text-3xl font-semibold mt-8 mb-4">6. DATA SECURITY</h2>
            <p className="mb-4">We implement technical and organizational security measures designed to protect your personal information, including:</p>
            <ul className="list-disc list-inside mb-4 space-y-2 ml-4">
              <li>Encryption of data in transit using TLS/SSL protocols</li>
              <li>Encryption of sensitive data at rest</li>
              <li>Secure authentication mechanisms</li>
              <li>Access controls limiting employee access to personal data</li>
              <li>Regular security assessments and penetration testing</li>
              <li>Incident response procedures</li>
            </ul>
            <p className="mb-4">
              Despite these measures, no method of electronic transmission or storage is completely secure. We cannot guarantee absolute security of your information.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl sm:text-3xl font-semibold mt-8 mb-4">7. YOUR PRIVACY RIGHTS</h2>
            
            <h3 className="text-xl sm:text-2xl font-semibold mt-6 mb-3">7.1 General Rights</h3>
            <p className="mb-4">Subject to applicable law, you have the right to:</p>
            <ul className="list-disc list-inside mb-4 space-y-2 ml-4">
              <li><strong>Access:</strong> Request information about the personal data we hold about you.</li>
              <li><strong>Correction:</strong> Request correction of inaccurate personal data.</li>
              <li><strong>Deletion:</strong> Request deletion of your personal data, subject to certain exceptions.</li>
              <li><strong>Portability:</strong> Request a copy of your personal data in a structured, machine-readable format.</li>
              <li><strong>Restriction:</strong> Request restriction of processing in certain circumstances.</li>
              <li><strong>Objection:</strong> Object to processing based on legitimate interests.</li>
              <li><strong>Withdraw Consent:</strong> Withdraw consent where processing is based on consent.</li>
            </ul>
            <p className="mb-4">
              To exercise these rights, contact us at <a href="mailto:privacy@gruby.app" className="text-blue-600 hover:underline">privacy@gruby.app</a> or use the privacy controls within the application settings.
            </p>

            <h3 className="text-xl sm:text-2xl font-semibold mt-6 mb-3">7.2 California Privacy Rights (CCPA/CPRA)</h3>
            <p className="mb-4">
              If you are a California resident, you have additional rights under the California Consumer Privacy Act, as amended by the California Privacy Rights Act (collectively, &quot;CCPA&quot;), Cal. Civ. Code §§ 1798.100-1798.199.100:
            </p>
            <ul className="list-disc list-inside mb-4 space-y-2 ml-4">
              <li><strong>Right to Know:</strong> You may request disclosure of the categories and specific pieces of personal information we have collected, the sources of collection, the purposes for collection, and the categories of third parties with whom we share personal information.</li>
              <li><strong>Right to Delete:</strong> You may request deletion of your personal information, subject to certain exceptions.</li>
              <li><strong>Right to Correct:</strong> You may request correction of inaccurate personal information.</li>
              <li><strong>Right to Opt-Out of Sale/Sharing:</strong> We do not sell or share your personal information for cross-context behavioral advertising as those terms are defined under the CCPA.</li>
              <li><strong>Right to Non-Discrimination:</strong> We will not discriminate against you for exercising your privacy rights.</li>
            </ul>
            <p className="mb-4"><strong>Categories of Personal Information Collected:</strong></p>
            <ul className="list-disc list-inside mb-4 space-y-2 ml-4">
              <li>Identifiers (name, email, device identifiers)</li>
              <li>Personal information under Cal. Civ. Code § 1798.80(e) (name, address)</li>
              <li>Internet or network activity (usage data, browsing history within the app)</li>
              <li>Inferences drawn from collected information</li>
            </ul>
            <p className="mb-4">
              <strong>Purposes for Collection:</strong> As described in Section 3 of this Privacy Policy.
            </p>
            <p className="mb-4">
              <strong>Retention Periods:</strong> As described in Section 5 of this Privacy Policy.
            </p>
            <p className="mb-4">
              To submit a verifiable consumer request, contact us at <a href="mailto:privacy@gruby.app" className="text-blue-600 hover:underline">privacy@gruby.app</a>. You may designate an authorized agent to submit requests on your behalf. We will verify your identity before responding to requests.
            </p>

            <h3 className="text-xl sm:text-2xl font-semibold mt-6 mb-3">7.3 Virginia, Colorado, Connecticut, and Utah Privacy Rights</h3>
            <p className="mb-4">
              Residents of Virginia (VCDPA), Colorado (CPA), Connecticut (CTDPA), and Utah (UCPA) have similar rights to access, correct, delete, and obtain a copy of their personal data. To exercise these rights, contact us at <a href="mailto:privacy@gruby.app" className="text-blue-600 hover:underline">privacy@gruby.app</a>. You may appeal any decision regarding your request by emailing <a href="mailto:privacy@gruby.app" className="text-blue-600 hover:underline">privacy@gruby.app</a> with &quot;Privacy Appeal&quot; in the subject line.
            </p>

            <h3 className="text-xl sm:text-2xl font-semibold mt-6 mb-3">7.4 European Privacy Rights (GDPR)</h3>
            <p className="mb-4">
              If you are in the EEA, UK, or Switzerland, you have rights under the GDPR including the rights described in Section 7.1 above. You also have the right to lodge a complaint with your local data protection authority.
            </p>
            <p className="mb-4">
              <strong>Data Controller:</strong> Gruby is the data controller for purposes of the GDPR.
            </p>
            <p className="mb-4">
              <strong>Data Transfers:</strong> Your information may be transferred to and processed in the United States. We rely on Standard Contractual Clauses approved by the European Commission for such transfers.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl sm:text-3xl font-semibold mt-8 mb-4">8. CHILDREN&apos;S PRIVACY</h2>
            <p className="mb-4">
              The Service is not directed to children under the age of thirteen (13). We do not knowingly collect personal information from children under 13 in compliance with the Children&apos;s Online Privacy Protection Act (&quot;COPPA&quot;), 15 U.S.C. §§ 6501-6506, and its implementing regulations at 16 C.F.R. Part 312.
            </p>
            <p className="mb-4">
              If we become aware that we have collected personal information from a child under 13 without parental consent, we will take steps to delete such information promptly. If you believe we have collected information from a child under 13, please contact us immediately at <a href="mailto:privacy@gruby.app" className="text-blue-600 hover:underline">privacy@gruby.app</a>.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl sm:text-3xl font-semibold mt-8 mb-4">9. TRACKING AND ADVERTISING</h2>
            
            <h3 className="text-xl sm:text-2xl font-semibold mt-6 mb-3">9.1 Analytics</h3>
            <p className="mb-4">
              We use analytics tools to understand how users interact with the Service. These tools may collect information about your device and usage patterns.
            </p>

            <h3 className="text-xl sm:text-2xl font-semibold mt-6 mb-3">9.2 Apple App Tracking Transparency</h3>
            <p className="mb-4">
              We comply with Apple&apos;s App Tracking Transparency framework. We will request your permission before tracking your activity across other companies&apos; apps and websites for advertising purposes. You may change your tracking preferences at any time in your device Settings under Privacy &gt; Tracking.
            </p>

            <h3 className="text-xl sm:text-2xl font-semibold mt-6 mb-3">9.3 Do Not Track</h3>
            <p className="mb-4">
              We do not currently respond to &quot;Do Not Track&quot; browser signals as there is no industry standard for compliance.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl sm:text-3xl font-semibold mt-8 mb-4">10. THIRD-PARTY LINKS</h2>
            <p className="mb-4">
              The Service may contain links to third-party websites or services. We are not responsible for the privacy practices of these third parties. We encourage you to review the privacy policies of any third-party sites you visit.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl sm:text-3xl font-semibold mt-8 mb-4">11. INTERNATIONAL DATA TRANSFERS</h2>
            <p className="mb-4">
              Your information may be transferred to and processed in countries other than your country of residence, including the United States. These countries may have data protection laws that differ from those in your country. By using the Service, you consent to such transfers. We implement appropriate safeguards for international transfers, including Standard Contractual Clauses where required.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl sm:text-3xl font-semibold mt-8 mb-4">12. CHANGES TO THIS PRIVACY POLICY</h2>
            <p className="mb-4">
              We may update this Privacy Policy from time to time. We will notify you of material changes by posting the updated policy on the Service and updating the &quot;Effective Date&quot; above. For material changes, we will provide additional notice, such as email notification or in-app alert. Your continued use of the Service after the effective date of the revised policy constitutes acceptance of the changes.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl sm:text-3xl font-semibold mt-8 mb-4">13. CONTACT US</h2>
            <p className="mb-4">If you have questions, concerns, or requests regarding this Privacy Policy or our privacy practices, please contact us:</p>
            <p className="mb-4">
              <strong>Gruby Privacy Team</strong><br />
              Email: <a href="mailto:privacy@gruby.app" className="text-blue-600 hover:underline">privacy@gruby.app</a>
            </p>
            <p className="mb-4">
              For general inquiries:<br />
              Email: <a href="mailto:support@gruby.app" className="text-blue-600 hover:underline">support@gruby.app</a>
            </p>
            <p className="mb-4">
              For California residents, you may also contact us by mail at:<br />
              Gruby<br />
              Attn: Privacy Team<br />
              {/* TODO: Add your physical business address here before publishing */}
              [Your Business Address]
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
}
