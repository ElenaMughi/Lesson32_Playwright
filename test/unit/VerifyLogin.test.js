const user = require("../../user.js");
const { test, expect } = require("@playwright/test");

test.beforeEach(async ({ page }) => {
  await page.goto("https://netology.ru/");
  await page.locator("text=Войти").click();
  
  await expect(page).toHaveURL("https://netology.ru/?modal=sign_in");
});

test.afterEach(async () => {});

test.describe("VerifyLogin", () => {
  test("correctLogin", async ({ page }) => {
    await page.locator('[placeholder="Email"]').click();
    await page.locator('[placeholder="Email"]').fill(user.userTry.login);

    await page.locator('[placeholder="Пароль"]').click();
    await page.locator('[placeholder="Пароль"]').fill(user.userTry.password);

    await Promise.all([
      page.waitForNavigation(/*{ url: 'https://netology.ru/profile' }*/),
      page.locator('[data-testid="login-submit-btn"]').click()
    ]);

    await expect(page.locator('[data-testid="menu-userface"] div')).toBeVisible();
  });

  test("noCorrectLogin", async ({ page }) => {
    await page.locator('[placeholder="Email"]').click();
    await page.locator('[placeholder="Email"]').fill(user.userFalse.login);

    await page.locator('[placeholder="Пароль"]').click();
    await page.locator('[placeholder="Пароль"]').fill(user.userFalse.password);

    await page.locator('[data-testid="login-submit-btn"]').click();

    await expect(page.locator('[data-testid="login-error-hint"]')).toBeVisible();
  });
});
