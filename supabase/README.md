# Supabase Integration for Sokay Technologies

This directory contains the Supabase database schema and related files for the Sokay Technologies e-commerce platform.

## Database Schema

The `schema.sql` file contains the SQL statements to create the necessary tables and security policies for the application:

- **Products**: Store product information including name, description, price, images, category, and stock status
- **Orders**: Track customer orders with payment method and status
- **Subscribers**: Store email subscribers for marketing
- **User Roles**: View to easily access user role information

## Setting Up Your Supabase Database

1. Log in to your [Supabase Dashboard](https://supabase.com/dashboard)
2. Navigate to your project
3. Go to the SQL Editor
4. Copy and paste the contents of `schema.sql`
5. Run the SQL to create the tables and policies

## Row Level Security (RLS)

The schema includes Row Level Security policies to ensure data is protected:

- Products: Anyone can view, only admins can modify
- Orders: Users can view their own orders, admins can view all
- Subscribers: Anyone can subscribe, only admins can view the list

## Admin Setup

To set a user as an admin:

1. Create a user through Supabase Auth
2. Use the SQL Editor to run:
   ```sql
   SELECT set_user_admin('user-uuid-here');
   ```

## Environment Variables

Make sure your `.env.local` file contains:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Using the Supabase Client

Import the Supabase client in your components:

```typescript
import { supabase } from '@/lib/supabaseClient';
```

Or use the utility functions:

```typescript
import { getProducts, createOrder } from '@/lib/supabaseUtils';
```

## Authentication

The application uses Supabase Auth for user management. The `SupabaseProvider` component in `src/lib/SupabaseProvider.tsx` handles authentication state throughout the application.

Access the current user with:

```typescript
import { useSupabase } from '@/lib/SupabaseProvider';

function MyComponent() {
  const { user, session, isLoading, signOut } = useSupabase();
  
  // Use authentication data
}
```
