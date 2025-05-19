# Sokay Technologies Website

A modern e-commerce website for Sokay Technologies built with Next.js, featuring a responsive landing page and integrated online store with Paystack payment processing.

## Project Overview

This project is a complete revamp of the Sokay Technologies website, providing:

- A modern, responsive landing page that reflects the brand's innovation
- An integrated online store where Sokay can upload/manage products
- Customer checkout with Paystack or Cash on Delivery (COD) options
- Admin dashboard for product and order management

## Tech Stack

- **Frontend:** Next.js, 21stDev (component library & utilities), ShadCN UI
- **Backend:** Supabase (PostgreSQL + auth + storage)
- **Payments:** Paystack (API integration)
- **Emails:** Resend (transactional & notification emails)
- **Hosting:** Vercel (preferred for Next.js apps)

## Features

### Landing Page
- Hero section with product highlights
- Overview of Sokay Technologies' offerings
- Product categories showcase
- Testimonials section
- Newsletter subscription (integrated with Resend)

### Online Store
- Product listing with search and filtering
- Product details with image gallery
- Shopping cart functionality
- Checkout with Paystack and COD options
- Order confirmation emails

### Admin Dashboard
- Product management (add/edit/delete)
- Order management and status updates
- Customer information
- Basic analytics

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn
- Supabase account
- Paystack account
- Resend account

### Installation

1. Clone the repository

```bash
git clone <repository-url>
cd sokay-website
```

2. Install dependencies

```bash
npm install
# or
yarn install
```

3. Set up environment variables

Create a `.env.local` file in the root directory with the following variables:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=your_paystack_public_key
PAYSTACK_SECRET_KEY=your_paystack_secret_key
RESEND_API_KEY=your_resend_api_key
ADMIN_EMAIL=admin@sokaytechnologies.com
```

4. Run the development server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
src/
├── app/                  # Next.js app router pages
├── components/           # React components
│   ├── admin/            # Admin dashboard components
│   ├── home/             # Landing page components
│   ├── layout/           # Layout components (header, footer)
│   ├── store/            # E-commerce components
│   └── ui/               # UI components (ShadCN)
├── lib/                  # Utility functions and API clients
│   ├── paystack/         # Paystack integration
│   ├── resend/           # Email service integration
│   ├── store/            # State management
│   ├── supabaseClient.ts # Supabase client initialization
│   ├── supabaseUtils.ts  # Database utility functions
│   └── SupabaseProvider.tsx # Authentication provider
```

## Supabase MCP Integration

This project uses Supabase MCP (Model Context Protocol) integration to allow AI assistants like Windsurf to interact with the Supabase database. The integration includes:

- Supabase client setup in `src/lib/supabaseClient.ts`
- Database utility functions in `src/lib/supabaseUtils.ts`
- Authentication provider in `src/lib/SupabaseProvider.tsx`
- Database schema in `supabase/schema.sql`

For more details on the Supabase integration, see the [supabase/README.md](./supabase/README.md) file.

## Deployment

The easiest way to deploy this Next.js app is to use the [Vercel Platform](https://vercel.com/new) from the creators of Next.js.

## License

This project is proprietary and owned by Sokay Technologies.
