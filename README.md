# Gruby Web

A budgeting-focused cooking companion web application designed to show people the real financial impact of cooking at home. Gruby connects food lovers with talented home cooks in their neighborhood and helps users save money by comparing delivery costs with home-cooked meal prices.

## Features

- 🍳 **Home Cook Marketplace** - Discover and connect with local home cooks
- 💰 **Price Comparison** - Compare delivery app costs with home-cooked meal prices using real Kroger store data
- 📊 **Savings Tracking** - Track how much you save by cooking at home
- 🛒 **Grocery List Automation** - Build shopping lists from recipes instantly
- 👥 **Community** - Join a community of home cooks sharing recipes and growing together
- 🎨 **Modern UI** - Beautiful, responsive design built with Next.js and Tailwind CSS

## Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org) with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL with [Drizzle ORM](https://orm.drizzle.team)
- **Authentication**: [Clerk](https://clerk.com)
- **State Management**: Redux Toolkit
- **UI Components**: Radix UI, shadcn/ui
- **Payments**: Stripe
- **API Integration**: Kroger API for real-time grocery prices

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, or bun
- PostgreSQL database
- Clerk account (for authentication)
- Stripe account (for payments)
- Kroger API credentials (optional, for price comparison)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/itzkennedydev/Gruby-Web.git
cd Gruby-Web
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
bun install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/gruby"

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key

# Kroger API (optional)
KROGER_CLIENT_ID=your_kroger_client_id
KROGER_CLIENT_SECRET=your_kroger_client_secret

# Next.js
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

4. Set up the database:
```bash
npm run db:push
# or
npm run db:migrate
```

5. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
grubWeb/
├── src/
│   ├── app/              # Next.js app router pages
│   │   ├── (pages)/      # Route groups
│   │   │   ├── MarketingPage.tsx
│   │   │   ├── MainPage.tsx
│   │   │   └── home-cook-onboarding/
│   │   └── api/          # API routes
│   │       └── kroger/   # Kroger API integration
│   ├── components/       # React components
│   ├── lib/              # Utility functions
│   │   └── kroger-api.ts # Kroger API service
│   └── store/            # Redux store
├── drizzle/              # Database migrations
└── public/               # Static assets
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:generate` - Generate database migrations
- `npm run db:push` - Push schema changes to database
- `npm run db:migrate` - Run database migrations
- `npm run db:studio` - Open Drizzle Studio

## Key Features

### Marketing Page
A comprehensive landing page showcasing:
- App features and benefits
- Price comparison between delivery apps and home cooking
- Community benefits
- Waitlist signup

### Home Cook Marketplace
- Browse local home cooks
- View cook profiles and specialties
- Filter by cuisine type
- View ratings and reviews

### Price Comparison
- Real-time grocery prices from Kroger stores
- Compare delivery costs vs. home-cooked meals
- Calculate savings per meal
- Track monthly savings

## Environment Variables

### Required
- `DATABASE_URL` - PostgreSQL connection string
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` - Clerk publishable key
- `CLERK_SECRET_KEY` - Clerk secret key

### Optional
- `KROGER_CLIENT_ID` - Kroger API client ID
- `KROGER_CLIENT_SECRET` - Kroger API client secret (server-side only)
- `STRIPE_SECRET_KEY` - Stripe secret key
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` - Stripe publishable key

**Note**: Never commit `.env.local` or expose sensitive credentials. The Kroger client secret should only be used server-side.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is private and proprietary.

## Contact

For questions or support, please open an issue on GitHub.

---

Built with ❤️ by the Gruby team
