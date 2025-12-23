import type { Metadata } from "next";
import { DocsLayout } from "@/components/DocsLayout";

export const metadata: Metadata = {
  title: "Content Ownership and Licensing | Gruby",
  description: "Gruby Content Ownership and Licensing Terms - Effective December 22, 2025",
};

export default function ContentLicensingPage() {
  return (
    <DocsLayout title="Content Licensing" currentPath="/content-licensing">
          <h1
            className="mb-6 font-semibold sm:mb-4"
            style={{
              fontSize: "clamp(1.875rem, 4vw + 1rem, 3rem)",
              lineHeight: "1.2",
            }}
          >
            CONTENT OWNERSHIP AND LICENSING
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
            This Content Ownership and Licensing document explains how content is owned, licensed, and managed on the Gruby platform. It covers your rights to content you create, the licenses you grant to Gruby and other users, and how we handle intellectual property.
          </p>

          <section className="mb-10 sm:mb-8">
            <h2
              className="mb-6 mt-10 font-semibold sm:mb-4 sm:mt-8"
              style={{
                fontSize: "clamp(1.5rem, 2.5vw + 0.75rem, 1.875rem)",
                lineHeight: "1.3",
              }}
            >
              1. YOUR CONTENT OWNERSHIP
            </h2>

            <h3
              className="mb-4 mt-8 font-semibold sm:mb-3 sm:mt-6"
              style={{
                fontSize: "clamp(1.25rem, 2vw + 0.5rem, 1.5rem)",
                lineHeight: "1.4",
              }}
            >
              1.1 You Own Your Content
            </h3>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              You retain full ownership of all content you create and upload to Gruby (&quot;Your Content&quot;), including:
            </p>
            <ul
              className="mb-6 list-disc pl-6 sm:mb-4"
              style={{ lineHeight: "1.75" }}
            >
              <li className="mb-2">Original recipes you create</li>
              <li className="mb-2">Photographs and images you take</li>
              <li className="mb-2">Videos you record</li>
              <li className="mb-2">Reviews, comments, and ratings</li>
              <li className="mb-2">Stories you post</li>
              <li className="mb-2">Recipe collections you curate</li>
              <li className="mb-2">Profile information and biographical content</li>
            </ul>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              <strong>Gruby does not claim ownership of Your Content.</strong> The intellectual property rights in your original content remain yours.
            </p>

            <h3
              className="mb-4 mt-8 font-semibold sm:mb-3 sm:mt-6"
              style={{
                fontSize: "clamp(1.25rem, 2vw + 0.5rem, 1.5rem)",
                lineHeight: "1.4",
              }}
            >
              1.2 Requirements for Your Content
            </h3>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              By uploading content, you represent and warrant that:
            </p>
            <ul
              className="mb-6 list-disc pl-6 sm:mb-4"
              style={{ lineHeight: "1.75" }}
            >
              <li className="mb-2">You own or have the necessary rights, licenses, and permissions to share the content</li>
              <li className="mb-2">Your content does not infringe any third party&apos;s intellectual property rights</li>
              <li className="mb-2">You have obtained necessary consents from any identifiable individuals in your content</li>
              <li className="mb-2">Your content complies with our Community Guidelines and applicable laws</li>
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
              2. LICENSE TO GRUBY
            </h2>

            <h3
              className="mb-4 mt-8 font-semibold sm:mb-3 sm:mt-6"
              style={{
                fontSize: "clamp(1.25rem, 2vw + 0.5rem, 1.5rem)",
                lineHeight: "1.4",
              }}
            >
              2.1 License Grant
            </h3>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              By uploading Your Content to Gruby, you grant us a:
            </p>
            <ul
              className="mb-6 list-disc pl-6 sm:mb-4"
              style={{ lineHeight: "1.75" }}
            >
              <li className="mb-2"><strong>Non-exclusive:</strong> You can still use, license, and share your content elsewhere</li>
              <li className="mb-2"><strong>Worldwide:</strong> Applies globally to match our service availability</li>
              <li className="mb-2"><strong>Royalty-free:</strong> We don&apos;t pay you for this license (the platform is free to use)</li>
              <li className="mb-2"><strong>Sublicensable:</strong> We can authorize service providers to help us display your content</li>
              <li className="mb-2"><strong>Transferable:</strong> In the event of a business transfer, this license transfers with the business</li>
            </ul>

            <h3
              className="mb-4 mt-8 font-semibold sm:mb-3 sm:mt-6"
              style={{
                fontSize: "clamp(1.25rem, 2vw + 0.5rem, 1.5rem)",
                lineHeight: "1.4",
              }}
            >
              2.2 What This License Allows
            </h3>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              This license allows Gruby to:
            </p>
            <ul
              className="mb-6 list-disc pl-6 sm:mb-4"
              style={{ lineHeight: "1.75" }}
            >
              <li className="mb-2">Display your content on the platform</li>
              <li className="mb-2">Store your content on our servers</li>
              <li className="mb-2">Create technical copies necessary for the service (backups, caching)</li>
              <li className="mb-2">Resize, compress, or reformat images/videos for optimal display</li>
              <li className="mb-2">Display your content in search results and recommendations</li>
              <li className="mb-2">Feature your content in the community feed</li>
              <li className="mb-2">Use your content in promotional materials for Gruby (with your name attributed)</li>
              <li className="mb-2">Enable other users to interact with your content (save, share within the app, comment)</li>
            </ul>

            <h3
              className="mb-4 mt-8 font-semibold sm:mb-3 sm:mt-6"
              style={{
                fontSize: "clamp(1.25rem, 2vw + 0.5rem, 1.5rem)",
                lineHeight: "1.4",
              }}
            >
              2.3 Duration of License
            </h3>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              This license continues until:
            </p>
            <ul
              className="mb-6 list-disc pl-6 sm:mb-4"
              style={{ lineHeight: "1.75" }}
            >
              <li className="mb-2">You delete the specific content, OR</li>
              <li className="mb-2">You delete your account</li>
            </ul>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              <strong>Exception:</strong> The license continues for content that has been saved, shared, or copied by other users, but only for that specific content in those users&apos; accounts.
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
              3. LICENSE TO OTHER USERS
            </h2>

            <h3
              className="mb-4 mt-8 font-semibold sm:mb-3 sm:mt-6"
              style={{
                fontSize: "clamp(1.25rem, 2vw + 0.5rem, 1.5rem)",
                lineHeight: "1.4",
              }}
            >
              3.1 Public Content
            </h3>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              When you make content public, you grant other Gruby users a license to:
            </p>
            <ul
              className="mb-6 list-disc pl-6 sm:mb-4"
              style={{ lineHeight: "1.75" }}
            >
              <li className="mb-2">View your content</li>
              <li className="mb-2">Save your recipes to their own collections</li>
              <li className="mb-2">Share your content within the Gruby app</li>
              <li className="mb-2">Comment on and rate your content</li>
              <li className="mb-2">Use your recipes for personal, non-commercial purposes</li>
            </ul>

            <h3
              className="mb-4 mt-8 font-semibold sm:mb-3 sm:mt-6"
              style={{
                fontSize: "clamp(1.25rem, 2vw + 0.5rem, 1.5rem)",
                lineHeight: "1.4",
              }}
            >
              3.2 What Users Cannot Do
            </h3>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              Other users may NOT:
            </p>
            <ul
              className="mb-6 list-disc pl-6 sm:mb-4"
              style={{ lineHeight: "1.75" }}
            >
              <li className="mb-2">Claim your recipes, photos, or content as their own</li>
              <li className="mb-2">Use your content for commercial purposes without your permission</li>
              <li className="mb-2">Remove attribution from your content</li>
              <li className="mb-2">Redistribute your content outside of Gruby without permission</li>
              <li className="mb-2">Create derivative works from your content without attribution</li>
            </ul>

            <h3
              className="mb-4 mt-8 font-semibold sm:mb-3 sm:mt-6"
              style={{
                fontSize: "clamp(1.25rem, 2vw + 0.5rem, 1.5rem)",
                lineHeight: "1.4",
              }}
            >
              3.3 Circle and Gathering Content
            </h3>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              Content shared within Circles or Gatherings is visible to members/participants and subject to the same user licenses, limited to that specific group.
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
              4. RECIPE-SPECIFIC CONSIDERATIONS
            </h2>

            <h3
              className="mb-4 mt-8 font-semibold sm:mb-3 sm:mt-6"
              style={{
                fontSize: "clamp(1.25rem, 2vw + 0.5rem, 1.5rem)",
                lineHeight: "1.4",
              }}
            >
              4.1 Recipe Copyright Law
            </h3>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              Under U.S. copyright law:
            </p>
            <ul
              className="mb-6 list-disc pl-6 sm:mb-4"
              style={{ lineHeight: "1.75" }}
            >
              <li className="mb-2"><strong>Ingredient lists</strong> are generally NOT copyrightable (they are facts)</li>
              <li className="mb-2"><strong>Instructions and descriptions</strong> CAN be copyrighted if they contain creative expression</li>
              <li className="mb-2"><strong>Photos and videos</strong> ARE copyrightable</li>
              <li className="mb-2"><strong>The overall compilation</strong> of a recipe with creative descriptions, tips, and presentation may be protected</li>
            </ul>

            <h3
              className="mb-4 mt-8 font-semibold sm:mb-3 sm:mt-6"
              style={{
                fontSize: "clamp(1.25rem, 2vw + 0.5rem, 1.5rem)",
                lineHeight: "1.4",
              }}
            >
              4.2 Adapting Recipes
            </h3>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              When adapting or being inspired by someone else&apos;s recipe:
            </p>
            <ul
              className="mb-6 list-disc pl-6 sm:mb-4"
              style={{ lineHeight: "1.75" }}
            >
              <li className="mb-2">Write instructions in your own words</li>
              <li className="mb-2">Add your own creative expression and tips</li>
              <li className="mb-2">Use your own photos</li>
              <li className="mb-2">Give attribution if inspired by a specific source</li>
              <li className="mb-2">Do NOT copy instructions verbatim from copyrighted sources</li>
            </ul>

            <h3
              className="mb-4 mt-8 font-semibold sm:mb-3 sm:mt-6"
              style={{
                fontSize: "clamp(1.25rem, 2vw + 0.5rem, 1.5rem)",
                lineHeight: "1.4",
              }}
            >
              4.3 Attribution
            </h3>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              We encourage proper attribution when:
            </p>
            <ul
              className="mb-6 list-disc pl-6 sm:mb-4"
              style={{ lineHeight: "1.75" }}
            >
              <li className="mb-2">Adapting a recipe from a specific cookbook, blog, or creator</li>
              <li className="mb-2">Importing a recipe from a video (YouTube, TikTok, Instagram)</li>
              <li className="mb-2">Sharing a family recipe that came from someone else</li>
            </ul>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              Attribution builds trust in the community and respects other creators.
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
              5. PHOTOS AND VIDEOS
            </h2>

            <h3
              className="mb-4 mt-8 font-semibold sm:mb-3 sm:mt-6"
              style={{
                fontSize: "clamp(1.25rem, 2vw + 0.5rem, 1.5rem)",
                lineHeight: "1.4",
              }}
            >
              5.1 Your Original Media
            </h3>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              Photos and videos you take are your copyrighted works. By uploading them, you:
            </p>
            <ul
              className="mb-6 list-disc pl-6 sm:mb-4"
              style={{ lineHeight: "1.75" }}
            >
              <li className="mb-2">Retain copyright ownership</li>
              <li className="mb-2">Grant Gruby the license described in Section 2</li>
              <li className="mb-2">Confirm you have rights to any recognizable individuals shown</li>
            </ul>

            <h3
              className="mb-4 mt-8 font-semibold sm:mb-3 sm:mt-6"
              style={{
                fontSize: "clamp(1.25rem, 2vw + 0.5rem, 1.5rem)",
                lineHeight: "1.4",
              }}
            >
              5.2 Stock Photos (Pexels)
            </h3>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              When you use stock photos from Pexels through our integration:
            </p>
            <ul
              className="mb-6 list-disc pl-6 sm:mb-4"
              style={{ lineHeight: "1.75" }}
            >
              <li className="mb-2">These photos are licensed under the Pexels license</li>
              <li className="mb-2">You may use them for your recipes on Gruby</li>
              <li className="mb-2">The original photographer retains copyright</li>
              <li className="mb-2">We display appropriate attribution</li>
            </ul>

            <h3
              className="mb-4 mt-8 font-semibold sm:mb-3 sm:mt-6"
              style={{
                fontSize: "clamp(1.25rem, 2vw + 0.5rem, 1.5rem)",
                lineHeight: "1.4",
              }}
            >
              5.3 Third-Party Photos
            </h3>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              You may NOT upload photos or videos that:
            </p>
            <ul
              className="mb-6 list-disc pl-6 sm:mb-4"
              style={{ lineHeight: "1.75" }}
            >
              <li className="mb-2">You downloaded from other websites without permission</li>
              <li className="mb-2">Belong to other Gruby users</li>
              <li className="mb-2">Are copyrighted and you don&apos;t have a license to use</li>
              <li className="mb-2">Contain copyrighted music (in videos) without authorization</li>
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
              6. IMPORTED CONTENT
            </h2>

            <h3
              className="mb-4 mt-8 font-semibold sm:mb-3 sm:mt-6"
              style={{
                fontSize: "clamp(1.25rem, 2vw + 0.5rem, 1.5rem)",
                lineHeight: "1.4",
              }}
            >
              6.1 Video Recipe Imports
            </h3>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              When importing recipes from YouTube, TikTok, or Instagram:
            </p>
            <ul
              className="mb-6 list-disc pl-6 sm:mb-4"
              style={{ lineHeight: "1.75" }}
            >
              <li className="mb-2">We extract recipe information from publicly available content</li>
              <li className="mb-2">The original creator retains all rights to the video</li>
              <li className="mb-2">Attribution to the original creator is maintained</li>
              <li className="mb-2">You should not claim imported recipes as your own original work</li>
              <li className="mb-2">Imported content is subject to the original platform&apos;s terms</li>
            </ul>

            <h3
              className="mb-4 mt-8 font-semibold sm:mb-3 sm:mt-6"
              style={{
                fontSize: "clamp(1.25rem, 2vw + 0.5rem, 1.5rem)",
                lineHeight: "1.4",
              }}
            >
              6.2 OCR and Barcode Scans
            </h3>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              When scanning recipes or products:
            </p>
            <ul
              className="mb-6 list-disc pl-6 sm:mb-4"
              style={{ lineHeight: "1.75" }}
            >
              <li className="mb-2">Scanned text from copyrighted cookbooks should be rewritten in your own words</li>
              <li className="mb-2">Product information from barcodes is factual data</li>
              <li className="mb-2">Give attribution when adapting scanned recipes</li>
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
              7. AI-GENERATED CONTENT
            </h2>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              For recipes or content generated or modified by our AI features (Google Gemini):
            </p>
            <ul
              className="mb-6 list-disc pl-6 sm:mb-4"
              style={{ lineHeight: "1.75" }}
            >
              <li className="mb-2">AI-generated recipe suggestions are provided for your personal use</li>
              <li className="mb-2">You may adapt and save AI suggestions as your own recipes</li>
              <li className="mb-2">AI outputs may be based on patterns from many sources</li>
              <li className="mb-2">We recommend reviewing and personalizing AI suggestions before publishing</li>
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
              8. GRUBY INTELLECTUAL PROPERTY
            </h2>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              The following are owned by Gruby and protected by intellectual property laws:
            </p>
            <ul
              className="mb-6 list-disc pl-6 sm:mb-4"
              style={{ lineHeight: "1.75" }}
            >
              <li className="mb-2">The Gruby name, logo, and branding</li>
              <li className="mb-2">The Gruby application software and code</li>
              <li className="mb-2">App design, user interface, and user experience</li>
              <li className="mb-2">Original content created by Gruby</li>
              <li className="mb-2">Documentation and marketing materials</li>
            </ul>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              You may not use Gruby&apos;s intellectual property without our written permission.
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
              9. COPYRIGHT INFRINGEMENT
            </h2>

            <h3
              className="mb-4 mt-8 font-semibold sm:mb-3 sm:mt-6"
              style={{
                fontSize: "clamp(1.25rem, 2vw + 0.5rem, 1.5rem)",
                lineHeight: "1.4",
              }}
            >
              9.1 Reporting Infringement
            </h3>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              If you believe your copyright has been infringed on Gruby:
            </p>
            <ul
              className="mb-6 list-disc pl-6 sm:mb-4"
              style={{ lineHeight: "1.75" }}
            >
              <li className="mb-2">Submit a DMCA takedown notice (see our <a href="/dmca" className="text-[#222222] hover:underline">DMCA Policy</a>)</li>
              <li className="mb-2">Email <a href="mailto:dmca@gruby.app" className="text-[#222222] hover:underline">dmca@gruby.app</a></li>
            </ul>

            <h3
              className="mb-4 mt-8 font-semibold sm:mb-3 sm:mt-6"
              style={{
                fontSize: "clamp(1.25rem, 2vw + 0.5rem, 1.5rem)",
                lineHeight: "1.4",
              }}
            >
              9.2 Repeat Infringers
            </h3>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              We terminate accounts of users who repeatedly infringe copyrights in accordance with the DMCA.
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
              10. CONTENT REMOVAL
            </h2>

            <h3
              className="mb-4 mt-8 font-semibold sm:mb-3 sm:mt-6"
              style={{
                fontSize: "clamp(1.25rem, 2vw + 0.5rem, 1.5rem)",
                lineHeight: "1.4",
              }}
            >
              10.1 Your Rights
            </h3>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              You can delete your content at any time through the app. When you delete content:
            </p>
            <ul
              className="mb-6 list-disc pl-6 sm:mb-4"
              style={{ lineHeight: "1.75" }}
            >
              <li className="mb-2">It will be removed from your profile and our servers</li>
              <li className="mb-2">It may take up to 30 days to fully purge from backups</li>
              <li className="mb-2">Copies that other users saved will remain in their accounts</li>
            </ul>

            <h3
              className="mb-4 mt-8 font-semibold sm:mb-3 sm:mt-6"
              style={{
                fontSize: "clamp(1.25rem, 2vw + 0.5rem, 1.5rem)",
                lineHeight: "1.4",
              }}
            >
              10.2 Our Rights
            </h3>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              Gruby may remove content that:
            </p>
            <ul
              className="mb-6 list-disc pl-6 sm:mb-4"
              style={{ lineHeight: "1.75" }}
            >
              <li className="mb-2">Violates our Terms of Service or Community Guidelines</li>
              <li className="mb-2">Infringes intellectual property rights</li>
              <li className="mb-2">Is subject to a valid DMCA takedown notice</li>
              <li className="mb-2">Is illegal or promotes harmful activities</li>
              <li className="mb-2">Is reported and found to violate our policies</li>
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
              11. CHANGES TO THIS POLICY
            </h2>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              We may update this Content Ownership and Licensing document from time to time. Material changes will be communicated through the app or via email.
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
              12. CONTACT US
            </h2>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              If you have questions about content ownership or licensing, please contact us:
            </p>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              <strong>Gruby Legal Team</strong><br />
              Email: <a href="mailto:legal@gruby.app" className="text-[#222222] hover:underline">legal@gruby.app</a>
            </p>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              <strong>For Copyright Issues</strong><br />
              Email: <a href="mailto:dmca@gruby.app" className="text-[#222222] hover:underline">dmca@gruby.app</a>
            </p>
          </section>
    </DocsLayout>
  );
}
