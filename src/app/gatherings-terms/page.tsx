import type { Metadata } from "next";
import { DocsLayout } from "@/components/DocsLayout";

export const metadata: Metadata = {
  title: "Gatherings and Cost-Splitting Terms | Gruby",
  description: "Gruby Gatherings and Cost-Splitting Terms - Effective December 22, 2025",
};

export default function GatheringsTermsPage() {
  return (
    <DocsLayout title="Gatherings Terms" currentPath="/gatherings-terms">
          <h1
            className="mb-6 font-semibold sm:mb-4"
            style={{
              fontSize: "clamp(1.875rem, 4vw + 1rem, 3rem)",
              lineHeight: "1.2",
            }}
          >
            GATHERINGS AND COST-SPLITTING TERMS
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
            This document governs your use of Gatherings (collaborative cooking events) and the cost-splitting features within the Gruby application. By creating or participating in a Gathering or using cost-splitting features, you agree to these terms.
          </p>

          <div
            className="mb-10 rounded-lg bg-yellow-50 p-6"
            style={{ lineHeight: "1.75" }}
          >
            <p className="mb-2 font-semibold">Important Notice</p>
            <p>
              Gruby provides cost-splitting CALCULATIONS and TRACKING tools only. We do NOT process payments, transfer money, or act as a financial intermediary. All actual money transfers between users must occur outside of the Gruby app using payment methods of your choice.
            </p>
          </div>

          <section className="mb-10 sm:mb-8">
            <h2
              className="mb-6 mt-10 font-semibold sm:mb-4 sm:mt-8"
              style={{
                fontSize: "clamp(1.5rem, 2.5vw + 0.75rem, 1.875rem)",
                lineHeight: "1.3",
              }}
            >
              1. GATHERINGS OVERVIEW
            </h2>

            <h3
              className="mb-4 mt-8 font-semibold sm:mb-3 sm:mt-6"
              style={{
                fontSize: "clamp(1.25rem, 2vw + 0.5rem, 1.5rem)",
                lineHeight: "1.4",
              }}
            >
              1.1 What are Gatherings?
            </h3>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              Gatherings are collaborative cooking events organized through Gruby. They allow users to:
            </p>
            <ul
              className="mb-6 list-disc pl-6 sm:mb-4"
              style={{ lineHeight: "1.75" }}
            >
              <li className="mb-2">Plan and organize group cooking events</li>
              <li className="mb-2">Invite friends and family to participate</li>
              <li className="mb-2">Coordinate shopping lists and ingredient contributions</li>
              <li className="mb-2">Calculate and track cost-splitting among participants</li>
              <li className="mb-2">Communicate through Gathering chat</li>
              <li className="mb-2">Share recipes and meal plans for the event</li>
            </ul>

            <h3
              className="mb-4 mt-8 font-semibold sm:mb-3 sm:mt-6"
              style={{
                fontSize: "clamp(1.25rem, 2vw + 0.5rem, 1.5rem)",
                lineHeight: "1.4",
              }}
            >
              1.2 Gathering Roles
            </h3>
            <ul
              className="mb-6 list-disc pl-6 sm:mb-4"
              style={{ lineHeight: "1.75" }}
            >
              <li className="mb-2"><strong>Host:</strong> The user who creates the Gathering. Has full control over settings, participants, and can delete the Gathering.</li>
              <li className="mb-2"><strong>Co-Host:</strong> Users designated by the Host with elevated permissions to manage the Gathering.</li>
              <li className="mb-2"><strong>Participant:</strong> Users who have accepted an invitation to join the Gathering.</li>
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
              2. CREATING AND MANAGING GATHERINGS
            </h2>

            <h3
              className="mb-4 mt-8 font-semibold sm:mb-3 sm:mt-6"
              style={{
                fontSize: "clamp(1.25rem, 2vw + 0.5rem, 1.5rem)",
                lineHeight: "1.4",
              }}
            >
              2.1 Host Responsibilities
            </h3>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              As a Gathering Host, you are responsible for:
            </p>
            <ul
              className="mb-6 list-disc pl-6 sm:mb-4"
              style={{ lineHeight: "1.75" }}
            >
              <li className="mb-2">Providing accurate information about the event</li>
              <li className="mb-2">Inviting only users you know and trust</li>
              <li className="mb-2">Managing participants appropriately</li>
              <li className="mb-2">Setting fair cost-splitting arrangements</li>
              <li className="mb-2">Moderating the Gathering chat</li>
              <li className="mb-2">Ensuring food safety at the actual event</li>
              <li className="mb-2">Handling disputes among participants in good faith</li>
            </ul>

            <h3
              className="mb-4 mt-8 font-semibold sm:mb-3 sm:mt-6"
              style={{
                fontSize: "clamp(1.25rem, 2vw + 0.5rem, 1.5rem)",
                lineHeight: "1.4",
              }}
            >
              2.2 Location Information
            </h3>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              Gatherings may include location information for the event. By adding a location:
            </p>
            <ul
              className="mb-6 list-disc pl-6 sm:mb-4"
              style={{ lineHeight: "1.75" }}
            >
              <li className="mb-2">You consent to sharing this location with all Gathering participants</li>
              <li className="mb-2">If using location-based discovery, the general area may be visible to other users</li>
              <li className="mb-2">Exact addresses should only be shared with confirmed participants</li>
              <li className="mb-2">Never share locations that could endanger you or others</li>
            </ul>

            <h3
              className="mb-4 mt-8 font-semibold sm:mb-3 sm:mt-6"
              style={{
                fontSize: "clamp(1.25rem, 2vw + 0.5rem, 1.5rem)",
                lineHeight: "1.4",
              }}
            >
              2.3 Invitations and Participants
            </h3>
            <ul
              className="mb-6 list-disc pl-6 sm:mb-4"
              style={{ lineHeight: "1.75" }}
            >
              <li className="mb-2">Invitations can only be sent to Gruby users</li>
              <li className="mb-2">Users must accept invitations to become participants</li>
              <li className="mb-2">Hosts can remove participants at any time</li>
              <li className="mb-2">Participants can leave a Gathering at any time</li>
              <li className="mb-2">Do not invite users you do not know to in-person events</li>
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
              3. COST-SPLITTING FEATURES
            </h2>

            <h3
              className="mb-4 mt-8 font-semibold sm:mb-3 sm:mt-6"
              style={{
                fontSize: "clamp(1.25rem, 2vw + 0.5rem, 1.5rem)",
                lineHeight: "1.4",
              }}
            >
              3.1 How Cost-Splitting Works
            </h3>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              Gruby provides tools to:
            </p>
            <ul
              className="mb-6 list-disc pl-6 sm:mb-4"
              style={{ lineHeight: "1.75" }}
            >
              <li className="mb-2">Calculate how costs should be divided among participants</li>
              <li className="mb-2">Track who has contributed what</li>
              <li className="mb-2">Record estimated and actual expenses</li>
              <li className="mb-2">Show who owes whom and how much</li>
            </ul>

            <h3
              className="mb-4 mt-8 font-semibold sm:mb-3 sm:mt-6"
              style={{
                fontSize: "clamp(1.25rem, 2vw + 0.5rem, 1.5rem)",
                lineHeight: "1.4",
              }}
            >
              3.2 What Gruby Does NOT Do
            </h3>
            <div
              className="mb-6 rounded-lg bg-gray-50 p-6"
              style={{ lineHeight: "1.75" }}
            >
              <p className="mb-4 font-semibold">Gruby does NOT:</p>
              <ul className="list-disc pl-6">
                <li className="mb-2">Process payments or transfer money</li>
                <li className="mb-2">Hold funds in escrow</li>
                <li className="mb-2">Guarantee any payments will be made</li>
                <li className="mb-2">Collect debts on your behalf</li>
                <li className="mb-2">Provide financial or banking services</li>
                <li className="mb-2">Act as a money services business</li>
                <li className="mb-2">Mediate or arbitrate financial disputes</li>
              </ul>
            </div>

            <h3
              className="mb-4 mt-8 font-semibold sm:mb-3 sm:mt-6"
              style={{
                fontSize: "clamp(1.25rem, 2vw + 0.5rem, 1.5rem)",
                lineHeight: "1.4",
              }}
            >
              3.3 Splitting Methods
            </h3>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              Gatherings may use various cost-splitting methods:
            </p>
            <ul
              className="mb-6 list-disc pl-6 sm:mb-4"
              style={{ lineHeight: "1.75" }}
            >
              <li className="mb-2"><strong>Equal Split:</strong> Total costs divided equally among all participants</li>
              <li className="mb-2"><strong>Custom Amounts:</strong> Host-defined amounts for each participant</li>
              <li className="mb-2"><strong>Item-Based:</strong> Costs assigned based on specific items or contributions</li>
              <li className="mb-2"><strong>No Split:</strong> Costs tracked but not divided (e.g., Host covers all)</li>
            </ul>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              The Host determines the splitting method, and all participants can view the breakdown.
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
              4. FINANCIAL AGREEMENTS BETWEEN USERS
            </h2>

            <h3
              className="mb-4 mt-8 font-semibold sm:mb-3 sm:mt-6"
              style={{
                fontSize: "clamp(1.25rem, 2vw + 0.5rem, 1.5rem)",
                lineHeight: "1.4",
              }}
            >
              4.1 Your Agreement with Other Participants
            </h3>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              By participating in a Gathering with cost-splitting:
            </p>
            <ul
              className="mb-6 list-disc pl-6 sm:mb-4"
              style={{ lineHeight: "1.75" }}
            >
              <li className="mb-2">You are entering into an agreement with other participants, NOT with Gruby</li>
              <li className="mb-2">You agree to pay your share as calculated and agreed upon</li>
              <li className="mb-2">You agree to make payments in good faith</li>
              <li className="mb-2">You understand that Gruby is only providing a calculation tool</li>
            </ul>

            <h3
              className="mb-4 mt-8 font-semibold sm:mb-3 sm:mt-6"
              style={{
                fontSize: "clamp(1.25rem, 2vw + 0.5rem, 1.5rem)",
                lineHeight: "1.4",
              }}
            >
              4.2 Making Payments
            </h3>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              Actual payments must be made outside of Gruby using methods such as:
            </p>
            <ul
              className="mb-6 list-disc pl-6 sm:mb-4"
              style={{ lineHeight: "1.75" }}
            >
              <li className="mb-2">Cash</li>
              <li className="mb-2">Venmo, PayPal, Zelle, or other payment apps</li>
              <li className="mb-2">Bank transfers</li>
              <li className="mb-2">Any other method agreed upon by participants</li>
            </ul>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              Gruby is not responsible for any issues with these external payment methods.
            </p>

            <h3
              className="mb-4 mt-8 font-semibold sm:mb-3 sm:mt-6"
              style={{
                fontSize: "clamp(1.25rem, 2vw + 0.5rem, 1.5rem)",
                lineHeight: "1.4",
              }}
            >
              4.3 Marking Payments as Complete
            </h3>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              Participants can mark payments as complete within Gruby for tracking purposes. This is a record-keeping feature only and does not:
            </p>
            <ul
              className="mb-6 list-disc pl-6 sm:mb-4"
              style={{ lineHeight: "1.75" }}
            >
              <li className="mb-2">Verify that payment was actually made</li>
              <li className="mb-2">Transfer any funds</li>
              <li className="mb-2">Create a legally binding receipt</li>
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
              5. DISPUTES
            </h2>

            <h3
              className="mb-4 mt-8 font-semibold sm:mb-3 sm:mt-6"
              style={{
                fontSize: "clamp(1.25rem, 2vw + 0.5rem, 1.5rem)",
                lineHeight: "1.4",
              }}
            >
              5.1 Dispute Resolution Between Users
            </h3>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              If disputes arise regarding cost-splitting or payments:
            </p>
            <ul
              className="mb-6 list-disc pl-6 sm:mb-4"
              style={{ lineHeight: "1.75" }}
            >
              <li className="mb-2">Participants should attempt to resolve disputes directly with each other</li>
              <li className="mb-2">The Gathering chat can be used for discussion</li>
              <li className="mb-2">Gruby does not mediate or arbitrate financial disputes between users</li>
              <li className="mb-2">Gruby cannot force users to make payments</li>
            </ul>

            <h3
              className="mb-4 mt-8 font-semibold sm:mb-3 sm:mt-6"
              style={{
                fontSize: "clamp(1.25rem, 2vw + 0.5rem, 1.5rem)",
                lineHeight: "1.4",
              }}
            >
              5.2 When to Contact Gruby
            </h3>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              You should contact Gruby if:
            </p>
            <ul
              className="mb-6 list-disc pl-6 sm:mb-4"
              style={{ lineHeight: "1.75" }}
            >
              <li className="mb-2">A user is using Gatherings to commit fraud or scams</li>
              <li className="mb-2">A user is engaging in harassment within Gatherings</li>
              <li className="mb-2">There are technical issues with the cost-splitting calculations</li>
              <li className="mb-2">A user is violating our Terms of Service or Community Guidelines</li>
            </ul>

            <h3
              className="mb-4 mt-8 font-semibold sm:mb-3 sm:mt-6"
              style={{
                fontSize: "clamp(1.25rem, 2vw + 0.5rem, 1.5rem)",
                lineHeight: "1.4",
              }}
            >
              5.3 Legal Disputes
            </h3>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              For significant financial disputes that cannot be resolved between parties:
            </p>
            <ul
              className="mb-6 list-disc pl-6 sm:mb-4"
              style={{ lineHeight: "1.75" }}
            >
              <li className="mb-2">These are matters between the involved parties</li>
              <li className="mb-2">Small claims court may be an option for smaller amounts</li>
              <li className="mb-2">Gruby may provide records upon valid legal request</li>
              <li className="mb-2">Gruby is not a party to your financial agreements</li>
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
              6. SAFETY AND CONDUCT
            </h2>

            <h3
              className="mb-4 mt-8 font-semibold sm:mb-3 sm:mt-6"
              style={{
                fontSize: "clamp(1.25rem, 2vw + 0.5rem, 1.5rem)",
                lineHeight: "1.4",
              }}
            >
              6.1 In-Person Safety
            </h3>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              When attending in-person Gatherings:
            </p>
            <ul
              className="mb-6 list-disc pl-6 sm:mb-4"
              style={{ lineHeight: "1.75" }}
            >
              <li className="mb-2">Only attend Gatherings with people you know and trust</li>
              <li className="mb-2">Meet in public places for first-time meetups</li>
              <li className="mb-2">Tell someone where you are going</li>
              <li className="mb-2">Trust your instincts about safety</li>
              <li className="mb-2">Do not share exact locations with strangers</li>
            </ul>

            <h3
              className="mb-4 mt-8 font-semibold sm:mb-3 sm:mt-6"
              style={{
                fontSize: "clamp(1.25rem, 2vw + 0.5rem, 1.5rem)",
                lineHeight: "1.4",
              }}
            >
              6.2 Food Safety
            </h3>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              Hosts and participants should:
            </p>
            <ul
              className="mb-6 list-disc pl-6 sm:mb-4"
              style={{ lineHeight: "1.75" }}
            >
              <li className="mb-2">Communicate about food allergies and dietary restrictions</li>
              <li className="mb-2">Follow proper food safety practices</li>
              <li className="mb-2">Store and transport food at safe temperatures</li>
              <li className="mb-2">Disclose all ingredients in prepared foods</li>
              <li className="mb-2">Not serve food that may be unsafe</li>
            </ul>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              Gruby is not responsible for any foodborne illness or allergic reactions at Gatherings.
            </p>

            <h3
              className="mb-4 mt-8 font-semibold sm:mb-3 sm:mt-6"
              style={{
                fontSize: "clamp(1.25rem, 2vw + 0.5rem, 1.5rem)",
                lineHeight: "1.4",
              }}
            >
              6.3 Prohibited Uses
            </h3>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              You may NOT use Gatherings for:
            </p>
            <ul
              className="mb-6 list-disc pl-6 sm:mb-4"
              style={{ lineHeight: "1.75" }}
            >
              <li className="mb-2">Illegal activities</li>
              <li className="mb-2">Fraudulent schemes or scams</li>
              <li className="mb-2">Commercial food service without proper licensing</li>
              <li className="mb-2">Harassment or stalking</li>
              <li className="mb-2">Any activity unrelated to cooking and food</li>
              <li className="mb-2">Money laundering or financial fraud</li>
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
              7. DATA AND RECORDS
            </h2>

            <h3
              className="mb-4 mt-8 font-semibold sm:mb-3 sm:mt-6"
              style={{
                fontSize: "clamp(1.25rem, 2vw + 0.5rem, 1.5rem)",
                lineHeight: "1.4",
              }}
            >
              7.1 Gathering Data Retention
            </h3>
            <ul
              className="mb-6 list-disc pl-6 sm:mb-4"
              style={{ lineHeight: "1.75" }}
            >
              <li className="mb-2">Gathering details are retained for the duration of the Gathering plus 90 days</li>
              <li className="mb-2">Gathering chat messages are retained for the duration plus 90 days</li>
              <li className="mb-2">Cost-splitting records are retained for 7 years for financial record-keeping</li>
            </ul>

            <h3
              className="mb-4 mt-8 font-semibold sm:mb-3 sm:mt-6"
              style={{
                fontSize: "clamp(1.25rem, 2vw + 0.5rem, 1.5rem)",
                lineHeight: "1.4",
              }}
            >
              7.2 Your Records
            </h3>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              We recommend that you:
            </p>
            <ul
              className="mb-6 list-disc pl-6 sm:mb-4"
              style={{ lineHeight: "1.75" }}
            >
              <li className="mb-2">Keep your own records of payments made and received</li>
              <li className="mb-2">Use payment methods that provide receipts</li>
              <li className="mb-2">Screenshot cost-splitting breakdowns if needed</li>
              <li className="mb-2">Communicate payment confirmations outside the app</li>
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
              8. DISCLAIMERS AND LIMITATIONS
            </h2>

            <h3
              className="mb-4 mt-8 font-semibold sm:mb-3 sm:mt-6"
              style={{
                fontSize: "clamp(1.25rem, 2vw + 0.5rem, 1.5rem)",
                lineHeight: "1.4",
              }}
            >
              8.1 No Guarantee of Payments
            </h3>
            <p className="mb-6 font-semibold sm:mb-4" style={{ lineHeight: "1.75" }}>
              GRUBY DOES NOT GUARANTEE THAT ANY USER WILL PAY THEIR CALCULATED SHARE. YOU PARTICIPATE IN COST-SPLITTING AT YOUR OWN RISK.
            </p>

            <h3
              className="mb-4 mt-8 font-semibold sm:mb-3 sm:mt-6"
              style={{
                fontSize: "clamp(1.25rem, 2vw + 0.5rem, 1.5rem)",
                lineHeight: "1.4",
              }}
            >
              8.2 Calculation Accuracy
            </h3>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              While we strive for accuracy in cost calculations:
            </p>
            <ul
              className="mb-6 list-disc pl-6 sm:mb-4"
              style={{ lineHeight: "1.75" }}
            >
              <li className="mb-2">Calculations depend on data entered by users</li>
              <li className="mb-2">Price estimates from Kroger may differ from actual prices</li>
              <li className="mb-2">Rounding may result in minor discrepancies</li>
              <li className="mb-2">Always verify calculations before agreeing to amounts</li>
            </ul>

            <h3
              className="mb-4 mt-8 font-semibold sm:mb-3 sm:mt-6"
              style={{
                fontSize: "clamp(1.25rem, 2vw + 0.5rem, 1.5rem)",
                lineHeight: "1.4",
              }}
            >
              8.3 Limitation of Liability
            </h3>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              Gruby is not liable for:
            </p>
            <ul
              className="mb-6 list-disc pl-6 sm:mb-4"
              style={{ lineHeight: "1.75" }}
            >
              <li className="mb-2">Unpaid amounts between users</li>
              <li className="mb-2">Disputes over cost-splitting</li>
              <li className="mb-2">Injuries or damages at in-person Gatherings</li>
              <li className="mb-2">Foodborne illness or allergic reactions</li>
              <li className="mb-2">Actions or conduct of Gathering participants</li>
              <li className="mb-2">Accuracy of price estimates</li>
              <li className="mb-2">Any losses arising from use of Gatherings or cost-splitting features</li>
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
              9. CHANGES TO THESE TERMS
            </h2>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              We may update these terms from time to time. Material changes will be communicated through the app or via email. Your continued use of Gatherings and cost-splitting features after changes constitutes acceptance.
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
              If you have questions about Gatherings or cost-splitting, please contact us:
            </p>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              <strong>Gruby Support Team</strong><br />
              Email: <a href="mailto:support@gruby.app" className="text-[#222222] hover:underline">support@gruby.app</a>
            </p>
            <p className="mb-6 sm:mb-4" style={{ lineHeight: "1.75" }}>
              <strong>For Safety Concerns</strong><br />
              Email: <a href="mailto:safety@gruby.app" className="text-[#222222] hover:underline">safety@gruby.app</a>
            </p>
          </section>
    </DocsLayout>
  );
}
