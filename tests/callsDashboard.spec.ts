import { test, expect } from '@playwright/test'

test('calls dashboard has title', async ({ page }) => {
  await page.goto('http://localhost:5173/calls')

  const locator = page.locator('#calls-dashboard-title')

  await expect(locator).toHaveText(/Calls Dashboard/)
})

test('calls table successfully loaded with data', async ({ page }) => {
  await page.goto('http://localhost:5173/calls')
  await page.waitForRequest(
    (request) =>
      request.url().includes('api.skilla.ru/mango/getList') &&
      request.method() === 'POST',
  )

  const response = await page.waitForResponse(
    (response) =>
      response.url().includes('api.skilla.ru/mango/getList') &&
      response.status() === 200,
  )

  // response have elements
  const apiData = await response.json()
  expect(apiData.results.length).toBeGreaterThan(0)

  // calls table have phone number in first row
  const callsTable = page.locator('#calls-table')
  const firstCallTableRowPhoneNumber = callsTable.locator('.to-number').first()
  await expect(firstCallTableRowPhoneNumber).toHaveText(/.+/)
})
