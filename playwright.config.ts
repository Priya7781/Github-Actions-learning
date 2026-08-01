import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env file for local development
dotenv.config({ path: path.resolve(__dirname, '.env') });

import { envUrls } from './config/env.config';

const selectedEnv = (process.env.TARGET_ENV || 'ST').toUpperCase();
const targetBaseURL = envUrls[selectedEnv] || envUrls.ST;

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['html', { open: 'never' }],
    ['list'],
    ['github']
  ],
  use: {
    baseURL: targetBaseURL,
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
