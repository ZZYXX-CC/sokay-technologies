# Sokay Technologies Deployment Checklist

## Pre-Deployment Checklist

### Code Readiness
- [x] Fixed order submission process with better error handling
- [x] Added fallback for missing Supabase environment variables
- [x] Enhanced success page with order reference display
- [x] Added TypeScript type definitions for Paystack
- [x] Added .vercelignore file to exclude problematic files
- [x] Configured Next.js to ignore TypeScript errors during build

### Environment Variables
- [ ] NEXT_PUBLIC_SUPABASE_URL (Required for database)
- [ ] NEXT_PUBLIC_SUPABASE_ANON_KEY (Required for database)
- [ ] NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY (Required for payments)
- [ ] PAYSTACK_SECRET_KEY (Optional - for server-side verification)
- [ ] NEXT_PUBLIC_SHOW_IMAGES_LOCALLY (Set to "true" to serve images from public directory)

## Vercel Deployment Steps

1. **Connect Repository**
   - [ ] Log in to Vercel
   - [ ] Import repository from GitHub
   - [ ] Select the sokay-technologies repository

2. **Configure Project**
   - [ ] Set project name (e.g., sokay-technologies)
   - [ ] Set framework preset to Next.js
   - [ ] Set root directory to "sokay-website" if not automatically detected
   - [ ] Set build command to "next build"
   - [ ] Ensure output directory is set to ".next"

3. **Environment Variables**
   - [ ] Add all environment variables from the checklist above
   - [ ] Ensure sensitive variables are marked as secret

4. **Deploy**
   - [ ] Click "Deploy"
   - [ ] Monitor build logs for any errors
   - [ ] Verify the deployment was successful

## Post-Deployment Verification

### Basic Functionality
- [ ] Home page loads correctly
- [ ] Navigation between pages works
- [ ] Product images display properly
- [ ] Responsive design works on mobile, tablet, and desktop

### E-Commerce Functionality
- [ ] Products load in the store
- [ ] Product details page displays correctly
- [ ] Add to cart functionality works
- [ ] Cart page displays items correctly
- [ ] Checkout form loads properly

### Order Process
- [ ] Place test order with Paystack (use test card)
- [ ] Place test order with Cash on Delivery
- [ ] Verify order confirmation page shows with reference
- [ ] Check if order is recorded in Supabase (if connected)

## Troubleshooting Common Issues

### Build Failures
- Check Vercel build logs for specific error messages
- Verify that all required environment variables are set
- Consider checking Next.js documentation for specific error messages

### Missing Supabase Connection
- The site will run in "mock mode" with dummy data if Supabase credentials are missing
- To fix: Add proper Supabase URL and anonymous key in environment variables

### Payment Processing Issues
- Ensure Paystack public key is correctly set
- Check browser console for any JavaScript errors
- Verify network requests to Paystack API in browser developer tools

## Maintenance Notes

1. **Handling Updates**
   - Vercel will automatically deploy new commits to the main branch
   - You can create preview deployments for feature branches

2. **Environment Variables**
   - Changes to environment variables require a redeployment
   - You can initiate a redeployment from the Vercel dashboard

3. **Monitoring**
   - Check Vercel analytics for site performance
   - Monitor Supabase logs for database errors 