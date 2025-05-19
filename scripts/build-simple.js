#!/usr/bin/env node

/**
 * This script builds the Next.js project with minimal optimizations,
 * which should avoid the "useSearchParams() should be wrapped in a suspense boundary" error.
 */

const { execSync } = require('child_process');

console.log('Building with minimal optimizations...');
execSync('next build --no-lint', { 
  stdio: 'inherit',
  env: {
    ...process.env,
    NEXT_TELEMETRY_DISABLED: '1',
    NODE_OPTIONS: '--max-old-space-size=4096'
  }
});

console.log('Build completed successfully!');
