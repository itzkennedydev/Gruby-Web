'use client';

import { useState, useMemo, useEffect, useRef } from 'react';
import { Footer } from '@/components/Footer';
import { Search, ChevronRight, X } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const faqs = [
  {
    id: 'getting-started',
    category: 'Getting Started',
    questions: [
      {
        id: 'what-is-gruby',
        question: 'What is Gruby?',
        answer: 'Gruby is your AI-powered kitchen companion. Import recipes from TikTok, YouTube, or any website with one tap. Get real-time grocery prices from partner stores. Cook with step-by-step guidance including timers, video clips, and voice instructions. Track your savings and share your wins with a community of real home cooks.',
      },
      {
        id: 'how-to-get-started',
        question: 'How do I get started?',
        answer: 'Download the Gruby app from the App Store or Google Play, create an account, and start importing recipes. Paste any recipe link (TikTok, YouTube, Instagram, or websites) and Gruby AI will extract the ingredients, steps, and nutrition automatically. Set your dietary preferences and budget to get personalized recommendations.',
      },
      {
        id: 'is-gruby-free',
        question: 'Is Gruby free to use?',
        answer: 'Gruby offers a generous free tier including recipe import, cooking mode, grocery prices, and community access. Advanced AI features are available with Gruby Pro.',
      },
    ],
  },
  {
    id: 'gruby-ai',
    category: 'Gruby AI Features',
    questions: [
      {
        id: 'what-is-gruby-ai',
        question: 'What is Gruby AI?',
        answer: "Gruby AI is your personal cooking assistant. It can import recipes from any video or website, suggest meals based on what's in your pantry, help you reduce your grocery bill, and answer any cooking questions you have. Just ask it anything!",
      },
      {
        id: 'recipe-import',
        question: 'How does recipe import work?',
        answer: 'Just paste any recipe link — TikTok, YouTube, Instagram, or any cooking website. Gruby AI automatically extracts the ingredients, cooking steps, nutrition info, and even timestamps from videos. No more manually copying recipes or taking screenshots.',
      },
      {
        id: 'ai-save-money',
        question: 'Can Gruby AI help me save money?',
        answer: "Gruby AI can analyze your shopping cart and suggest cheaper alternatives, help you find recipes that use ingredients you already have, and recommend meals based on what's on sale at your local grocery store.",
      },
    ],
  },
  {
    id: 'grocery-shopping',
    category: 'Grocery Prices & Shopping',
    questions: [
      {
        id: 'price-comparison',
        question: 'How does price comparison work?',
        answer: 'Gruby integrates with grocery partners to show you real-time pricing for ingredients. When you select a recipe, we automatically build a grocery list and show you the total cost, per-serving price, and how much you save compared to ordering delivery.',
      },
      {
        id: 'grocery-account',
        question: 'Can I connect my grocery store account?',
        answer: 'Yes! Connect your grocery store account to access personalized pricing, loyalty benefits, and purchase history. This helps us provide more accurate cost estimates and you can add items directly to your cart.',
      },
      {
        id: 'savings-accuracy',
        question: 'How accurate are the savings calculations?',
        answer: 'Our savings calculations are based on real prices from grocery partners and average delivery app costs. We show you exactly what eating out costs vs. cooking at home so you can see the real difference.',
      },
    ],
  },
  {
    id: 'cooking-mode',
    category: 'Cooking Mode',
    questions: [
      {
        id: 'what-is-cooking-mode',
        question: 'What is Cooking Mode?',
        answer: "Cooking Mode guides you through recipes step-by-step with built-in timers, video clips for each step (when available), and voice instructions. Even beginners can cook like pros. And yes, there's a confetti celebration when you finish.",
      },
      {
        id: 'video-clips',
        question: 'How do video clips work in Cooking Mode?',
        answer: 'When you import a recipe from a video, Gruby AI extracts timestamps for each cooking step. During Cooking Mode, you can play the exact video clip for each step so you can see exactly what to do.',
      },
      {
        id: 'voice-instructions',
        question: 'Can I use voice instructions?',
        answer: "Yes! Enable voice guidance and Gruby will read each step aloud so you can cook hands-free. Perfect for when your hands are covered in flour.",
      },
    ],
  },
  {
    id: 'community',
    category: 'Community & Stories',
    questions: [
      {
        id: 'what-are-stories',
        question: 'What are Stories?',
        answer: "Stories are 24-hour posts where you can share your cooking wins, what you're making tonight, or your finished dishes. It's like Instagram Stories but for home cooks — no influencers, just real food.",
      },
      {
        id: 'share-recipes',
        question: 'How do I share my recipes?',
        answer: "Create an account and start sharing! There's no application process — everyone can share their favorite recipes, cooking tips, and connect with others in the community.",
      },
      {
        id: 'connect-cooks',
        question: 'Can I connect with other cooks?',
        answer: "Yes! Follow other home cooks, see what they're making, get recipe inspiration, and even send direct messages. Build your own cooking community.",
      },
    ],
  },
  {
    id: 'account-privacy',
    category: 'Account & Privacy',
    questions: [
      {
        id: 'delete-account',
        question: 'How do I delete my account?',
        answer: 'You can delete your account at any time through the app settings. Go to Settings > Account > Delete Account. Please note that this action is permanent and cannot be undone.',
      },
      {
        id: 'data-privacy',
        question: 'Is my data private?',
        answer: "We take privacy seriously. We don't sell your personal information. Messages between users are end-to-end encrypted. For full details, check out our Privacy Policy.",
      },
      {
        id: 'dietary-preferences',
        question: 'How do I update my dietary preferences?',
        answer: 'Go to Settings > Preferences to update your dietary restrictions, allergies, and cuisine preferences. Gruby AI uses these to give you better recommendations.',
      },
    ],
  },
  {
    id: 'technical-support',
    category: 'Technical Support',
    questions: [
      {
        id: 'import-not-working',
        question: "Recipe import isn't working. What should I do?",
        answer: "Make sure you're pasting a valid recipe URL (TikTok, YouTube, Instagram, or a cooking website). If it still doesn't work, try a different link or email us at support@gruby.app with the URL.",
      },
      {
        id: 'supported-devices',
        question: 'What devices are supported?',
        answer: 'Gruby is available on iOS (iPhone and iPad) and Android devices. We also support Apple Watch for quick access to recipes and savings stats.',
      },
      {
        id: 'contact-support',
        question: 'How do I contact support?',
        answer: 'Email us at support@gruby.app. We typically respond within 24-48 hours. You can also use the in-app support option in Settings > Help & Support.',
      },
    ],
  },
  {
    id: 'pricing',
    category: 'Pricing',
    questions: [
      {
        id: 'free-features',
        question: 'Is Gruby really free?',
        answer: 'Yes! Gruby is completely free. We believe saving money shouldn\'t cost money. All features are available to everyone — recipe import, cooking mode, meal planning, grocery price lookup, savings tracking, pantry management, and community access.',
      },
      {
        id: 'ai-limits',
        question: 'Are there any limits on AI features?',
        answer: 'To keep our AI sustainable, we have generous daily limits on AI-powered features like recipe generation and post creation. Basic features like meal suggestions, ingredient substitutions, and recipe adjustments are unlimited. Limits reset every day at midnight.',
      },
    ],
  },
];

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Filter FAQs based on search query
  const filteredFaqs = useMemo(() => {
    if (!searchQuery.trim()) return faqs;

    const query = searchQuery.toLowerCase();
    return faqs.map(category => ({
      ...category,
      questions: category.questions.filter(
        q => q.question.toLowerCase().includes(query) ||
             q.answer.toLowerCase().includes(query)
      ),
    })).filter(category => category.questions.length > 0);
  }, [searchQuery]);

  // Keyboard shortcut for search (Cmd/Ctrl + K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
      if (e.key === 'Escape') {
        searchInputRef.current?.blur();
        setSearchQuery('');
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Scroll to category
  const scrollToCategory = (categoryId: string) => {
    setActiveCategory(categoryId);
    const element = document.getElementById(categoryId);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  // Track active category on scroll
  useEffect(() => {
    const handleScroll = () => {
      const categories = faqs.map(cat => document.getElementById(cat.id));
      const scrollPosition = window.scrollY + 150;

      for (let i = categories.length - 1; i >= 0; i--) {
        const category = categories[i];
        if (category && category.offsetTop <= scrollPosition) {
          setActiveCategory(faqs[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const totalResults = filteredFaqs.reduce((acc, cat) => acc + cat.questions.length, 0);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Docs Header */}
      <div className="border-b border-gray-200 bg-white sticky top-0 z-20">
        <div className="mx-auto max-w-[1920px] px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-6">
              {/* Logo */}
              <Link href="/" className="flex items-center">
                <Image
                  src="/GrubyLogo.svg"
                  alt="Gruby Logo"
                  width={100}
                  height={24}
                  className="w-auto"
                  style={{ height: 'clamp(1.25rem, 2vw, 1.5rem)' }}
                  priority
                />
              </Link>
              <div className="h-6 w-px bg-gray-200" />
              <div>
                <h1 className="text-lg font-semibold text-gray-900">Help Center</h1>
              </div>
            </div>

            {/* Search Bar */}
            <div className="relative w-full sm:max-w-md">
              <div className={`relative flex items-center transition-all ${isSearchFocused ? 'ring-2 ring-gray-900' : ''} border border-gray-300 rounded-lg bg-gray-50`}>
                <Search className="absolute left-3 h-4 w-4 text-gray-400" />
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search documentation..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                  className="w-full pl-10 pr-16 py-2.5 bg-transparent text-sm text-gray-900 placeholder-gray-500 focus:outline-none rounded-lg"
                />
                {searchQuery ? (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 p-1 hover:bg-gray-200 rounded"
                  >
                    <X className="h-4 w-4 text-gray-400" />
                  </button>
                ) : (
                  <div className="absolute right-3 hidden sm:flex items-center gap-1 text-xs text-gray-400">
                    <kbd className="px-1.5 py-0.5 bg-gray-200 rounded text-gray-500 font-mono">&#8984;</kbd>
                    <kbd className="px-1.5 py-0.5 bg-gray-200 rounded text-gray-500 font-mono">K</kbd>
                  </div>
                )}
              </div>
              {searchQuery && (
                <div className="absolute top-full left-0 right-0 mt-1 text-xs text-gray-500 px-1">
                  {totalResults} result{totalResults !== 1 ? 's' : ''} found
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 mx-auto max-w-[1920px] px-4 sm:px-6 lg:px-8 py-8 w-full">
        <div className="flex gap-8">
          {/* Sidebar Navigation */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <nav className="sticky top-24 space-y-1">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-3">Categories</p>
              {faqs.map((category) => {
                const hasResults = filteredFaqs.find(c => c.id === category.id)?.questions.length ?? 0;
                const isActive = activeCategory === category.id;

                return (
                  <button
                    key={category.id}
                    onClick={() => scrollToCategory(category.id)}
                    disabled={searchQuery !== '' && hasResults === 0}
                    className={`w-full text-left px-3 py-2 text-sm rounded-lg transition-colors flex items-center justify-between group ${
                      isActive
                        ? 'bg-gray-100 text-gray-900 font-medium'
                        : searchQuery && hasResults === 0
                        ? 'text-gray-300 cursor-not-allowed'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <span>{category.category}</span>
                    {searchQuery && hasResults > 0 && (
                      <span className="text-xs bg-gray-200 px-1.5 py-0.5 rounded text-gray-600">
                        {hasResults}
                      </span>
                    )}
                    {!searchQuery && (
                      <ChevronRight className={`h-4 w-4 transition-transform ${isActive ? 'rotate-90' : ''} opacity-0 group-hover:opacity-100`} />
                    )}
                  </button>
                );
              })}

              <div className="border-t border-gray-200 mt-6 pt-6">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-3">Resources</p>
                <a href="/privacy" className="block px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-lg">
                  Privacy Policy
                </a>
                <a href="/terms" className="block px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-lg">
                  Terms of Service
                </a>
                <a href="/community-guidelines" className="block px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-lg">
                  Community Guidelines
                </a>
              </div>
            </nav>
          </aside>

          {/* Content Area */}
          <main ref={contentRef} className="flex-1 min-w-0 max-w-4xl">
            {filteredFaqs.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                  <Search className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
                <p className="text-gray-500 mb-4">
                  We couldn&apos;t find anything matching &quot;{searchQuery}&quot;
                </p>
                <button
                  onClick={() => setSearchQuery('')}
                  className="text-sm text-gray-900 hover:underline"
                >
                  Clear search
                </button>
              </div>
            ) : (
              <div className="space-y-12">
                {filteredFaqs.map((category) => (
                  <section key={category.id} id={category.id}>
                    <h2 className="text-xl font-semibold text-gray-900 mb-6 pb-2 border-b border-gray-200">
                      {category.category}
                    </h2>
                    <div className="space-y-6">
                      {category.questions.map((faq) => (
                        <article
                          key={faq.id}
                          id={faq.id}
                          className="bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors"
                        >
                          <h3 className="text-base font-medium text-gray-900 mb-3">
                            {faq.question}
                          </h3>
                          <p className="text-sm text-gray-600 leading-relaxed">
                            {faq.answer}
                          </p>
                        </article>
                      ))}
                    </div>
                  </section>
                ))}
              </div>
            )}

            {/* Contact Section */}
            <section className="mt-16 p-8 bg-gray-900 rounded-2xl text-white">
              <h2 className="text-xl font-semibold mb-2">Still have questions?</h2>
              <p className="text-gray-400 mb-6">
                We&apos;re here to help! Reach out to our support team and we&apos;ll get back to you as soon as possible.
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="mailto:support@gruby.app"
                  className="inline-flex items-center px-4 py-2 bg-white text-gray-900 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors"
                >
                  Contact Support
                </a>
                <div className="flex items-center text-sm text-gray-400">
                  <span>Response time: 24-48 hours</span>
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>

      {/* Mobile Category Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-10">
        <select
          value={activeCategory || ''}
          onChange={(e) => scrollToCategory(e.target.value)}
          className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-sm"
        >
          <option value="" disabled>Jump to section...</option>
          {faqs.map((category) => (
            <option key={category.id} value={category.id}>
              {category.category}
            </option>
          ))}
        </select>
      </div>

      <div className="lg:pb-0 pb-20">
        <Footer />
      </div>
    </div>
  );
}
