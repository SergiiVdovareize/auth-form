import { argosScreenshot } from "@argos-ci/playwright";
import { test } from "@playwright/test";

const delay = (ms) => {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
};

test('Auth Form flow', async ({ page, }) => {
  await page.goto("/");
  await argosScreenshot(page, "Plain Auth Form");

  page.getByTestId("submit-button").click();
  await argosScreenshot(page, "Submitted empty fields");

  page.getByTestId("email-field").fill("bob");
  page.keyboard.press('Tab');
  page.keyboard.type('pass');
  await argosScreenshot(page, "Cleared warnings");

  page.getByTestId("password-visibility").click();
  await argosScreenshot(page, "Show password");

  page.getByTestId("submit-button").click();
  await argosScreenshot(page, "Submitted failing data");

  page.getByTestId("password-field").focus();
  await delay(100);
  page.keyboard.type('Wor');
  await argosScreenshot(page, "Added uppercase");

  page.keyboard.type('d1');
  await argosScreenshot(page, "Added digit");

  page.getByTestId("password-visibility").click();
  await argosScreenshot(page, "Hide password");

  page.getByTestId("email-field").focus();
  await delay(100);
  page.keyboard.type('@mail.com');
  page.getByTestId("submit-button").click();
  await argosScreenshot(page, "Submitted valid data");
});