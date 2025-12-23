/* eslint-disable react/no-unescaped-entities */
import type { Metadata } from 'next';
import { DocsLayout } from '@/components/DocsLayout';

export const metadata: Metadata = {
  title: 'Terms of Service | Gruby',
  description: 'Gruby Terms of Service - Effective December 6, 2025',
};

export default function TermsPage() {
  return (
    <DocsLayout title="Terms of Service" currentPath="/terms">
          <h1 className="font-semibold mb-6 sm:mb-4" style={{ fontSize: 'clamp(1.875rem, 4vw + 1rem, 3rem)', lineHeight: '1.2' }}>GRUBY TERMS OF SERVICE</h1>
          
          <p className="text-gray-600 mb-8 sm:mb-6" style={{ fontSize: 'clamp(0.875rem, 1vw + 0.5rem, 0.875rem)', lineHeight: '1.6' }}>
            <strong>Effective Date: December 6, 2025</strong>
          </p>

          <p className="mb-10 sm:mb-8" style={{ fontSize: 'clamp(1rem, 1.25vw + 0.75rem, 1.125rem)', lineHeight: '1.75' }}>
            PLEASE READ THESE TERMS OF SERVICE CAREFULLY. BY ACCESSING OR USING THE GRUBY APPLICATION, YOU AGREE TO BE BOUND BY THESE TERMS AND ALL APPLICABLE LAWS. IF YOU DO NOT AGREE, DO NOT USE THIS APPLICATION.
          </p>

          <section className="mb-10 sm:mb-8">
            <h2 className="font-semibold mt-10 sm:mt-8 mb-6 sm:mb-4" style={{ fontSize: 'clamp(1.5rem, 2.5vw + 0.75rem, 1.875rem)', lineHeight: '1.3' }}>1. ACCEPTANCE OF TERMS</h2>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: '1.75' }}>
              These Terms of Service (&quot;Terms&quot;) constitute a legally binding agreement between you (&quot;User,&quot; &quot;you,&quot; or &quot;your&quot;) and Gruby (&quot;Company,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) governing your access to and use of the Gruby mobile application and related services (collectively, the &quot;Service&quot;). By creating an account, downloading, accessing, or using the Service, you acknowledge that you have read, understood, and agree to be bound by these Terms, as well as our Privacy Policy, incorporated herein by reference.
            </p>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: '1.75' }}>
              We reserve the right to modify these Terms at any time. Material changes will be communicated through the application or via email. Your continued use of the Service following such modifications constitutes acceptance of the revised Terms. It is your responsibility to review these Terms periodically.
            </p>
          </section>

          <section className="mb-10 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl font-semibold mt-10 sm:mt-8 mb-6 sm:mb-4" style={{ lineHeight: '1.3' }}>2. ELIGIBILITY</h2>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: '1.75' }}>
              The Service is intended for users who are at least thirteen (13) years of age. By using the Service, you represent and warrant that you are at least 13 years old. If you are between the ages of 13 and 18 (or the age of legal majority in your jurisdiction), you represent that your parent or legal guardian has reviewed and agreed to these Terms on your behalf. Users under 13 are prohibited from using the Service in compliance with the Children's Online Privacy Protection Act ("COPPA"), 15 U.S.C. §§ 6501-6506.
            </p>
          </section>

          <section className="mb-10 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl font-semibold mt-10 sm:mt-8 mb-6 sm:mb-4" style={{ lineHeight: '1.3' }}>3. ACCOUNT REGISTRATION AND SECURITY</h2>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: '1.75' }}>
              To access certain features of the Service, you must create an account using Apple Sign-In, Google Sign-In, or email registration. You agree to: (a) provide accurate, current, and complete information during registration; (b) maintain and promptly update your account information; (c) maintain the security and confidentiality of your login credentials; (d) accept all responsibility for activity that occurs under your account; and (e) notify us immediately of any unauthorized use or security breach.
            </p>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: '1.75' }}>
              We reserve the right to suspend or terminate accounts that contain false information, violate these Terms, or remain inactive for extended periods.
            </p>
          </section>

          <section className="mb-10 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl font-semibold mt-10 sm:mt-8 mb-6 sm:mb-4" style={{ lineHeight: '1.3' }}>4. USER-GENERATED CONTENT</h2>
            
            <h3 className="font-semibold mt-8 sm:mt-6 mb-4 sm:mb-3" style={{ fontSize: 'clamp(1.25rem, 2vw + 0.5rem, 1.5rem)', lineHeight: '1.4' }}>4.1 License Grant</h3>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: '1.75' }}>
              The Service permits you to submit, post, and share content including but not limited to recipes, photographs, reviews, comments, and other materials ("User Content"). By submitting User Content, you grant Gruby a non-exclusive, worldwide, royalty-free, sublicensable, and transferable license to use, reproduce, modify, adapt, publish, translate, distribute, publicly display, and create derivative works from your User Content in connection with operating and providing the Service. This license continues even if you stop using the Service, but only for User Content that remains on the platform or has been shared with other users.
            </p>

            <h3 className="text-xl sm:text-2xl font-semibold mt-8 sm:mt-6 mb-4 sm:mb-3" style={{ lineHeight: '1.4' }}>4.2 Representations and Warranties</h3>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: '1.75' }}>
              You represent and warrant that: (a) you own or have the necessary rights, licenses, and permissions to submit your User Content; (b) your User Content does not infringe, misappropriate, or violate any third party's intellectual property rights, privacy rights, publicity rights, or other proprietary rights; (c) your User Content does not contain material that is defamatory, obscene, unlawful, threatening, or otherwise objectionable; and (d) your User Content does not contain viruses, malware, or other harmful code.
            </p>

            <h3 className="text-xl sm:text-2xl font-semibold mt-8 sm:mt-6 mb-4 sm:mb-3" style={{ lineHeight: '1.4' }}>4.3 Content Standards</h3>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: '1.75' }}>
              You agree not to submit User Content that: (a) is false, misleading, or fraudulent; (b) infringes any patent, trademark, trade secret, copyright, or other intellectual property rights; (c) violates any law, statute, ordinance, or regulation; (d) is defamatory, libelous, threatening, or harassing; (e) promotes illegal activities or harm to others; (f) contains personal information of third parties without consent; (g) impersonates any person or entity; or (h) contains unsolicited advertising or spam.
            </p>

            <h3 className="text-xl sm:text-2xl font-semibold mt-8 sm:mt-6 mb-4 sm:mb-3" style={{ lineHeight: '1.4' }}>4.4 DMCA Compliance</h3>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: '1.75' }}>
              Gruby respects the intellectual property rights of others and complies with the Digital Millennium Copyright Act of 1998 ("DMCA"), 17 U.S.C. § 512. If you believe that your copyrighted work has been copied in a way that constitutes infringement, please provide our designated Copyright Agent with written notice containing: (a) a physical or electronic signature of the copyright owner or authorized agent; (b) identification of the copyrighted work claimed to be infringed; (c) identification of the material claimed to be infringing and its location on the Service; (d) your contact information; (e) a statement that you have a good faith belief that the use is not authorized; and (f) a statement under penalty of perjury that the information is accurate and you are authorized to act on behalf of the copyright owner.
            </p>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: '1.75' }}>
              <strong>DMCA Agent:</strong><br />
              Gruby Legal Department<br />
              Email: dmca@gruby.app
            </p>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: '1.75' }}>
              We reserve the right to remove allegedly infringing content without prior notice and to terminate accounts of repeat infringers pursuant to 17 U.S.C. § 512(i).
            </p>

            <h3 className="text-xl sm:text-2xl font-semibold mt-8 sm:mt-6 mb-4 sm:mb-3" style={{ lineHeight: '1.4' }}>4.5 Content Removal</h3>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: '1.75' }}>
              We reserve the right, but have no obligation, to monitor, review, and remove User Content at our sole discretion for any reason, including violation of these Terms. We are not responsible for any failure or delay in removing User Content.
            </p>
          </section>

          <section className="mb-10 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl font-semibold mt-10 sm:mt-8 mb-6 sm:mb-4" style={{ lineHeight: '1.3' }}>5. INTELLECTUAL PROPERTY RIGHTS</h2>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: '1.75' }}>
              The Service and its original content (excluding User Content), features, and functionality are and shall remain the exclusive property of Gruby and its licensors. The Service is protected by copyright, trademark, and other intellectual property laws of the United States and foreign jurisdictions. Our trademarks and trade dress may not be used in connection with any product or service without prior written consent.
            </p>
          </section>

          <section className="mb-10 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl font-semibold mt-10 sm:mt-8 mb-6 sm:mb-4" style={{ lineHeight: '1.3' }}>6. THIRD-PARTY SERVICES AND INTEGRATIONS</h2>
            
            <h3 className="text-xl sm:text-2xl font-semibold mt-8 sm:mt-6 mb-4 sm:mb-3" style={{ lineHeight: '1.4' }}>6.1 Third-Party Platforms</h3>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: '1.75' }}>
              The Service integrates with third-party platforms including Apple Inc. ("Apple"), Google LLC ("Google"), and The Kroger Co. ("Kroger"). Your use of these integrations is subject to the respective terms and privacy policies of each third party:
            </p>
            <ul className="list-disc list-inside mb-6 sm:mb-4 space-y-3 sm:space-y-2 ml-4" style={{ lineHeight: '1.75' }}>
              <li>Apple: <a href="https://www.apple.com/legal/internet-services/itunes/" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">https://www.apple.com/legal/internet-services/itunes/</a></li>
              <li>Google: <a href="https://policies.google.com/terms" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">https://policies.google.com/terms</a></li>
              <li>Kroger: <a href="https://www.kroger.com/i/terms" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">https://www.kroger.com/i/terms</a></li>
            </ul>

            <h3 className="text-xl sm:text-2xl font-semibold mt-8 sm:mt-6 mb-4 sm:mb-3" style={{ lineHeight: '1.4' }}>6.2 Disclaimer of Third-Party Liability</h3>
            <p className="mb-4 font-semibold">
              GRUBY IS NOT RESPONSIBLE FOR THE CONTENT, ACCURACY, AVAILABILITY, OR PRACTICES OF ANY THIRD-PARTY SERVICES. YOUR INTERACTIONS WITH THIRD-PARTY SERVICES, INCLUDING PAYMENT AND DELIVERY OF GOODS, ARE SOLELY BETWEEN YOU AND THE THIRD PARTY. We do not endorse, warrant, or assume any responsibility for third-party products, services, or content.
            </p>

            <h3 className="text-xl sm:text-2xl font-semibold mt-8 sm:mt-6 mb-4 sm:mb-3" style={{ lineHeight: '1.4' }}>6.3 Kroger Integration</h3>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: '1.75' }}>
              The Kroger integration provides grocery pricing, product availability, and related information. Gruby does not guarantee the accuracy, completeness, or currentness of pricing or availability information. All purchases made through Kroger are subject to Kroger's terms and conditions. Gruby is not a party to any transaction between you and Kroger and assumes no liability for such transactions.
            </p>
          </section>

          <section className="mb-10 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl font-semibold mt-10 sm:mt-8 mb-6 sm:mb-4" style={{ lineHeight: '1.3' }}>7. DISCLAIMER OF WARRANTIES</h2>
            <p className="mb-4 font-semibold">
              THE SERVICE IS PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS WITHOUT WARRANTIES OF ANY KIND, WHETHER EXPRESS, IMPLIED, OR STATUTORY. TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, GRUBY EXPRESSLY DISCLAIMS ALL WARRANTIES, INCLUDING BUT NOT LIMITED TO:
            </p>
            <ul className="list-disc list-inside mb-6 sm:mb-4 space-y-3 sm:space-y-2 ml-4" style={{ lineHeight: '1.75' }}>
              <li>(a) IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, AND NON-INFRINGEMENT;</li>
              <li>(b) WARRANTIES THAT THE SERVICE WILL BE UNINTERRUPTED, TIMELY, SECURE, OR ERROR-FREE;</li>
              <li>(c) WARRANTIES REGARDING THE ACCURACY, RELIABILITY, OR COMPLETENESS OF ANY CONTENT, INCLUDING RECIPES, NUTRITIONAL INFORMATION, INGREDIENT LISTS, OR GROCERY PRICING;</li>
              <li>(d) WARRANTIES THAT THE SERVICE WILL MEET YOUR REQUIREMENTS OR EXPECTATIONS;</li>
              <li>(e) WARRANTIES THAT DEFECTS WILL BE CORRECTED OR THAT THE SERVICE IS FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS.</li>
            </ul>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: '1.75' }}>
              NUTRITIONAL INFORMATION AND RECIPES PROVIDED THROUGH THE SERVICE ARE FOR INFORMATIONAL PURPOSES ONLY AND ARE NOT INTENDED AS MEDICAL OR DIETARY ADVICE. ALWAYS CONSULT A QUALIFIED HEALTHCARE PROFESSIONAL BEFORE MAKING DIETARY CHANGES, ESPECIALLY IF YOU HAVE ALLERGIES, FOOD SENSITIVITIES, OR MEDICAL CONDITIONS.
            </p>
          </section>

          <section className="mb-10 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl font-semibold mt-10 sm:mt-8 mb-6 sm:mb-4" style={{ lineHeight: '1.3' }}>8. LIMITATION OF LIABILITY</h2>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: '1.75' }}>
              TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL GRUBY, ITS DIRECTORS, OFFICERS, EMPLOYEES, AGENTS, PARTNERS, SUPPLIERS, OR AFFILIATES BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, PUNITIVE, OR EXEMPLARY DAMAGES, INCLUDING BUT NOT LIMITED TO DAMAGES FOR LOSS OF PROFITS, GOODWILL, USE, DATA, OR OTHER INTANGIBLE LOSSES, ARISING OUT OF OR IN CONNECTION WITH:
            </p>
            <ul className="list-disc list-inside mb-6 sm:mb-4 space-y-3 sm:space-y-2 ml-4" style={{ lineHeight: '1.75' }}>
              <li>(a) YOUR ACCESS TO, USE OF, OR INABILITY TO USE THE SERVICE;</li>
              <li>(b) ANY CONDUCT OR CONTENT OF ANY THIRD PARTY ON THE SERVICE;</li>
              <li>(c) ANY USER CONTENT OBTAINED FROM THE SERVICE;</li>
              <li>(d) UNAUTHORIZED ACCESS, USE, OR ALTERATION OF YOUR CONTENT OR TRANSMISSIONS;</li>
              <li>(e) ANY ERRORS, INACCURACIES, OR OMISSIONS IN RECIPES, NUTRITIONAL INFORMATION, OR PRICING;</li>
              <li>(f) PERSONAL INJURY OR PROPERTY DAMAGE RESULTING FROM YOUR USE OF RECIPES OR INFORMATION FROM THE SERVICE;</li>
              <li>(g) ANY INTERRUPTION OR CESSATION OF THE SERVICE.</li>
            </ul>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: '1.75' }}>
              IN NO EVENT SHALL GRUBY'S TOTAL LIABILITY TO YOU FOR ALL CLAIMS ARISING FROM OR RELATED TO THE SERVICE EXCEED THE GREATER OF: (i) FIFTY DOLLARS ($50.00 USD) OR (ii) THE AMOUNTS PAID BY YOU TO GRUBY IN THE TWELVE (12) MONTHS PRECEDING THE CLAIM.
            </p>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: '1.75' }}>
              SOME JURISDICTIONS DO NOT ALLOW THE EXCLUSION OR LIMITATION OF CERTAIN DAMAGES, SO SOME OF THE ABOVE LIMITATIONS MAY NOT APPLY TO YOU.
            </p>
          </section>

          <section className="mb-10 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl font-semibold mt-10 sm:mt-8 mb-6 sm:mb-4" style={{ lineHeight: '1.3' }}>9. INDEMNIFICATION</h2>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: '1.75' }}>
              You agree to defend, indemnify, and hold harmless Gruby and its officers, directors, employees, contractors, agents, licensors, suppliers, successors, and assigns from and against any claims, liabilities, damages, judgments, awards, losses, costs, expenses, or fees (including reasonable attorneys' fees) arising out of or relating to: (a) your violation of these Terms; (b) your User Content; (c) your use of the Service; (d) your violation of any third-party rights, including intellectual property, privacy, or publicity rights; or (e) any claim that your User Content caused damage to a third party.
            </p>
          </section>

          <section className="mb-10 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl font-semibold mt-10 sm:mt-8 mb-6 sm:mb-4" style={{ lineHeight: '1.3' }}>10. BINDING ARBITRATION AND CLASS ACTION WAIVER</h2>
            
            <h3 className="text-xl sm:text-2xl font-semibold mt-8 sm:mt-6 mb-4 sm:mb-3" style={{ lineHeight: '1.4' }}>10.1 Agreement to Arbitrate</h3>
            <p className="mb-4 font-semibold">
              YOU AND GRUBY AGREE THAT ANY DISPUTE, CLAIM, OR CONTROVERSY ARISING OUT OF OR RELATING TO THESE TERMS OR THE SERVICE SHALL BE RESOLVED EXCLUSIVELY THROUGH FINAL AND BINDING ARBITRATION ADMINISTERED BY THE AMERICAN ARBITRATION ASSOCIATION ("AAA") IN ACCORDANCE WITH ITS CONSUMER ARBITRATION RULES, RATHER THAN IN COURT. This agreement to arbitrate is governed by the Federal Arbitration Act, 9 U.S.C. §§ 1-16.
            </p>

            <h3 className="text-xl sm:text-2xl font-semibold mt-8 sm:mt-6 mb-4 sm:mb-3" style={{ lineHeight: '1.4' }}>10.2 Exceptions</h3>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: '1.75' }}>
              Notwithstanding the foregoing, either party may seek injunctive or other equitable relief in any court of competent jurisdiction to prevent the actual or threatened infringement, misappropriation, or violation of intellectual property rights. Additionally, claims within the jurisdiction of small claims court may be brought in such court.
            </p>

            <h3 className="text-xl sm:text-2xl font-semibold mt-8 sm:mt-6 mb-4 sm:mb-3" style={{ lineHeight: '1.4' }}>10.3 Class Action Waiver</h3>
            <p className="mb-4 font-semibold">
              YOU AND GRUBY AGREE THAT EACH MAY BRING CLAIMS AGAINST THE OTHER ONLY IN YOUR OR ITS INDIVIDUAL CAPACITY AND NOT AS A PLAINTIFF OR CLASS MEMBER IN ANY PURPORTED CLASS, COLLECTIVE, OR REPRESENTATIVE PROCEEDING. Unless both parties agree otherwise, the arbitrator may not consolidate more than one person's claims and may not preside over any form of representative or class proceeding.
            </p>

            <h3 className="text-xl sm:text-2xl font-semibold mt-8 sm:mt-6 mb-4 sm:mb-3" style={{ lineHeight: '1.4' }}>10.4 Opt-Out</h3>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: '1.75' }}>
              You may opt out of this arbitration agreement by sending written notice to legal@gruby.app within thirty (30) days of first accepting these Terms. Your notice must include your name, address, and a clear statement that you wish to opt out of arbitration.
            </p>

            <h3 className="text-xl sm:text-2xl font-semibold mt-8 sm:mt-6 mb-4 sm:mb-3" style={{ lineHeight: '1.4' }}>10.5 Arbitration Procedures</h3>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: '1.75' }}>
              Arbitration shall take place in the county of your residence or, at your election, via telephone, video conference, or written submissions. The arbitrator shall have exclusive authority to resolve all disputes arising out of or relating to these Terms, including the arbitrability of any dispute and the formation, enforceability, or scope of this arbitration agreement.
            </p>
          </section>

          <section className="mb-10 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl font-semibold mt-10 sm:mt-8 mb-6 sm:mb-4" style={{ lineHeight: '1.3' }}>11. GOVERNING LAW AND VENUE</h2>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: '1.75' }}>
              These Terms shall be governed by and construed in accordance with the laws of the State of Illinois, United States, without regard to its conflict of law provisions. To the extent that any lawsuit or court proceeding is permitted hereunder, you and Gruby agree to submit to the exclusive personal jurisdiction of the state and federal courts located in Rock Island County, Illinois.
            </p>
          </section>

          <section className="mb-10 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl font-semibold mt-10 sm:mt-8 mb-6 sm:mb-4" style={{ lineHeight: '1.3' }}>12. TERMINATION</h2>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: '1.75' }}>
              We may terminate or suspend your account and access to the Service immediately, without prior notice or liability, for any reason, including if you breach these Terms. Upon termination, your right to use the Service ceases immediately. You may terminate your account at any time by discontinuing use of the Service and deleting your account through the application settings.
            </p>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: '1.75' }}>
              The following provisions shall survive termination: Sections 4 (User-Generated Content, to the extent of licenses granted), 5 (Intellectual Property Rights), 7 (Disclaimer of Warranties), 8 (Limitation of Liability), 9 (Indemnification), 10 (Binding Arbitration and Class Action Waiver), 11 (Governing Law and Venue), and 14 (General Provisions).
            </p>
          </section>

          <section className="mb-10 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl font-semibold mt-10 sm:mt-8 mb-6 sm:mb-4" style={{ lineHeight: '1.3' }}>13. APPLE APP STORE ADDITIONAL TERMS</h2>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: '1.75' }}>
              If you access the Service through the Apple App Store, the following additional terms apply:
            </p>
            <ul className="list-disc list-inside mb-6 sm:mb-4 space-y-3 sm:space-y-2 ml-4" style={{ lineHeight: '1.75' }}>
              <li>(a) These Terms are between you and Gruby only, and not with Apple. Gruby, not Apple, is solely responsible for the Service and its content.</li>
              <li>(b) Apple has no obligation to provide any maintenance or support services for the Service.</li>
              <li>(c) In the event of any failure of the Service to conform to applicable warranties, you may notify Apple, and Apple will refund any applicable purchase price. Apple has no other warranty obligation with respect to the Service.</li>
              <li>(d) Apple is not responsible for addressing any claims by you or third parties relating to the Service, including product liability claims, claims that the Service fails to conform to legal or regulatory requirements, or claims arising under consumer protection or similar legislation.</li>
              <li>(e) In the event of any third-party claim that the Service infringes a third party's intellectual property rights, Gruby, not Apple, shall be solely responsible for the investigation, defense, settlement, and discharge of such claim.</li>
              <li>(f) Apple and its subsidiaries are third-party beneficiaries of these Terms, and upon your acceptance, Apple will have the right to enforce these Terms against you as a third-party beneficiary.</li>
            </ul>
          </section>

          <section className="mb-10 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl font-semibold mt-10 sm:mt-8 mb-6 sm:mb-4" style={{ lineHeight: '1.3' }}>14. GENERAL PROVISIONS</h2>
            
            <h3 className="text-xl sm:text-2xl font-semibold mt-8 sm:mt-6 mb-4 sm:mb-3" style={{ lineHeight: '1.4' }}>14.1 Entire Agreement</h3>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: '1.75' }}>
              These Terms, together with the Privacy Policy, constitute the entire agreement between you and Gruby regarding the Service and supersede all prior agreements, understandings, and communications.
            </p>

            <h3 className="text-xl sm:text-2xl font-semibold mt-8 sm:mt-6 mb-4 sm:mb-3" style={{ lineHeight: '1.4' }}>14.2 Severability</h3>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: '1.75' }}>
              If any provision of these Terms is found to be unenforceable or invalid, that provision shall be modified to the minimum extent necessary to make it enforceable, or if modification is not possible, severed from these Terms without affecting the validity and enforceability of the remaining provisions.
            </p>

            <h3 className="text-xl sm:text-2xl font-semibold mt-8 sm:mt-6 mb-4 sm:mb-3" style={{ lineHeight: '1.4' }}>14.3 Waiver</h3>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: '1.75' }}>
              No waiver of any term shall be deemed a further or continuing waiver of such term or any other term. Our failure to assert any right or provision under these Terms shall not constitute a waiver of such right or provision.
            </p>

            <h3 className="text-xl sm:text-2xl font-semibold mt-8 sm:mt-6 mb-4 sm:mb-3" style={{ lineHeight: '1.4' }}>14.4 Assignment</h3>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: '1.75' }}>
              You may not assign or transfer these Terms or your rights hereunder without our prior written consent. We may assign these Terms without restriction.
            </p>

            <h3 className="text-xl sm:text-2xl font-semibold mt-8 sm:mt-6 mb-4 sm:mb-3" style={{ lineHeight: '1.4' }}>14.5 Force Majeure</h3>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: '1.75' }}>
              Gruby shall not be liable for any failure or delay in performance resulting from causes beyond our reasonable control, including but not limited to acts of God, natural disasters, war, terrorism, labor disputes, government actions, or failure of third-party services.
            </p>

            <h3 className="text-xl sm:text-2xl font-semibold mt-8 sm:mt-6 mb-4 sm:mb-3" style={{ lineHeight: '1.4' }}>14.6 Notices</h3>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: '1.75' }}>
              We may provide notices to you via email, in-app notifications, or by posting on the Service. You may contact us at legal@gruby.app.
            </p>
          </section>

          <section className="mb-10 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl font-semibold mt-10 sm:mt-8 mb-6 sm:mb-4" style={{ lineHeight: '1.3' }}>15. CONTACT INFORMATION</h2>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: '1.75' }}>
              If you have questions about these Terms of Service, please contact us:
            </p>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: '1.75' }}>
              <strong>Gruby Legal Department</strong><br />
              Email: <a href="mailto:legal@gruby.app" className="text-blue-600 hover:underline">legal@gruby.app</a>
            </p>
          </section>
    </DocsLayout>
  );
}
