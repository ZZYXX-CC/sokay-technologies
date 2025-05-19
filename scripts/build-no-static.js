#!/usr/bin/env node

/**
 * This script builds the Next.js project with the --no-static option,
 * which should avoid the "useSearchParams() should be wrapped in a suspense boundary" error.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Create a temporary .env.local file to disable static optimization
const envPath = path.join(process.cwd(), '.env.local');
let originalEnv = '';
let envExists = false;

if (fs.existsSync(envPath)) {
  envExists = true;
  originalEnv = fs.readFileSync(envPath, 'utf8');
  console.log('Backing up existing .env.local file...');
}

try {
  // Add environment variables to disable static optimization
  console.log('Adding environment variables to disable static optimization...');
  const envContent = `${envExists ? originalEnv + '\n' : ''}
# Added by build-no-static.js
NEXT_DISABLE_STATIC_OPTIMIZATION=true
`;
  fs.writeFileSync(envPath, envContent);

  // Run the build
  console.log('Running build with static optimization disabled...');
  execSync('next build', { 
    stdio: 'inherit',
    env: {
      ...process.env,
      NEXT_DISABLE_STATIC_OPTIMIZATION: 'true',
      NODE_OPTIONS: '--max-old-space-size=4096'
    }
  });
  console.log('Build completed successfully!');
} catch (error) {
  console.error('Build failed:', error);
} finally {
  // Restore the original .env.local file
  if (envExists) {
    console.log('Restoring original .env.local file...');
    fs.writeFileSync(envPath, originalEnv);
  } else {
    console.log('Removing temporary .env.local file...');
    fs.unlinkSync(envPath);
  }
}
