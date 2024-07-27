class NavBar {
  constructor(page) {
    this.page = page;
    this.cartItmesNumber = page.locator(".shopping_cart_badge");
    this.cartIcon = page.locator(".shopping_cart_link");
    this.sideMenuButton = page.getByRole("button", { name: "Open Menu" });
    this.logoutButton = page.locator('[data-test="logout-sidebar-link"]');
  }

  async goToCart() {
    await this.cartIcon.click();
  }

  async getCartItmesNumber() {
    return await this.cartItmesNumber.textContent();
  }

  async checkVisibilityOfNumber() {
    const NumberVisibility = await this.cartItmesNumber.isVisible();
    if (NumberVisibility != true) return false;
    else return true;
  }

  async logoutAction() {
    await this.sideMenuButton.click();
    await this.logoutButton.click();
  }
}
module.exports = NavBar;
