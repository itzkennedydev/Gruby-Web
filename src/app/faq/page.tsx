import type { Metadata } from 'next';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions | Gruby',
  description: 'Frequently asked questions about Gruby - your budgeting-focused cooking companion',
};

export default function FAQPage() {
  const faqs = [
    {
      category: 'Getting Started',
      questions: [
        {
          question: 'What is Gruby?',
          answer: 'Gruby is a budgeting-focused cooking companion designed to show people the real financial impact of cooking at home. We help you discover recipes, build grocery lists, compare prices, and track your savings while connecting you with talented home cooks in your neighborhood.',
        },
        {
          question: 'How do I get started?',
          answer: 'Simply download the Gruby app from the App Store or Google Play, create an account using Apple Sign-In, Google Sign-In, or email, and start exploring recipes. You can set your dietary preferences, budget goals, and household size to get personalized recommendations.',
        },
        {
          question: 'Is Gruby free to use?',
          answer: 'Yes! Gruby is completely free to download and use. You can browse recipes, create grocery lists, compare prices, track your savings, and access all community features at no cost.',
        },
      ],
    },
    {
      category: 'Features & Functionality',
      questions: [
        {
          question: 'How does price comparison work?',
          answer: 'Gruby integrates with Kroger stores to show you real-time pricing for ingredients. When you select a recipe, we automatically build a grocery list and show you the total cost, per-serving price, and how much you save compared to ordering delivery.',
        },
        {
          question: 'Can I connect my Kroger account?',
          answer: 'Yes! You can connect your Kroger account to access personalized pricing, loyalty benefits, and purchase history. This helps us provide more accurate cost estimates and savings calculations.',
        },
        {
          question: 'How accurate are the savings calculations?',
          answer: 'Our savings calculations are based on real prices from Kroger stores and average delivery app costs. While prices may vary slightly by location and time, we provide accurate estimates to help you understand the financial benefits of cooking at home.',
        },
        {
          question: 'Can I save my favorite recipes?',
          answer: 'Absolutely! You can save recipes to your collection, create meal plans, and organize them by category. Your saved recipes sync across all your devices.',
        },
        {
          question: 'Does Gruby work offline?',
          answer: 'You can view saved recipes and meal plans offline, but price comparisons and grocery list features require an internet connection to access real-time pricing data.',
        },
      ],
    },
    {
      category: 'Community & Sharing',
      questions: [
        {
          question: 'What is the home cook marketplace?',
          answer: 'Everyone is a home cook! The marketplace connects you with people in your neighborhood who share recipes and cooking ideas. You can discover authentic, home-cooked meals, connect with others in your community, and share your own recipes while enjoying delicious food together.',
        },
        {
          question: 'How do I share my recipes?',
          answer: 'Simply create an account and start sharing your recipes! There\'s no special application process - everyone can share their favorite recipes, cooking tips, and connect with others in the community.',
        },
        {
          question: 'Can I connect with other cooks in my area?',
          answer: 'Yes! Gruby helps you discover and connect with people in your neighborhood who love cooking. You can browse recipes, see what others are making, and build a community around home cooking.',
        },
      ],
    },
    {
      category: 'Account & Privacy',
      questions: [
        {
          question: 'How do I delete my account?',
          answer: 'You can delete your account at any time through the app settings. Go to Settings > Account > Delete Account. Please note that this action is permanent and cannot be undone.',
        },
        {
          question: 'What information does Gruby collect?',
          answer: 'We collect information necessary to provide our services, including account information, usage data, preferences, and content you create. We do not sell your personal information. For more details, please see our Privacy Policy.',
        },
        {
          question: 'How do I update my dietary preferences?',
          answer: 'You can update your dietary preferences, restrictions, and allergies at any time in the app settings under Preferences. This helps us provide better recipe recommendations.',
        },
        {
          question: 'Can I change my email address?',
          answer: 'Yes, you can update your email address in the app settings under Account Information. You\'ll need to verify your new email address.',
        },
      ],
    },
    {
      category: 'Technical Support',
      questions: [
        {
          question: 'The app is not loading prices correctly. What should I do?',
          answer: 'First, try refreshing the app or restarting it. If prices still aren\'t loading, check your internet connection. If the problem persists, please contact our support team at support@gruby.app.',
        },
        {
          question: 'What devices are supported?',
          answer: 'Gruby is available on iOS (iPhone and iPad) and Android devices. The app requires iOS 13.0 or later, or Android 8.0 or later.',
        },
        {
          question: 'How do I report a bug or issue?',
          answer: 'You can report bugs or issues through the app by going to Settings > Help & Support > Report an Issue, or email us directly at support@gruby.app. Please include details about the issue and your device information.',
        },
        {
          question: 'How do I contact customer support?',
          answer: 'You can reach our support team by emailing support@gruby.app. We typically respond within 24-48 hours. You can also access in-app support through Settings > Help & Support.',
        },
      ],
    },
    {
      category: 'Billing & Subscriptions',
      questions: [
        {
          question: 'Is Gruby free?',
          answer: 'Yes! Gruby is completely free to use. All features including recipe browsing, grocery lists, price comparisons, savings tracking, and community features are available at no cost.',
        },
        {
          question: 'Will Gruby always be free?',
          answer: 'For now, Gruby is free. We may introduce optional premium features in the future, but core features like recipe browsing, grocery lists, and price comparisons will always remain free.',
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20">
        <div className="prose prose-lg max-w-none">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold mb-4">Frequently Asked Questions</h1>
          
          <p className="text-base sm:text-lg mb-12 text-[#717171]">
            Find answers to common questions about Gruby. Can't find what you're looking for? <a href="mailto:support@gruby.app" className="text-[#FF1E00] hover:underline">Contact our support team</a>.
          </p>

          {faqs.map((category, categoryIndex) => (
            <section key={categoryIndex} className="mb-12 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl font-semibold mt-8 mb-6 text-[#222222]">
                {category.category}
              </h2>
              <div className="space-y-6">
                {category.questions.map((faq, faqIndex) => (
                  <div key={faqIndex} className="border-b border-[#E5E5E5] pb-6 last:border-b-0 last:pb-0">
                    <h3 className="text-lg sm:text-xl font-semibold mb-3 text-[#222222]">
                      {faq.question}
                    </h3>
                    <p className="text-base sm:text-lg text-[#717171] leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          ))}

          <section className="mt-12 sm:mt-16 pt-8 border-t border-[#E5E5E5]">
            <h2 className="text-2xl sm:text-3xl font-semibold mb-4 text-[#222222]">Still have questions?</h2>
            <p className="text-base sm:text-lg text-[#717171] mb-6">
              We're here to help! Reach out to our support team and we'll get back to you as soon as possible.
            </p>
            <div className="space-y-4">
              <p className="text-base text-[#222222]">
                <strong>Email:</strong>{' '}
                <a href="mailto:support@gruby.app" className="text-[#FF1E00] hover:underline">
                  support@gruby.app
                </a>
              </p>
              <p className="text-base text-[#222222]">
                <strong>Response time:</strong> We typically respond within 24-48 hours.
              </p>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
}

