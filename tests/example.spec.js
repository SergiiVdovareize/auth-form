import { argosScreenshot } from "@argos-ci/playwright"
import { expect, test } from "@playwright/test"

test('Verify home page designs', async ({ page }) => {
  await page.goto("/")
  // await expect(page.getByAltText("Vercel Logo")).toBeVisible()
  // await expect(page.getByAltText("Next.js Logo")).toBeVisible()
  await argosScreenshot(page, "Homepage")
})