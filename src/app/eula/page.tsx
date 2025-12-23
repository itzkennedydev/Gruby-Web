import type { Metadata } from "next";
import { DocsLayout } from "@/components/DocsLayout";

export const metadata: Metadata = {
  title: "End User License Agreement | Gruby",
  description: "Gruby End User License Agreement (EULA) - Effective December 22, 2025",
};

export default function EULAPage() {
  return (
    <DocsLayout title="EULA" currentPath="/eula">
          <h1
            className="mb-6 font-semibold sm:mb-4"
            style={{
              fontSize: "clamp(1.875rem, 4vw + 1rem, 3rem)",
              lineHeight: "1.2",
            }}
          >
            END USER LICENSE AGREEMENT
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
            PLEASE READ THIS END USER LICENSE AGREEMENT (&quot;EULA&quot; OR &quot;AGREEMENT&quot;) CAREFULLY BEFORE DOWNLOADING, INSTALLING, OR USING THE GRUBY APPLICATION. BY DOWNLOADING, INSTALLING, OR USING THE APPLICATION, YOU AGREE TO BE BOUND BY THE TERMS OF THIS AGREEMENT. IF YOU DO NOT AGREE TO THESE TERMS, DO NOT DOWNLOAD, INSTALL, OR USE THE APPLICATION.
          </p>

          <section className="mb-10 sm:mb-8">
            <h2
              className="mb-6 mt-10 font-semibold sm:mb-4 sm:mt-8"
              style={{
                fontSize: "clamp(1.5rem, 2.5vw + 0.75rem, 1.875rem)",
                lineHeight: "1.3",
              }}
            >
              1. GRANT OF LICENSE
            </h2>

            <h3
              className="mb-4 mt-8 font-semibold sm:mb-3 sm:mt-6"
              style={{
                fontSize: "clamp(1.25rem, 2vw + 0.5rem, 1.5rem)",
                lineHeight: "1.4",
              }}
            >
              1.1 License Grant
            </h3>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              Subject to your compliance with this Agreement, Gruby (&quot;Licensor,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) grants you a limited, non-exclusive, non-transferable, non-sublicensable, revocable license to download, install, and use the Gruby mobile application (the &quot;Application&quot;) on mobile devices that you own or control, solely for your personal, non-commercial use.
            </p>

            <h3
              className="mb-4 mt-8 font-semibold sm:mb-3 sm:mt-6"
              style={{
                fontSize: "clamp(1.25rem, 2vw + 0.5rem, 1.5rem)",
                lineHeight: "1.4",
              }}
            >
              1.2 Scope of License
            </h3>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              This license is limited to the Application as provided and does not include:
            </p>
            <ul
              className="mb-6 list-disc pl-6 sm:mb-4"
              style={{ lineHeight: "1.75" }}
            >
              <li className="mb-2">Any future versions, updates, or upgrades of the Application, which may be subject to additional or different terms</li>
              <li className="mb-2">Any third-party content, services, or integrations accessed through the Application</li>
              <li className="mb-2">Any source code, object code, or underlying technology of the Application</li>
              <li className="mb-2">Any intellectual property rights beyond the limited license expressly granted herein</li>
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
              2. LICENSE RESTRICTIONS
            </h2>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              You agree NOT to:
            </p>
            <ul
              className="mb-6 list-disc pl-6 sm:mb-4"
              style={{ lineHeight: "1.75" }}
            >
              <li className="mb-2">Copy, modify, adapt, translate, or create derivative works based on the Application</li>
              <li className="mb-2">Reverse engineer, disassemble, decompile, decode, or otherwise attempt to derive or access the source code of the Application</li>
              <li className="mb-2">Remove, alter, or obscure any copyright, trademark, or other proprietary notices from the Application</li>
              <li className="mb-2">Rent, lease, lend, sell, sublicense, assign, distribute, publish, transfer, or otherwise make the Application available to any third party</li>
              <li className="mb-2">Use the Application for any commercial purpose or for the benefit of any third party</li>
              <li className="mb-2">Use the Application in violation of any applicable laws, regulations, or third-party rights</li>
              <li className="mb-2">Use any robot, spider, crawler, scraper, or other automated means to access the Application or extract data</li>
              <li className="mb-2">Introduce viruses, Trojan horses, worms, logic bombs, or other malicious or technologically harmful material</li>
              <li className="mb-2">Attempt to gain unauthorized access to the Application, its servers, or any connected systems</li>
              <li className="mb-2">Circumvent, disable, or interfere with any security features of the Application</li>
              <li className="mb-2">Use the Application to send unsolicited communications (spam)</li>
              <li className="mb-2">Impersonate any person or entity or misrepresent your affiliation</li>
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
              3. INTELLECTUAL PROPERTY RIGHTS
            </h2>

            <h3
              className="mb-4 mt-8 font-semibold sm:mb-3 sm:mt-6"
              style={{
                fontSize: "clamp(1.25rem, 2vw + 0.5rem, 1.5rem)",
                lineHeight: "1.4",
              }}
            >
              3.1 Ownership
            </h3>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              The Application, including all content, features, functionality, design, graphics, logos, icons, images, audio clips, digital downloads, data compilations, and software, is owned by Gruby or its licensors and is protected by United States and international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.
            </p>

            <h3
              className="mb-4 mt-8 font-semibold sm:mb-3 sm:mt-6"
              style={{
                fontSize: "clamp(1.25rem, 2vw + 0.5rem, 1.5rem)",
                lineHeight: "1.4",
              }}
            >
              3.2 Trademarks
            </h3>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              &quot;Gruby,&quot; the Gruby logo, and all related names, logos, product and service names, designs, and slogans are trademarks of Gruby or its affiliates. You may not use these marks without our prior written permission. All other names, logos, product and service names, designs, and slogans are the trademarks of their respective owners.
            </p>

            <h3
              className="mb-4 mt-8 font-semibold sm:mb-3 sm:mt-6"
              style={{
                fontSize: "clamp(1.25rem, 2vw + 0.5rem, 1.5rem)",
                lineHeight: "1.4",
              }}
            >
              3.3 Reservation of Rights
            </h3>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              All rights not expressly granted to you in this Agreement are reserved by Gruby and its licensors. No license or right is granted to you by implication or otherwise under any patent, trademark, copyright, or other intellectual property right.
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
              4. USER CONTENT
            </h2>

            <h3
              className="mb-4 mt-8 font-semibold sm:mb-3 sm:mt-6"
              style={{
                fontSize: "clamp(1.25rem, 2vw + 0.5rem, 1.5rem)",
                lineHeight: "1.4",
              }}
            >
              4.1 Your Content
            </h3>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              You retain ownership of any content you create, upload, or share through the Application (&quot;User Content&quot;), including recipes, photographs, videos, comments, reviews, and other materials. By submitting User Content, you grant Gruby a worldwide, non-exclusive, royalty-free, sublicensable, and transferable license to use, reproduce, modify, adapt, publish, translate, create derivative works from, distribute, and display your User Content in connection with operating and providing the Application.
            </p>

            <h3
              className="mb-4 mt-8 font-semibold sm:mb-3 sm:mt-6"
              style={{
                fontSize: "clamp(1.25rem, 2vw + 0.5rem, 1.5rem)",
                lineHeight: "1.4",
              }}
            >
              4.2 Representations
            </h3>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              You represent and warrant that: (a) you own or have the necessary rights to your User Content; (b) your User Content does not infringe, misappropriate, or violate any third-party rights; and (c) your User Content complies with our Community Guidelines and all applicable laws.
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
              5. THIRD-PARTY SERVICES AND CONTENT
            </h2>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              The Application may integrate with or provide access to third-party services, including but not limited to:
            </p>
            <ul
              className="mb-6 list-disc pl-6 sm:mb-4"
              style={{ lineHeight: "1.75" }}
            >
              <li className="mb-2">Firebase (authentication, database, storage)</li>
              <li className="mb-2">Google Gemini AI (AI features and recommendations)</li>
              <li className="mb-2">Kroger API (grocery pricing and product data)</li>
              <li className="mb-2">Apple Sign-In and Google Sign-In (authentication)</li>
              <li className="mb-2">Video platforms (YouTube, TikTok, Instagram for recipe import)</li>
              <li className="mb-2">Pexels (stock photos)</li>
              <li className="mb-2">Expo (push notifications)</li>
            </ul>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              Your use of these third-party services is subject to their respective terms and privacy policies. We are not responsible for the content, functionality, accuracy, or practices of any third-party services.
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
              6. DEVICE PERMISSIONS
            </h2>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              The Application may request access to certain features or data on your device, including:
            </p>
            <ul
              className="mb-6 list-disc pl-6 sm:mb-4"
              style={{ lineHeight: "1.75" }}
            >
              <li className="mb-2"><strong>Camera:</strong> To take photos and videos of recipes and for barcode/OCR scanning</li>
              <li className="mb-2"><strong>Media Library/Photo Library:</strong> To upload existing photos for recipes and profiles</li>
              <li className="mb-2"><strong>Location:</strong> To find nearby stores, provide localized pricing, and enable Gathering discovery</li>
              <li className="mb-2"><strong>Notifications:</strong> To send push notifications for messages, reminders, and alerts</li>
              <li className="mb-2"><strong>Storage:</strong> To cache data and improve performance</li>
              <li className="mb-2"><strong>Network:</strong> To access the internet and sync data</li>
            </ul>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              You may manage these permissions through your device settings. Disabling certain permissions may limit the functionality of the Application.
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
              7. UPDATES AND MODIFICATIONS
            </h2>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              We may from time to time develop and provide updates, upgrades, bug fixes, patches, and other modifications to the Application (&quot;Updates&quot;). Updates may be automatically installed without prior notice or consent. You agree that we have no obligation to provide any Updates or to continue to provide or enable any particular features or functionality.
            </p>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              We reserve the right to modify, suspend, or discontinue the Application (or any part thereof) at any time with or without notice. We will not be liable to you or any third party for any such modification, suspension, or discontinuance.
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
              8. DISCLAIMER OF WARRANTIES
            </h2>
            <p className="mb-6 font-semibold sm:mb-4" style={{ lineHeight: "1.75" }}>
              THE APPLICATION IS PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, GRUBY DISCLAIMS ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO:
            </p>
            <ul
              className="mb-6 list-disc pl-6 sm:mb-4"
              style={{ lineHeight: "1.75" }}
            >
              <li className="mb-2">IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, AND NON-INFRINGEMENT</li>
              <li className="mb-2">WARRANTIES THAT THE APPLICATION WILL MEET YOUR REQUIREMENTS OR EXPECTATIONS</li>
              <li className="mb-2">WARRANTIES THAT THE APPLICATION WILL BE UNINTERRUPTED, TIMELY, SECURE, OR ERROR-FREE</li>
              <li className="mb-2">WARRANTIES REGARDING THE ACCURACY, RELIABILITY, OR COMPLETENESS OF ANY CONTENT, INCLUDING RECIPES, NUTRITIONAL INFORMATION, AND GROCERY PRICING</li>
              <li className="mb-2">WARRANTIES THAT DEFECTS WILL BE CORRECTED</li>
              <li className="mb-2">WARRANTIES THAT THE APPLICATION IS FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS</li>
            </ul>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              RECIPES, NUTRITIONAL INFORMATION, AND DIETARY RECOMMENDATIONS PROVIDED THROUGH THE APPLICATION ARE FOR INFORMATIONAL PURPOSES ONLY AND ARE NOT INTENDED AS MEDICAL OR DIETARY ADVICE. ALWAYS CONSULT A QUALIFIED HEALTHCARE PROFESSIONAL BEFORE MAKING DIETARY CHANGES.
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
              9. LIMITATION OF LIABILITY
            </h2>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL GRUBY, ITS OFFICERS, DIRECTORS, EMPLOYEES, AGENTS, PARTNERS, SUPPLIERS, OR AFFILIATES BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, PUNITIVE, OR EXEMPLARY DAMAGES, INCLUDING BUT NOT LIMITED TO:
            </p>
            <ul
              className="mb-6 list-disc pl-6 sm:mb-4"
              style={{ lineHeight: "1.75" }}
            >
              <li className="mb-2">Damages for loss of profits, goodwill, use, data, or other intangible losses</li>
              <li className="mb-2">Damages arising from your access to, use of, or inability to use the Application</li>
              <li className="mb-2">Damages arising from any errors, inaccuracies, or omissions in recipes, nutritional information, or pricing</li>
              <li className="mb-2">Damages arising from personal injury or property damage resulting from your use of the Application</li>
              <li className="mb-2">Damages arising from unauthorized access to or alteration of your data</li>
              <li className="mb-2">Damages arising from any third-party conduct or content</li>
            </ul>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              IN NO EVENT SHALL GRUBY&apos;S TOTAL LIABILITY TO YOU EXCEED THE GREATER OF: (i) FIFTY DOLLARS ($50.00 USD) OR (ii) THE AMOUNTS PAID BY YOU TO GRUBY IN THE TWELVE (12) MONTHS PRECEDING THE CLAIM.
            </p>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              SOME JURISDICTIONS DO NOT ALLOW THE EXCLUSION OR LIMITATION OF CERTAIN DAMAGES, SO SOME OF THE ABOVE LIMITATIONS MAY NOT APPLY TO YOU.
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
              10. INDEMNIFICATION
            </h2>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              You agree to defend, indemnify, and hold harmless Gruby and its officers, directors, employees, contractors, agents, licensors, suppliers, successors, and assigns from and against any claims, liabilities, damages, judgments, awards, losses, costs, expenses, or fees (including reasonable attorneys&apos; fees) arising out of or relating to: (a) your violation of this Agreement; (b) your User Content; (c) your use of the Application; (d) your violation of any third-party rights; or (e) your violation of any applicable laws.
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
              11. TERMINATION
            </h2>

            <h3
              className="mb-4 mt-8 font-semibold sm:mb-3 sm:mt-6"
              style={{
                fontSize: "clamp(1.25rem, 2vw + 0.5rem, 1.5rem)",
                lineHeight: "1.4",
              }}
            >
              11.1 Termination by You
            </h3>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              You may terminate this Agreement at any time by deleting the Application from all devices on which you have installed it and deleting your account.
            </p>

            <h3
              className="mb-4 mt-8 font-semibold sm:mb-3 sm:mt-6"
              style={{
                fontSize: "clamp(1.25rem, 2vw + 0.5rem, 1.5rem)",
                lineHeight: "1.4",
              }}
            >
              11.2 Termination by Us
            </h3>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              We may terminate or suspend your license immediately, without prior notice or liability, for any reason, including if you breach any provision of this Agreement. Upon termination, your right to use the Application will cease immediately.
            </p>

            <h3
              className="mb-4 mt-8 font-semibold sm:mb-3 sm:mt-6"
              style={{
                fontSize: "clamp(1.25rem, 2vw + 0.5rem, 1.5rem)",
                lineHeight: "1.4",
              }}
            >
              11.3 Effect of Termination
            </h3>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              Upon termination: (a) all rights and licenses granted to you will terminate; (b) you must cease all use of the Application; (c) you must delete the Application from all devices; and (d) Sections 2, 3, 8, 9, 10, 12, 13, and 14 shall survive termination.
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
              12. GOVERNING LAW AND DISPUTE RESOLUTION
            </h2>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              This Agreement shall be governed by and construed in accordance with the laws of the State of Illinois, United States, without regard to its conflict of law provisions. Any dispute arising from or relating to this Agreement or the Application shall be resolved through binding arbitration administered by the American Arbitration Association in accordance with its Consumer Arbitration Rules.
            </p>
            <p className="mb-6 font-semibold sm:mb-4" style={{ lineHeight: "1.75" }}>
              YOU AND GRUBY AGREE THAT EACH MAY BRING CLAIMS AGAINST THE OTHER ONLY IN YOUR OR ITS INDIVIDUAL CAPACITY AND NOT AS A PLAINTIFF OR CLASS MEMBER IN ANY PURPORTED CLASS, COLLECTIVE, OR REPRESENTATIVE PROCEEDING.
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
              13. APPLE APP STORE ADDITIONAL TERMS
            </h2>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              If you download the Application from the Apple App Store, the following additional terms apply:
            </p>
            <ul
              className="mb-6 list-disc pl-6 sm:mb-4"
              style={{ lineHeight: "1.75" }}
            >
              <li className="mb-2">This Agreement is between you and Gruby only, and not with Apple Inc. (&quot;Apple&quot;). Gruby, not Apple, is solely responsible for the Application.</li>
              <li className="mb-2">Apple has no obligation to provide any maintenance or support services for the Application.</li>
              <li className="mb-2">In the event of any failure of the Application to conform to applicable warranties, you may notify Apple, and Apple will refund any applicable purchase price. Apple has no other warranty obligation with respect to the Application.</li>
              <li className="mb-2">Apple is not responsible for addressing any claims by you or third parties relating to the Application.</li>
              <li className="mb-2">In the event of any third-party claim that the Application infringes a third party&apos;s intellectual property rights, Gruby, not Apple, shall be solely responsible for the investigation, defense, settlement, and discharge of such claim.</li>
              <li className="mb-2">Apple and its subsidiaries are third-party beneficiaries of this Agreement. Upon your acceptance of this Agreement, Apple will have the right to enforce this Agreement against you as a third-party beneficiary.</li>
              <li className="mb-2">You represent that you are not located in a country subject to a U.S. Government embargo or designated as a &quot;terrorist supporting&quot; country, and you are not on any U.S. Government list of prohibited or restricted parties.</li>
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
              14. GENERAL PROVISIONS
            </h2>

            <h3
              className="mb-4 mt-8 font-semibold sm:mb-3 sm:mt-6"
              style={{
                fontSize: "clamp(1.25rem, 2vw + 0.5rem, 1.5rem)",
                lineHeight: "1.4",
              }}
            >
              14.1 Entire Agreement
            </h3>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              This Agreement, together with our Terms of Service and Privacy Policy, constitutes the entire agreement between you and Gruby regarding the Application and supersedes all prior agreements and understandings.
            </p>

            <h3
              className="mb-4 mt-8 font-semibold sm:mb-3 sm:mt-6"
              style={{
                fontSize: "clamp(1.25rem, 2vw + 0.5rem, 1.5rem)",
                lineHeight: "1.4",
              }}
            >
              14.2 Amendments
            </h3>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              We reserve the right to modify this Agreement at any time. We will notify you of material changes by posting the updated Agreement in the Application or by other means. Your continued use of the Application after the effective date of the revised Agreement constitutes acceptance of the changes.
            </p>

            <h3
              className="mb-4 mt-8 font-semibold sm:mb-3 sm:mt-6"
              style={{
                fontSize: "clamp(1.25rem, 2vw + 0.5rem, 1.5rem)",
                lineHeight: "1.4",
              }}
            >
              14.3 Severability
            </h3>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              If any provision of this Agreement is found to be unenforceable or invalid, that provision shall be modified to the minimum extent necessary to make it enforceable, or if modification is not possible, severed from this Agreement without affecting the remaining provisions.
            </p>

            <h3
              className="mb-4 mt-8 font-semibold sm:mb-3 sm:mt-6"
              style={{
                fontSize: "clamp(1.25rem, 2vw + 0.5rem, 1.5rem)",
                lineHeight: "1.4",
              }}
            >
              14.4 Waiver
            </h3>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              Our failure to enforce any right or provision of this Agreement shall not constitute a waiver of such right or provision.
            </p>

            <h3
              className="mb-4 mt-8 font-semibold sm:mb-3 sm:mt-6"
              style={{
                fontSize: "clamp(1.25rem, 2vw + 0.5rem, 1.5rem)",
                lineHeight: "1.4",
              }}
            >
              14.5 Assignment
            </h3>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              You may not assign or transfer this Agreement or your rights hereunder without our prior written consent. We may assign this Agreement without restriction.
            </p>

            <h3
              className="mb-4 mt-8 font-semibold sm:mb-3 sm:mt-6"
              style={{
                fontSize: "clamp(1.25rem, 2vw + 0.5rem, 1.5rem)",
                lineHeight: "1.4",
              }}
            >
              14.6 Export Compliance
            </h3>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              You agree to comply with all applicable export and re-export control laws and regulations, including the Export Administration Regulations maintained by the U.S. Department of Commerce.
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
              15. CONTACT INFORMATION
            </h2>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              If you have questions about this End User License Agreement, please contact us:
            </p>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              <strong>Gruby Legal Department</strong><br />
              Email: <a href="mailto:legal@gruby.app" className="text-[#222222] hover:underline">legal@gruby.app</a>
            </p>
          </section>

          <div
            className="mt-12 rounded-lg bg-gray-50 p-6 sm:mt-10 sm:p-8"
            style={{ lineHeight: "1.75" }}
          >
            <p className="mb-4 font-semibold">
              BY DOWNLOADING, INSTALLING, OR USING THE GRUBY APPLICATION, YOU ACKNOWLEDGE THAT YOU HAVE READ, UNDERSTOOD, AND AGREE TO BE BOUND BY THIS END USER LICENSE AGREEMENT.
            </p>
          </div>
    </DocsLayout>
  );
}
