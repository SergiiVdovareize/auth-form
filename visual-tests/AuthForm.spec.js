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
  await delay(100);
  page.keyboard.press('Tab');
  await delay(100);
  page.keyboard.type('pass');
  await delay(100);
  await argosScreenshot(page, "Cleared warnings");

  page.getByTestId("password-visibility").click();
  await argosScreenshot(page, "Show password");
  
  page.getByTestId("submit-button").click();
  await argosScreenshot(page, "Submitted failing data");

  page.getByTestId("password-field").fill('passWor');
  await argosScreenshot(page, "Added uppercase");

  page.getByTestId("password-field").fill('passWord1');
  await argosScreenshot(page, "Added digit");

  page.getByTestId("password-visibility").click();
  await argosScreenshot(page, "Hide password");

  page.getByTestId("email-field").focus();
  await delay(100);
  page.keyboard.type('@mail.com');
  await delay(100);
  page.getByTestId("submit-button").click();
  await argosScreenshot(page, "Submitted valid data");
});
