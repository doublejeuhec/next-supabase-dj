# DJ Next.js Supabase Authentication

A Next.js application with Supabase authentication, featuring custom sign-in and sign-up forms with floating labels and multiple selectors for user information.

## Features

- Custom authentication forms with modern UI
- Floating label inputs for better user experience
- Multiple selector component for HEC associations
- Complete user profile creation with Supabase
- Company and job selectors

## Tech Stack

- Next.js 14 with App Router
- Supabase (Auth and Database)
- TypeScript
- Tailwind CSS
- Shadcn/UI components

## Getting Started

### Prerequisites

- Node.js 18+
- Supabase account and project

### Setup

1. Clone the repository
2. Install dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Set up environment variables:

Create a `.env.local` file with your Supabase credentials:

```
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

4. Apply the database schema:

Navigate to your Supabase project SQL editor and run the SQL from the `supabase/schema.sql` file.

5. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

6. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Authentication Flow

1. Users can sign up with email, password and additional profile information
2. Supabase sends a verification email
3. Upon verification, users can sign in
4. User profiles are stored in the `profiles` table

## Project Structure

- `/app` - Next.js app router pages
- `/components` - Reusable components
  - `/auth` - Authentication components
  - `/ui` - UI components from shadcn/ui
  - `/ui-expansion` - Custom UI components
- `/data` - Data files for dropdowns
  - `/hec` - HEC related data
- `/types` - TypeScript type definitions
- `/utils` - Utility functions
- `/supabase` - Supabase related files

## License

MIT
