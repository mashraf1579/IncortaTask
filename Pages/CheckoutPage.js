class CheckoutPage {
  constructor(page, expect) {
    this.page = page;
    this.expect = expect;
    this.firstNameField = page.locator('[data-test="firstName"]');
    this.lastNameField = page.locator('[data-test="lastName"]');
    this.zibCodeField = page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test="continue"]');
    this.cancelButton = page.locator();
    this.finishButton = page.locator('[data-test="finish"]');
    this.checkoutSuccesseMessage = page.locator(
      '[data-test="complete-header"]'
    );
    this.backHomeButton = page.locator('[data-test="back-to-products"]');
  }

  async completeCheckout(firstName, lastName, zibCode) {
    await this.firstNameField.fill(firstName);
    await this.lastNameField.fill(lastName);
    await this.zibCodeField.fill(zibCode);
    await this.continueButton.click();
    await this.finishButton.click();
  }

  async checkSuccessfulCheckout(SuccesseMessage) {
    await this.expect(this.checkoutSuccesseMessage).toHaveText(SuccesseMessage);
  }
  async goToHome() {
    await this.backHomeButton.click();
  }
}
module.exports = CheckoutPage;
