import { test, expect } from '@playwright/test'

test('calls dashboard has title', async ({ page }) => {
  await page.goto('http://localhost:5173/calls')

  const locator = page.locator('#calls-dashboard-title')

  await expect(locator).toHaveText(/Calls Dashboard/)
})
