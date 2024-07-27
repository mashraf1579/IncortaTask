const { test, expect } = require("@playwright/test");
const LoginPage = require("../../Incorta Task/Pages/LoginPage");
const ProductPage = require("../Pages/ProductPage");

test.describe("Login Tests", () => {
  let loginPage;
  let productPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page, expect);
    productPage = new ProductPage(page, expect);
    await loginPage.navigateToLoginPage();
  });

  test.afterEach(async ({ page }) => {
    await page.close();
  });

  test("Login with valid credentials", async ({ page }) => {
    await loginPage.login("standard_user", "secret_sauce");
    await productPage.checkSuccessfulLogin();
  });

  test("Login with invalid username", async ({ page }) => {
    await loginPage.login("invalid_username", "secret_sauce");
    await loginPage.checkErrorMessage(
      "Epic sadface: Username and password do not match any user in this service"
    );
  });

  test("Login with invalid password", async ({ page }) => {
    await loginPage.login("standard_user", "invalid_password");
    await loginPage.checkErrorMessage(
      "Epic sadface: Username and password do not match any user in this service"
    );
  });
  test("Login with empty username", async ({ page }) => {
    await loginPage.login("", "secret_sauce");
    await loginPage.checkErrorMessage("Epic sadface: Username is required");
  });
  test("Login with empty passwprd", async ({ page }) => {
    await loginPage.login("standard_user", "");
    await loginPage.checkErrorMessage("Epic sadface: Password is required");
  });
});
