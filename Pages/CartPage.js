class CartPage {
  constructor(page) {
    this.page = page;
    this.removeButton = page.locator(".btn_secondary");
    this.checkoutButton = page.locator(".checkout_button");
    this.cartItems = page.locator(".cart_item");
    this.cartproductName = page.locator(".inventory_item_name");
    this.cartProductPrice = page.locator(".inventory_item_price");
  }

  async removeProductFromCart(index) {
    await this.removeButton.nth(index).click();
  }

  async proceedToCheckout() {
    await this.checkoutButton.click();
  }

  async getCartItemsCount() {
    return await this.cartItems.count();
  }

  async getCartItemDetails(index) {
    const name = await this.cartproductName.nth(index).textContent();
    const price = await this.cartProductPrice.nth(index).textContent();
    return { name, price };
  }
}
module.exports = CartPage;
