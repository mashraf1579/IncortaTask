const { test, expect } = require("@playwright/test");
const LoginPage = require("../../Incorta Task/Pages/LoginPage");
const ProductPage = require("../Pages/ProductPage");
const NavBar = require("../../Incorta Task/Pages/NavBar");
const CartPage = require("../../Incorta Task/Pages/CartPage");
const CheckoutPage = require("../../Incorta Task/Pages/CheckoutPage");

test.describe("Cart Tests", () => {
  let loginPage;
  let productPage;
  let navBar;
  let cartPage;
  let checkoutPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page, expect);
    productPage = new ProductPage(page, expect);
    navBar = new NavBar(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page, expect);

    await loginPage.navigateToLoginPage();
    await loginPage.login("standard_user", "secret_sauce");
  });

  test("Add a product to the shopping cart and verify the cart is updated", async () => {
    await productPage.addProductToCart(0);
    await navBar.goToCart();
    const itemsCount = await cartPage.getCartItemsCount();
    const cartCount = await navBar.getCartItmesNumber();
    await expect(itemsCount.toString()).toBe(cartCount);
  });

  test("Remove a product from the cart and ensure the cart is updated correctly", async () => {
    await productPage.addProductToCart(0);
    await navBar.goToCart();
    await cartPage.removeProductFromCart(0);
    const itemsCount = await cartPage.getCartItemsCount();
    await expect(itemsCount).toBe(0);
  });

  test("Test the checkout process", async () => {
    await productPage.addProductToCart(0);
    await navBar.goToCart();
    await cartPage.proceedToCheckout();
    await checkoutPage.completeCheckout("Mohamed", "Ashraf", "123456");
    await checkoutPage.checkSuccessfulCheckout("Thank you for your order!");
  });

  test("Verify shopping cart badge count updates correctly", async () => {
    await productPage.addProductToCart(0);
    let cartCount = await navBar.getCartItmesNumber();
    await expect(cartCount).toBe("1");
    await navBar.goToCart();
    await cartPage.removeProductFromCart(0);
    await expect(await navBar.checkVisibilityOfNumber()).toBe(false);
  });
});
