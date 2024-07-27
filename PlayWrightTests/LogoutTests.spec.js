const { test, expect } = require("@playwright/test");
const LoginPage = require("../../Incorta Task/Pages/LoginPage");
const NavBar = require("../../Incorta Task/Pages/NavBar");
test.describe("Logout Tests", () => {
  let loginPage;
  let navBar;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page, expect);
    navBar = new NavBar(page);

    await loginPage.navigateToLoginPage();
    await loginPage.login("standard_user", "secret_sauce");
  });

  test("Check Logout functionality and  redirection to the Login Page", async ({
    page,
  }) => {
    await navBar.logoutAction();
    await loginPage.checkSuccessfulLogout();
  });
});
