# Supabase Connection Guide

## Fix Authentication Error

Based on the error messages, you need to properly configure Supabase for both your web application and the Supabase CLI/MCP tools.

### 1. Configure Web Application Connection

Create a `.env.local` file in the root of your sokay-website project with the following variables:

```
# Supabase configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Payment processing
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=your_paystack_public_key
PAYSTACK_SECRET_KEY=your_paystack_secret_key

# Email service
RESEND_API_KEY=your_resend_api_key
ADMIN_EMAIL=admin@sokaytechnologies.com

# Development settings
NEXT_PUBLIC_SHOW_IMAGES_LOCALLY=true
```

Replace `your_supabase_project_url` and `your_supabase_anon_key` with the actual values from your Supabase project dashboard.

### 2. Configure Supabase CLI/MCP

The error message indicates that the Supabase CLI or MCP tools need an access token. Follow these steps:

1. Log in to Supabase via CLI:
   ```
   supabase login
   ```

2. Or set the access token via environment variable:
   ```
   export SUPABASE_ACCESS_TOKEN=your_access_token
   ```

You can get an access token from the Supabase dashboard:
- Go to https://supabase.com/dashboard
- Click on your profile in the bottom left
- Go to 'Account Settings'
- Click on 'Access Tokens'
- Generate a new token or copy an existing one

### 3. Test Connection

After setting up the environment variables, test the connection with:

```bash
node test-supabase-connection.js
```

### 4. Verify in Application

Start the development server:

```bash
npm run dev
```

If everything is correctly set up, the application should connect to Supabase without errors.

## Additional Steps for Deployment

For Vercel deployment, make sure to add all the environment variables in the Vercel project settings:

1. Go to your project in the Vercel dashboard
2. Navigate to Settings > Environment Variables
3. Add all the variables from your `.env.local` file

## Troubleshooting

If you're still encountering issues:

1. Verify your Supabase project is active and not in maintenance mode
2. Check that your IP address is not being blocked by Supabase
3. Ensure your API keys have not expired or been revoked
4. Try recreating your anon key in the Supabase dashboard
5. Check that the Row Level Security policies allow the operations you're attempting 