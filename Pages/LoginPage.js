class LoginPage {
  constructor(page, expect) {
    this.page = page;
    this.expect = expect;
    this.usernameField = page.locator("#user-name");
    this.passwordField = page.locator("#password");
    this.loginButton = page.locator("#login-button");
    this.errorMessage = page.locator('[data-test="error"]');
    this.loginPageUsernamesAndPasswordDiv = page.locator(
      '[data-test="login-credentials-container"] div'
    );
  }

  async navigateToLoginPage() {
    await this.page.goto("https://www.saucedemo.com/");
  }

  async login(username, password) {
    await this.usernameField.fill(username);
    await this.passwordField.fill(password);
    await this.loginButton.click();
  }

  async checkErrorMessage(ErrorMessage) {
    await this.expect(this.errorMessage).toContainText(ErrorMessage);
  }

  async checkSuccessfulLogout() {
    await this.expect(
      this.loginPageUsernamesAndPasswordDiv.first()
    ).toBeVisible();
  }
}
module.exports = LoginPage;
