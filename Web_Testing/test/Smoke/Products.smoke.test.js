const { expect } = require("chai");
const { WebDriver, By, until } = require("selenium-webdriver");

const setupDriver = require("../../utils/setupDriver");
const formatTime = require("../../src/functions/convertTime");
const AllProductsPage = require("../../src/pages/allProducts");

describe("Smoke Test Products Page", () => {
  let urlCheck;
  let titleCheck;
  let res;
  let title;
  let res2;
  let title2;
  let time;
  /** @type {WebDriver} */ let driver;
  /** @type {AllProductsPage} */ let allProductsPage;

  before(async () => {
    driver = await setupDriver();
    allProductsPage = new AllProductsPage(driver);
    performance.mark("Prepare-start");
    await allProductsPage.openPage();
    urlCheck = await driver.wait(until.urlContains("products"), 2000);
    await driver.sleep(1000);
    titleCheck = await driver
      .wait(
        until.elementLocated(By.xpath('//div[@data-id="8bec761"]//div//h1')),
        5000
      )
      .getText();
  });
  afterEach(async function () {
    await driver.sleep(500);
  });
  after(async () => {
    performance.mark("Prepare-finished");
    time = performance
      .measure("Prepare-time", "Prepare-start", "Prepare-finished")
      .duration.toFixed();
    await driver.close();

    formatTime(time);
  });

  it("ST_Products_01_URL is correct", () => {
    expect(urlCheck).to.equal(true);
  });
  it("ST_Products_02_Open page", () => {
    expect(titleCheck).is.equal("Products");
  });

  it("ST_Products_03_Select product", async () => {
    // Pilih product dengan 1 kata [Baru packaging dan t-shirt yg punya var title]
    res = await allProductsPage.selectProduct("packaging");
    await driver.wait(until.titleContains(res));
    await driver.sleep(1000);
    title = await driver.findElement(By.xpath(`//h1[1]`)).getText();
    expect(title).to.equal(res);
  });
  it("ST_Products_04_Select post", async () => {
    // Pilih item product
    res2 = await allProductsPage.selectPost(2);
    await driver.wait(until.titleContains(res2), 3000);
    title2 = await driver.findElement(By.xpath(`//h1`)).getText();
    expect(title2).to.equal(res2);
  });

  it("ST_Products_05_Select product Dua", async () => {
    await allProductsPage.openPage();
    await driver.wait(until.titleContains("All Products"));
    // Pilih product dengan 1 kata [Baru packaging dan t-shirt yg punya var title]
    res = await allProductsPage.selectProduct("shirt");
    await driver.wait(until.titleContains("Shirt"), 3000);
    await driver.sleep(1000);
    title = await driver.findElement(By.xpath(`//h1[1]`)).getText();
    expect(title).to.equal(res);
  });
  it("ST_Products_06_Select post Dus", async () => {
    // Pilih item product
    res2 = await allProductsPage.selectPost(5);
    await driver.wait(until.titleContains(res2));
    title2 = await driver.findElement(By.xpath(`//h1`)).getText();
    expect(title2).to.equal(res2);
  });
});
