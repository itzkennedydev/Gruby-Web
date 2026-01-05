import type { Metadata } from 'next';
import { DocsLayout } from '@/components/DocsLayout';

export const metadata: Metadata = {
  title: 'Support | Gruby',
  description: 'Get help and support for Gruby - Your social cooking companion',
};

export default function SupportPage() {
  return (
    <DocsLayout title="Support" currentPath="/support">
      <h1 className="font-semibold mb-6 sm:mb-4" style={{ fontSize: 'clamp(1.875rem, 4vw + 1rem, 3rem)', lineHeight: '1.2' }}>GRUBY SUPPORT</h1>

      <p className="text-gray-600 mb-8 sm:mb-6" style={{ fontSize: 'clamp(0.875rem, 1vw + 0.5rem, 0.875rem)', lineHeight: '1.6' }}>
        We&apos;re here to help you get the most out of Gruby.
      </p>

      <section className="mb-10 sm:mb-8">
        <h2 className="font-semibold mt-10 sm:mt-8 mb-6 sm:mb-4" style={{ fontSize: 'clamp(1.5rem, 2.5vw + 0.75rem, 1.875rem)', lineHeight: '1.3' }}>Contact Us</h2>

        <p className="mb-6 sm:mb-4" style={{ lineHeight: '1.75' }}>
          Have a question, feedback, or need assistance? We&apos;re here to help!
        </p>

        <div className="bg-gray-50 rounded-xl p-6 mb-6">
          <h3 className="font-semibold mb-4" style={{ fontSize: 'clamp(1.125rem, 1.5vw + 0.5rem, 1.25rem)' }}>Email Support</h3>
          <p className="mb-4" style={{ lineHeight: '1.75' }}>
            For general inquiries and support requests:
          </p>
          <p className="mb-2">
            <a href="mailto:support@gruby.app" className="text-blue-600 hover:underline font-medium">support@gruby.app</a>
          </p>
          <p className="text-gray-500 text-sm">We aim to respond within 24-48 hours.</p>
        </div>
      </section>

      <section className="mb-10 sm:mb-8">
        <h2 className="font-semibold mt-10 sm:mt-8 mb-6 sm:mb-4" style={{ fontSize: 'clamp(1.5rem, 2.5vw + 0.75rem, 1.875rem)', lineHeight: '1.3' }}>Frequently Asked Questions</h2>

        <div className="space-y-6">
          <div>
            <h3 className="font-semibold mb-2" style={{ fontSize: 'clamp(1rem, 1.25vw + 0.5rem, 1.125rem)' }}>How do I create a recipe?</h3>
            <p style={{ lineHeight: '1.75' }}>
              Tap the &quot;+&quot; button in the app, then select &quot;Create Recipe.&quot; You can add ingredients, steps, photos, and nutritional information. You can also import recipes from URLs or videos.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-2" style={{ fontSize: 'clamp(1rem, 1.25vw + 0.5rem, 1.125rem)' }}>How do I join a Gathering?</h3>
            <p style={{ lineHeight: '1.75' }}>
              Browse available Gatherings in the Gatherings tab. When you find one you&apos;d like to attend, tap &quot;Request to Join&quot; and wait for the host to approve your request.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-2" style={{ fontSize: 'clamp(1rem, 1.25vw + 0.5rem, 1.125rem)' }}>How does cost splitting work?</h3>
            <p style={{ lineHeight: '1.75' }}>
              Gathering hosts can enable cost splitting for their events. Costs can be split equally among participants or customized based on contributions. You&apos;ll see your share in the Gathering details.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-2" style={{ fontSize: 'clamp(1rem, 1.25vw + 0.5rem, 1.125rem)' }}>How do I manage my pantry?</h3>
            <p style={{ lineHeight: '1.75' }}>
              Go to the Pantry tab to add items you have at home. You can scan barcodes, manually add items, and set expiration dates. Gruby will suggest recipes based on what you have and alert you when items are expiring.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-2" style={{ fontSize: 'clamp(1rem, 1.25vw + 0.5rem, 1.125rem)' }}>How do I delete my account?</h3>
            <p style={{ lineHeight: '1.75' }}>
              Go to Settings &gt; Account &gt; Delete Account. This action is permanent and will remove all your data, including recipes, gatherings, and messages. Please note that content shared with others may remain visible to them.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-10 sm:mb-8">
        <h2 className="font-semibold mt-10 sm:mt-8 mb-6 sm:mb-4" style={{ fontSize: 'clamp(1.5rem, 2.5vw + 0.75rem, 1.875rem)', lineHeight: '1.3' }}>Report an Issue</h2>

        <p className="mb-6 sm:mb-4" style={{ lineHeight: '1.75' }}>
          Found a bug or experiencing technical difficulties? Please email us at <a href="mailto:support@gruby.app" className="text-blue-600 hover:underline">support@gruby.app</a> with the following information:
        </p>

        <ul className="list-disc list-inside mb-6 sm:mb-4 space-y-2 ml-4" style={{ lineHeight: '1.75' }}>
          <li>Your device model and operating system version</li>
          <li>The version of the Gruby app you&apos;re using</li>
          <li>A detailed description of the issue</li>
          <li>Steps to reproduce the problem</li>
          <li>Screenshots or screen recordings if applicable</li>
        </ul>
      </section>

      <section className="mb-10 sm:mb-8">
        <h2 className="font-semibold mt-10 sm:mt-8 mb-6 sm:mb-4" style={{ fontSize: 'clamp(1.5rem, 2.5vw + 0.75rem, 1.875rem)', lineHeight: '1.3' }}>Safety Concerns</h2>

        <p className="mb-6 sm:mb-4" style={{ lineHeight: '1.75' }}>
          If you have concerns about content or behavior that violates our <a href="/community-guidelines" className="text-blue-600 hover:underline">Community Guidelines</a>, please use the in-app reporting feature or email us at:
        </p>

        <p className="mb-6">
          <a href="mailto:safety@gruby.app" className="text-blue-600 hover:underline font-medium">safety@gruby.app</a>
        </p>

        <p style={{ lineHeight: '1.75' }}>
          For immediate safety concerns, please contact your local emergency services.
        </p>
      </section>

      <section className="mb-10 sm:mb-8">
        <h2 className="font-semibold mt-10 sm:mt-8 mb-6 sm:mb-4" style={{ fontSize: 'clamp(1.5rem, 2.5vw + 0.75rem, 1.875rem)', lineHeight: '1.3' }}>Privacy Inquiries</h2>

        <p className="mb-6 sm:mb-4" style={{ lineHeight: '1.75' }}>
          For questions about your data, privacy rights, or to submit a data request, please contact our privacy team:
        </p>

        <p className="mb-6">
          <a href="mailto:privacy@gruby.app" className="text-blue-600 hover:underline font-medium">privacy@gruby.app</a>
        </p>

        <p style={{ lineHeight: '1.75' }}>
          For more information, please review our <a href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</a>.
        </p>
      </section>

      <section className="mb-10 sm:mb-8">
        <h2 className="font-semibold mt-10 sm:mt-8 mb-6 sm:mb-4" style={{ fontSize: 'clamp(1.5rem, 2.5vw + 0.75rem, 1.875rem)', lineHeight: '1.3' }}>App Information</h2>

        <div className="bg-gray-50 rounded-xl p-6">
          <ul className="space-y-3" style={{ lineHeight: '1.75' }}>
            <li><strong>App Name:</strong> Gruby</li>
            <li><strong>Platform:</strong> iOS</li>
            <li><strong>Developer:</strong> Gruby</li>
            <li><strong>Category:</strong> Food &amp; Drink, Social Networking</li>
            <li><strong>Website:</strong> <a href="https://gruby.app" className="text-blue-600 hover:underline">gruby.app</a></li>
          </ul>
        </div>
      </section>

      <section className="mb-10 sm:mb-8">
        <h2 className="font-semibold mt-10 sm:mt-8 mb-6 sm:mb-4" style={{ fontSize: 'clamp(1.5rem, 2.5vw + 0.75rem, 1.875rem)', lineHeight: '1.3' }}>Legal Documents</h2>

        <ul className="space-y-3" style={{ lineHeight: '1.75' }}>
          <li><a href="/terms" className="text-blue-600 hover:underline">Terms of Service</a></li>
          <li><a href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</a></li>
          <li><a href="/eula" className="text-blue-600 hover:underline">End User License Agreement (EULA)</a></li>
          <li><a href="/community-guidelines" className="text-blue-600 hover:underline">Community Guidelines</a></li>
          <li><a href="/acceptable-use" className="text-blue-600 hover:underline">Acceptable Use Policy</a></li>
        </ul>
      </section>
    </DocsLayout>
  );
}
