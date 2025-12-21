import type { Metadata } from 'next';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions | Gruby',
  description: 'Frequently asked questions about Gruby - your AI-powered kitchen companion',
};

export default function FAQPage() {
  const faqs = [
    {
      category: 'Getting Started',
      questions: [
        {
          question: 'What is Gruby?',
          answer: 'Gruby is your AI-powered kitchen companion. Import recipes from TikTok, YouTube, or any website with one tap. Get real-time grocery prices from Kroger. Cook with step-by-step guidance including timers, video clips, and voice instructions. Track your savings and share your wins with a community of real home cooks.',
        },
        {
          question: 'How do I get started?',
          answer: 'Download the Gruby app from the App Store or Google Play, create an account, and start importing recipes. Paste any recipe link (TikTok, YouTube, Instagram, or websites) and Gruby AI will extract the ingredients, steps, and nutrition automatically. Set your dietary preferences and budget to get personalized recommendations.',
        },
        {
          question: 'Is Gruby free to use?',
          answer: 'Yes! Gruby is completely free. Recipe import, Gruby AI, grocery prices, cooking mode, savings tracking, and all community features are available at no cost.',
        },
      ],
    },
    {
      category: 'Gruby AI Features',
      questions: [
        {
          question: 'What is Gruby AI?',
          answer: 'Gruby AI is your personal cooking assistant. It can import recipes from any video or website, suggest meals based on what\'s in your pantry, help you reduce your grocery bill, and answer any cooking questions you have. Just ask it anything!',
        },
        {
          question: 'How does recipe import work?',
          answer: 'Just paste any recipe link — TikTok, YouTube, Instagram, or any cooking website. Gruby AI automatically extracts the ingredients, cooking steps, nutrition info, and even timestamps from videos. No more manually copying recipes or taking screenshots.',
        },
        {
          question: 'Can Gruby AI help me save money?',
          answer: 'Gruby AI can analyze your shopping cart and suggest cheaper alternatives, help you find recipes that use ingredients you already have, and recommend meals based on what\'s on sale at your local Kroger store.',
        },
      ],
    },
    {
      category: 'Grocery Prices & Shopping',
      questions: [
        {
          question: 'How does price comparison work?',
          answer: 'Gruby integrates with Kroger stores to show you real-time pricing for ingredients. When you select a recipe, we automatically build a grocery list and show you the total cost, per-serving price, and how much you save compared to ordering delivery.',
        },
        {
          question: 'Can I connect my Kroger account?',
          answer: 'Yes! Connect your Kroger account to access personalized pricing, loyalty benefits, and purchase history. This helps us provide more accurate cost estimates and you can add items directly to your Kroger cart.',
        },
        {
          question: 'How accurate are the savings calculations?',
          answer: 'Our savings calculations are based on real prices from Kroger stores and average delivery app costs. We show you exactly what eating out costs vs. cooking at home so you can see the real difference.',
        },
      ],
    },
    {
      category: 'Cooking Mode',
      questions: [
        {
          question: 'What is Cooking Mode?',
          answer: 'Cooking Mode guides you through recipes step-by-step with built-in timers, video clips for each step (when available), and voice instructions. Even beginners can cook like pros. And yes, there\'s a confetti celebration when you finish.',
        },
        {
          question: 'How do video clips work in Cooking Mode?',
          answer: 'When you import a recipe from a video, Gruby AI extracts timestamps for each cooking step. During Cooking Mode, you can play the exact video clip for each step so you can see exactly what to do.',
        },
        {
          question: 'Can I use voice instructions?',
          answer: 'Yes! Enable voice guidance and Gruby will read each step aloud so you can cook hands-free. Perfect for when your hands are covered in flour.',
        },
      ],
    },
    {
      category: 'Community & Stories',
      questions: [
        {
          question: 'What are Stories?',
          answer: 'Stories are 24-hour posts where you can share your cooking wins, what you\'re making tonight, or your finished dishes. It\'s like Instagram Stories but for home cooks — no influencers, just real food.',
        },
        {
          question: 'How do I share my recipes?',
          answer: 'Create an account and start sharing! There\'s no application process — everyone can share their favorite recipes, cooking tips, and connect with others in the community.',
        },
        {
          question: 'Can I connect with other cooks?',
          answer: 'Yes! Follow other home cooks, see what they\'re making, get recipe inspiration, and even send direct messages. Build your own cooking community.',
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
          question: 'Is my data private?',
          answer: 'We take privacy seriously. We don\'t sell your personal information. Messages between users are end-to-end encrypted. For full details, check out our Privacy Policy.',
        },
        {
          question: 'How do I update my dietary preferences?',
          answer: 'Go to Settings > Preferences to update your dietary restrictions, allergies, and cuisine preferences. Gruby AI uses these to give you better recommendations.',
        },
      ],
    },
    {
      category: 'Technical Support',
      questions: [
        {
          question: 'Recipe import isn\'t working. What should I do?',
          answer: 'Make sure you\'re pasting a valid recipe URL (TikTok, YouTube, Instagram, or a cooking website). If it still doesn\'t work, try a different link or email us at support@gruby.app with the URL.',
        },
        {
          question: 'What devices are supported?',
          answer: 'Gruby is available on iOS (iPhone and iPad) and Android devices. We also support Apple Watch for quick access to recipes and savings stats.',
        },
        {
          question: 'How do I contact support?',
          answer: 'Email us at support@gruby.app. We typically respond within 24-48 hours. You can also use the in-app support option in Settings > Help & Support.',
        },
      ],
    },
    {
      category: 'Pricing',
      questions: [
        {
          question: 'Is Gruby really free?',
          answer: 'Yes! Gruby AI, recipe import, grocery prices, cooking mode, savings tracking, and all community features are completely free. No tricks, no hidden fees.',
        },
        {
          question: 'Will Gruby always be free?',
          answer: 'All the features you love will always be free. We may introduce optional premium features in the future, but the core Gruby experience — including Gruby AI — will remain free forever.',
        },
      ],
    },
  ];

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
          <h1 className="font-semibold mb-4" style={{ fontSize: 'clamp(1.875rem, 4vw + 1rem, 3rem)' }}>Frequently Asked Questions</h1>
          
          <p className="mb-12 text-[#717171]" style={{ fontSize: 'clamp(1rem, 1.25vw + 0.75rem, 1.125rem)' }}>
            Find answers to common questions about Gruby. Can&apos;t find what you&apos;re looking for? <a href="mailto:support@gruby.app" className="text-[#222222] hover:underline">Contact our support team</a>.
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
            <h2 className="font-semibold mb-4 text-[#222222]" style={{ fontSize: 'clamp(1.5rem, 2.5vw + 0.75rem, 1.875rem)' }}>Still have questions?</h2>
            <p className="text-[#717171] mb-6" style={{ fontSize: 'clamp(1rem, 1.25vw + 0.75rem, 1.125rem)' }}>
              We&apos;re here to help! Reach out to our support team and we&apos;ll get back to you as soon as possible.
            </p>
            <div className="space-y-4">
              <p className="text-[#222222]" style={{ fontSize: 'clamp(1rem, 1.25vw + 0.75rem, 1rem)' }}>
                <strong>Email:</strong>{' '}
                <a href="mailto:support@gruby.app" className="text-[#222222] hover:underline">
                  support@gruby.app
                </a>
              </p>
              <p className="text-[#222222]" style={{ fontSize: 'clamp(1rem, 1.25vw + 0.75rem, 1rem)' }}>
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

