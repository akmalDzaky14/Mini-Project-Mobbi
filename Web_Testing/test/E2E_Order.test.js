/**
 * Test dari awal buka website hingga submit pesanan
 */
const { WebDriver, By, until } = require("selenium-webdriver");
const { expect } = require("chai");
const setupDriver = require("../utils/setupDriver");
const formatTime = require("../src/functions/convertTime");
const HomePage = require("../src/pages/home");
const AllProductsPage = require("../src/pages/allProducts");
const PresetPackPage = require("../src/pages/presetPack");
const CartPage = require("../src/pages/cart");
const ThankYouPage = require("../src/pages/thankYou");
const inputToCart = require("../src/functions/inputItemtoCart");

describe("End to End Test Website Swaglabs", () => {
  let res;
  let time;
  let title;
  let urlCheck;
  let titleCheck;
  let itemData = [];
  let itemTitles = [];

  /** @type {WebDriver} */ let driver;
  /** @type {HomePage} */ let homePage;
  /** @type {AllProductsPage} */ let allProductsPage;
  /** @type {CartPage} */ let cartPage;

  before(async () => {
    driver = await setupDriver();
    homePage = new HomePage(driver);
    allProductsPage = new AllProductsPage(driver);
    presetPackPage = new PresetPackPage(driver);
    thankYouPage = new ThankYouPage(driver);
    cartPage = new CartPage(driver);

    performance.mark("Prepare-start-all");
  });
  afterEach(async function () {
    await driver.sleep(500);
  });
  after(async function () {
    await driver.close();
    performance.mark("Prepare-finished-all");
    const totalTime = performance
      .measure("Prepare-time-all", "Prepare-start-all", "Prepare-finished-all")
      .duration.toFixed();
    formatTime(totalTime, true);
  });

  describe("E2E_001_Buka Halaman Home [Mulai]", () => {
    before(async () => {
      performance.mark("Prepare-start");
      await homePage.openPage();
      await driver.wait(until.titleContains("Quality Corporate"), 2000);
      urlCheck = await driver.wait(until.urlContains("swaglabs.in"), 2000);
      titleCheck = await driver
        .wait(
          until.elementLocated(By.xpath('//div[@data-id="ded5840"]//div//h5')),
          2000
        )
        .getText();
    });
    after(() => {
      performance.mark("Prepare-finished");
      time = performance
        .measure("Prepare-time", "Prepare-start", "Prepare-finished")
        .duration.toFixed();
      formatTime(time);
    });

    it("URL is correct", () => {
      expect(urlCheck).to.equal(true);
    });
    it("Page is opened", () => {
      expect(titleCheck).include("Helping You Design, Shop");
    });
  });
  describe("E2E_002_Buka Halaman Products", () => {
    before(async () => {
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
    after(() => {
      performance.mark("Prepare-finished");
      time = performance
        .measure("Prepare-time", "Prepare-start", "Prepare-finished")
        .duration.toFixed();
      formatTime(time);
    });

    it("URL is correct", () => {
      expect(urlCheck).to.equal(true);
    });
    it("Page is opened", () => {
      expect(titleCheck).is.equal("Products");
    });
  });
  describe("E2E_003_Pilih satu Product", () => {
    before(() => {
      performance.mark("Prepare-start");
    });
    after(() => {
      performance.mark("Prepare-finished");
      time = performance
        .measure("Prepare-time", "Prepare-start", "Prepare-finished")
        .duration.toFixed();
      formatTime(time);
    });

    it("Select product", async () => {
      // Pilih product dengan 1 kata [Baru packaging dan t-shirt yg punya var title]
      res = await allProductsPage.selectProduct("packaging");
      await driver.wait(until.titleContains(res));
      await driver.sleep(1000);
      title = await driver.findElement(By.xpath(`//h1[1]`)).getText();
      expect(title).to.equal(res);
    });
  });
  describe("E2E_004_Masukkan 2 Item ke Keranjang", () => {
    before(() => {
      performance.mark("Prepare-start");
    });
    after(() => {
      performance.mark("Prepare-finished");
      time = performance
        .measure("Prepare-time", "Prepare-start", "Prepare-finished")
        .duration.toFixed();
      formatTime(time);
    });

    it("Select item 1", async () => {
      // Pilih item product
      res = await allProductsPage.selectPost(2);
      await driver.wait(until.titleContains(res), 3000);
      title = await driver.findElement(By.xpath(`//h1`)).getText();
      expect(title).to.equal(res);

      await driver.sleep(1000);
      const inputReturn = await inputToCart(driver, "Multicolor Box", 1);
      itemTitles.push(inputReturn.title);
      itemData.push(inputReturn.data);
      await driver.sleep(500);

      await driver
        .findElement(By.xpath(`//button[@data-action="pi_add_to_enquiry"]`))
        .click();
      await driver.sleep(500);
    });
    it("Back to list items", async () => {
      await driver.navigate().back();
      await driver.sleep(1000);
    });
    it("Select item 2", async () => {
      // Pilih item product
      res = await allProductsPage.selectPost(3);
      await driver.wait(until.titleContains(res), 3000);
      title = await driver.findElement(By.xpath(`//h1`)).getText();
      expect(title).to.equal(res);

      await driver.sleep(1000);
      const inputReturn = await inputToCart(driver, "Color", 5);
      itemTitles.push(inputReturn.title);
      itemData.push(inputReturn.data);
      await driver.sleep(500);

      await driver
        .findElement(By.xpath(`//button[@data-action="pi_add_to_enquiry"]`))
        .click();
      await driver.sleep(500);
    });
  });
  describe("E2E_005_Buka Halaman Keranjang/Cart", () => {
    before(async () => {
      performance.mark("Prepare-start");
      await cartPage.openPage();
      urlCheck = await driver.wait(until.urlContains("enquiry-cart"), 2000);
      await driver.sleep(1000);
      titleCheck = await driver
        .wait(
          until.elementLocated(
            By.xpath('//article[@id="post-844"]//header//h1')
          ),
          5000
        )
        .getText();
    });
    after(() => {
      performance.mark("Prepare-finished");
      time = performance
        .measure("Prepare-time", "Prepare-start", "Prepare-finished")
        .duration.toFixed();
      formatTime(time);
    });

    it("URL is correct", () => {
      expect(urlCheck).to.equal(true);
    });
    it("Open page", () => {
      expect(titleCheck).is.equal("Enquiry Cart");
    });

    it("Check Items", async () => {
      const all = await driver.wait(
        until.elementsLocated(By.css(`.shop_table tbody tr`)),
        10000
      );
      for (let index = 1; index < all.length - 1; index++) {
        const text = await driver
          .findElement(By.xpath(`//tbody/tr[${index}]//td[3]`))
          .getText();
        expect(text).to.include(itemTitles[index - 1]);
        expect(text).to.include(itemData[index - 1]);
      }
    });

    it("Isi Form", async () => {
      const parent = '//form[@id="pi-eqw-enquiry-form"]';
      // Fill form
      await driver
        .findElement(By.xpath(`${parent}//input[@name="pi_name"]`))
        .sendKeys("Test");
      await driver
        .findElement(By.xpath(`${parent}//input[@name="pi_email"]`))
        .sendKeys("test@mail.com");
      await driver
        .findElement(By.xpath(`${parent}//input[@name="pi_phone"]`))
        .sendKeys("083231441");
      await driver
        .findElement(By.xpath(`//select[@name="quantity"]/option[${2}]`))
        .click();
      await driver
        .findElement(By.xpath(`${parent}//input[@name="pi_subject"]`))
        .sendKeys("Test Subject");
      await driver
        .findElement(By.xpath(`${parent}//textarea[@name="pi_message"]`))
        .sendKeys("Test Message");
    });
  });
  describe("E2E_006_Submit Pesanan [Selesai]", async () => {
    const checkbox = await driver.findElement(
      By.xpath(`${parent}//input[@type="checkbox"]`)
    );
    await checkbox.click();

    await driver
      .findElement(By.xpath(`${parent}//input[@type="submit"]`))
      .click();
    // End Fill form
    await driver.wait(until.titleContains("Thank you"), 2000);
  });
});
