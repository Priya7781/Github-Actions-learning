import { test, expect } from '@playwright/test';

test('Validate Selected Environment URL', async ({ page, baseURL }) => {
  if (!baseURL) {
    throw new Error('Base URL is not defined in playwright.config.ts');
  }

  // Navigate to target URL configured in playwright.config.ts
  await page.goto(baseURL);

  // Validate the page URL matches the target environment URL
  const currentUrl = page.url();
  expect(currentUrl).toContain(new URL(baseURL).hostname);
});
