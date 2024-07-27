const { test, expect } = require("@playwright/test");
const LoginPage = require("../Pages/LoginPage");
const ProductPage = require("../Pages/ProductPage");

test.describe("Home Page Tests", () => {
  let loginPage;
  let productPage;
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page, expect);
    productPage = new ProductPage(page, expect);

    await loginPage.navigateToLoginPage();
    await loginPage.login("standard_user", "secret_sauce");
  });

  test.afterEach(async ({ page }) => {
    await page.close();
  });

  test("Verify that all products are displayed correctly", async () => {
    const productCount = await productPage.getProductsCount();
    expect(productCount).toBe(6);
  });

  test("Validate the product details (Name, Price, and Description)", async () => {
    const productDetails = await productPage.getProductDetails(0);
    expect(productDetails.name).toBeTruthy();
    expect(productDetails.price).toBeTruthy();
    expect(productDetails.description).toBeTruthy();
  });

  test("Test sorting functionality by price(High to Low)", async () => {
    await productPage.selectSortingOption("hilo");
    const sortedDetails = await productPage.getSortedProductDetails();
    const prices = sortedDetails.prices;
    const sortedPrices = [...prices].sort((a, b) => b - a);
    expect(prices).toEqual(sortedPrices);
  });

  test("Test sorting functionality by price(Low to High)", async () => {
    await productPage.selectSortingOption("lohi");
    const sortedDetails = await productPage.getSortedProductDetails();
    const prices = sortedDetails.prices;
    const sortedPrices = [...prices].sort((a, b) => a - b);
    expect(prices).toEqual(sortedPrices);
  });

  test("Test sorting functionality by name(Z to A)", async () => {
    await productPage.selectSortingOption("za");
    const sortedDetails = await productPage.getSortedProductDetails();
    const names = sortedDetails.names;
    const sortedNames = [...names].sort((a, b) => b.localeCompare(a));
    expect(names).toEqual(sortedNames);
  });

  test("Test sorting functionality by name(A to Z)", async () => {
    await productPage.selectSortingOption("az");
    const sortedDetails = await productPage.getSortedProductDetails();
    const names = sortedDetails.names;
    const sortedNames = [...names].sort((a, b) => a.localeCompare(b));
    expect(names).toEqual(sortedNames);
  });
});
