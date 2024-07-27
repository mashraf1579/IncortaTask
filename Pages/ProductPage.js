class ProductPage {
  constructor(page, expect) {
    this.page = page;
    this.expect = expect;
    this.homePageTitle = page.locator('[class="title"]');
    this.productItem = page.locator(".inventory_item");
    this.productName = page.locator(".inventory_item_name");
    this.productPrice = page.locator(".inventory_item_price");
    this.productDescription = page.locator(".inventory_item_desc");
    this.sortingDropdownButton = page.locator(
      '[data-test="product-sort-container"]'
    );
    this.addToCartButton = page.locator(".btn_inventory");
  }

  async checkSuccessfulLogin() {
    await this.expect(this.homePageTitle).toHaveText("Products");
  }

  async getProductsCount() {
    return await this.productItem.count();
  }

  async getProductDetails(index) {
    const name = await this.productName.nth(index).textContent();
    const price = await this.productPrice.nth(index).textContent();
    const description = await this.productDescription.nth(index).textContent();
    return { name, price, description };
  }

  async selectSortingOption(option) {
    await this.sortingDropdownButton.selectOption(option);
  }

  async getSortedProductDetails() {
    const names = await this.productName.allTextContents();
    const prices = await this.productPrice.allTextContents();
    return { names, prices };
  }

  async addProductToCart(index) {
    await this.addToCartButton.nth(index).click();
  }
}
module.exports = ProductPage;
