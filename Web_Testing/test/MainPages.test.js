const { WebDriver, By, until } = require("selenium-webdriver");
const { expect } = require("chai");
const setupDriver = require("../utils/setupDriver");
const formatTime = require("../src/functions/convertTime");
const HomePage = require("../src/pages/home");
const AboutUsPage = require("../src/pages/aboutUs");
const OurPrintPage = require("../src/pages/ourPrint");
const BlogsPage = require("../src/pages/blogs");
const ContactUsPage = require("../src/pages/contactUs");
const AllProductsPage = require("../src/pages/allProducts");
const PresetPackPage = require("../src/pages/presetPack");
const ThankYouPage = require("../src/pages/thankYou");
const CartPage = require("../src/pages/cart");
const scroll = require("../src/functions/scroll");

describe.skip("Pages Test Website Swaglabs", () => {
  let time;
  /** @type {WebDriver} */ let driver;
  /** @type {HomePage} */ let homePage;
  /** @type {AboutUsPage} */ let aboutUsPage;
  /** @type {OurPrintPage} */ let ourPrintPage;
  /** @type {BlogsPage} */ let blogsPage;
  /** @type {ContactUsPage} */ let contactUsPage;
  /** @type {AllProductsPage} */ let allProductsPage;
  /** @type {PresetPackPage} */ let presetPackPage;
  /** @type {ThankYouPage} */ let thankYouPage;
  /** @type {CartPage} */ let cartPage;

  before(async () => {
    driver = await setupDriver();
    homePage = new HomePage(driver);
    aboutUsPage = new AboutUsPage(driver);
    ourPrintPage = new OurPrintPage(driver);
    blogsPage = new BlogsPage(driver);
    contactUsPage = new ContactUsPage(driver);
    allProductsPage = new AllProductsPage(driver);
    presetPackPage = new PresetPackPage(driver);
    thankYouPage = new ThankYouPage(driver);
    cartPage = new CartPage(driver);
  });
  afterEach(async function () {
    await driver.sleep(500);
  });
  after(async function () {
    await driver.close();
  });

  // Rapihkan nomor test lagi
  describe("Home Page", () => {
    let res;
    let title;
    let urlCheck;
    let titleCheck;
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

    it("MP_001_URL is correct", () => {
      expect(urlCheck).to.equal(true);
    });
    it("MP_002_Page is opened", () => {
      expect(titleCheck).include("Helping You Design, Shop");
    });
    it("MP_003_Select Preset Pack", async () => {
      await scroll(driver, 1450);
      await driver.sleep(1000);

      res = await homePage.selectPreset(0);
      title = await driver
        .wait(until.elementLocated(By.xpath("//h1[1]")))
        .getText();
      await driver.sleep(1000);
      expect(res).to.equal(title);

      await driver.navigate().back();
      await driver.sleep(1000);

      res = await homePage.selectPreset(2);
      await driver.sleep(1000);
      title = await driver
        .wait(until.elementLocated(By.xpath("//h1[1]")))
        .getText();
      await driver.sleep(1000);
      expect(res).to.equal(title);
      await driver.navigate().back();
    });
    it("MP_004_Select Custom Pack", async () => {
      await driver.wait(until.titleContains("Quality Corporate"), 2000);
      res = await homePage.selectCustom(0);
      await driver.wait(until.titleContains("Notebooks"), 2000);
      await driver.sleep(800);
      title = await driver
        .wait(until.elementLocated(By.xpath(`//h1[contains(.,'${res}')]`)))
        .getText();

      expect(res).to.equal(title);

      await driver.navigate().back();
      await driver.wait(until.titleContains("Quality Corporate"), 2000);

      //
      await driver.sleep(1000);
      res = await homePage.selectCustom(2);
      await driver.wait(until.titleContains("Backpacks"), 2000);
      await driver.sleep(1000);
      title = await driver
        .wait(until.elementLocated(By.xpath(`//h1[contains(.,'${res}')]`)))
        .getText();

      expect(res).to.equal(title);

      await driver.navigate().back();
      await driver.wait(until.titleContains("Quality Corporate"), 2000);
    });
    it("MP_005_Test Contact Form", async () => {
      const parent = 'form[@name="Contact-Form-1"]';

      await driver.sleep(1000);
      await scroll(driver, 1500);
      await driver.sleep(1000);
      // Fill form
      await driver
        .findElement(By.xpath(`//${parent}//input[@name="form_fields[name]"]`))
        .sendKeys("Test");
      await driver
        .findElement(By.xpath(`//${parent}//input[@name="form_fields[email]"]`))
        .sendKeys("test@mail.com");
      await driver
        .findElement(
          By.xpath(`//${parent}//input[@name="form_fields[message]"]`)
        )
        .sendKeys("083231441");
      await driver
        .findElement(
          By.xpath(`//${parent}//textarea[@name="form_fields[field_28e2101]"]`)
        )
        .sendKeys("Test Message");
      await driver
        .findElement(By.xpath(`//${parent}//button[@type="submit"]`))
        .click();
      // End Fill form
      await driver.wait(until.titleContains("Thank you"), 2000);

      const title = await driver
        .findElement(By.xpath(`//h2[contains(.,'Thank You!')]`))
        .getText();
      await driver.sleep(1000);
      expect(title).to.equal("Thank You!");
    });
  });

  describe("About Us Page", () => {
    let urlCheck;
    let titleCheck;

    before(async () => {
      performance.mark("Prepare-start");
      await aboutUsPage.openPage();
      urlCheck = await driver.wait(until.urlContains("about-us"), 2000);
      await driver.sleep(1000);
      titleCheck = await driver
        .wait(
          until.elementLocated(By.xpath('//div[@data-id="9670365"]//div//h1')),
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

    it("MP_006_URL is correct", () => {
      expect(urlCheck).to.equal(true);
    });
    it("MP_007_Open page", () => {
      expect(titleCheck).is.equal("About Us");
    });
    it("MP_008_Test Contact Form", async () => {
      const parent = 'form[@name="Contact-Form-1"]';

      await driver.sleep(1000);
      await scroll(driver, 1500);
      await driver.sleep(1000);
      // Fill form
      await driver
        .findElement(By.xpath(`//${parent}//input[@name="form_fields[name]"]`))
        .sendKeys("Test");
      await driver
        .findElement(By.xpath(`//${parent}//input[@name="form_fields[email]"]`))
        .sendKeys("test@mail.com");
      await driver
        .findElement(
          By.xpath(`//${parent}//input[@name="form_fields[message]"]`)
        )
        .sendKeys("083231441");
      await driver
        .findElement(
          By.xpath(`//${parent}//textarea[@name="form_fields[field_28e2101]"]`)
        )
        .sendKeys("Test Message");
      await driver
        .findElement(By.xpath(`//${parent}//button[@type="submit"]`))
        .click();
      // End Fill form
      await driver.wait(until.titleContains("Thank you"), 2000);

      const title = await driver
        .findElement(By.xpath(`//h2[contains(.,'Thank You!')]`))
        .getText();
      await driver.sleep(1000);
      expect(title).to.equal("Thank You!");
    });
  });

  describe("Our Prints Page", () => {
    let urlCheck;
    let titleCheck;
    before(async () => {
      performance.mark("Prepare-start");
      await ourPrintPage.openPage();
      urlCheck = await driver.wait(until.urlContains("prints"), 2000);
      await driver.sleep(1000);
      titleCheck = await driver
        .wait(
          until.elementLocated(By.xpath('//div[@data-id="077fe68"]//div//h1')),
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

    it("MP_009_URL is correct", () => {
      expect(urlCheck).to.equal(true);
    });
    it("MP_010_Open page", () => {
      expect(titleCheck).is.equal("Our Prints");
    });
  });

  describe("Blogs Page", () => {
    //div[@data-id="7df021ff"]//article[1]//a[@class="elementor-post__read-more"]
    let urlCheck;
    let titleCheck;
    let res;
    let articleTitle;
    before(async () => {
      performance.mark("Prepare-start");
      await blogsPage.openPage();
      urlCheck = await driver.wait(until.urlContains("blogs"), 2000);
      await driver.sleep(1000);
      titleCheck = await driver
        .wait(
          until.elementLocated(By.xpath('//div[@data-id="b72e7d7"]//div//h1')),
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

    it("MP_011_URL is correct", () => {
      expect(urlCheck).to.equal(true);
    });
    it("MP_012_Open page", () => {
      expect(titleCheck).is.equal("Blogs");
    });
    it("MP_013_Select Article", async () => {
      // Posting 1-3 title berbeda, pilih 4++
      res = await blogsPage.selectArticle(4);
      articleTitle = await driver.findElement(By.xpath(`//h1[1]`)).getText();
      expect(articleTitle.toLowerCase()).to.equal(res.toLowerCase());

      await driver.navigate().back();

      res = await blogsPage.selectArticle(6);
      articleTitle = await driver.findElement(By.xpath(`//h1[1]`)).getText();
      expect(articleTitle.toLowerCase()).to.equal(res.toLowerCase());
    });
  });

  describe("Contact Us Page", () => {
    let urlCheck;
    let titleCheck;
    before(async () => {
      performance.mark("Prepare-start");
      await contactUsPage.openPage();
      await driver.sleep(2000);
      urlCheck = await driver.wait(until.urlContains("contact-us"), 2000);
      await driver.sleep(300);
      titleCheck = await driver
        .wait(until.elementLocated(By.xpath("//h1[1]")), 5000)
        .getText();
    });

    after(() => {
      performance.mark("Prepare-finished");
      time = performance
        .measure("Prepare-time", "Prepare-start", "Prepare-finished")
        .duration.toFixed();
      formatTime(time);
    });

    it("MP_014_URL is correct", () => {
      expect(urlCheck).to.equal(true);
    });
    it("MP_015_Open page", () => {
      expect(titleCheck).is.equal("Contact Us");
    });
    it("MP_016_Test Contact Form", async () => {
      const parent = 'form[@name="Contact-Form-1"]';
      // Fill form
      await driver
        .findElement(By.xpath(`//${parent}//input[@name="form_fields[name]"]`))
        .sendKeys("Test");
      await driver
        .findElement(By.xpath(`//${parent}//input[@name="form_fields[email]"]`))
        .sendKeys("test@mail.com");
      await driver
        .findElement(
          By.xpath(`//${parent}//input[@name="form_fields[message]"]`)
        )
        .sendKeys("083231441");
      await driver
        .findElement(
          By.xpath(`//${parent}//textarea[@name="form_fields[field_28e2101]"]`)
        )
        .sendKeys("Test Message");
      await driver
        .findElement(By.xpath(`//${parent}//button[@type="submit"]`))
        .click();
      // End Fill form
      await driver.wait(until.titleContains("Thank you"), 2000);

      const title = await driver
        .findElement(By.xpath(`//h2[contains(.,'Thank You!')]`))
        .getText();
      await driver.sleep(1000);
      expect(title).to.equal("Thank You!");
    });
  });

  describe("Products Page", () => {
    let urlCheck;
    let titleCheck;
    let res;
    let title;
    let res2;
    let title2;
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

    it("MP_017_URL is correct", () => {
      expect(urlCheck).to.equal(true);
    });
    it("MP_018_Open page", () => {
      expect(titleCheck).is.equal("Products");
    });

    it("MP_019_Select product", async () => {
      // Pilih product dengan 1 kata [Baru packaging dan t-shirt yg punya var title]
      res = await allProductsPage.selectProduct("packaging");
      await driver.wait(until.titleContains(res));
      await driver.sleep(1000);
      title = await driver.findElement(By.xpath(`//h1[1]`)).getText();
      expect(title).to.equal(res);
    });
    it("MP_020_Select post", async () => {
      // Pilih item product
      res2 = await allProductsPage.selectPost(2);
      await driver.wait(until.titleContains(res2), 3000);
      title2 = await driver.findElement(By.xpath(`//h1`)).getText();
      expect(title2).to.equal(res2);
    });

    it("MP_021_Select product Dua", async () => {
      await allProductsPage.openPage();
      await driver.wait(until.titleContains("All Products"));
      // Pilih product dengan 1 kata [Baru packaging dan t-shirt yg punya var title]
      res = await allProductsPage.selectProduct("shirt");
      await driver.wait(until.titleContains("Shirt"), 3000);
      await driver.sleep(1000);
      title = await driver.findElement(By.xpath(`//h1[1]`)).getText();
      expect(title).to.equal(res);
    });
    it("MP_022_Select post Dus", async () => {
      // Pilih item product
      res2 = await allProductsPage.selectPost(5);
      await driver.wait(until.titleContains(res2));
      title2 = await driver.findElement(By.xpath(`//h1`)).getText();
      expect(title2).to.equal(res2);
    });
  });

  describe("Preset Packs Page", () => {
    let res;
    let title;
    let urlCheck;
    let titleCheck;
    before(async () => {
      performance.mark("Prepare-start");
      await presetPackPage.openPage();
      urlCheck = await driver.wait(until.urlContains("preset-packs"), 2000);
      await driver.sleep(1000);
      titleCheck = await driver
        .wait(
          until.elementLocated(By.xpath('//div[@data-id="9d753b5"]//div//h1')),
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

    it("MP_023_URL is correct", () => {
      expect(urlCheck).to.equal(true);
    });
    it("MP_024_Open page", () => {
      expect(titleCheck).is.equal("Preset Packs");
    });
    it("MP_025_Test", async () => {
      res = await presetPackPage.selectPack(4);
      await driver.sleep(2000);
      title = await driver.findElement(By.xpath(`//h1`)).getText();
      expect(title).to.equal(res);
    });
    it("MP_026_Test", async () => {
      await presetPackPage.openPage();
      await driver.sleep(1000);
      res = await presetPackPage.selectPack(3);
      await driver.sleep(2000);
      title = await driver.findElement(By.xpath(`//h1`)).getText();
      expect(title).to.equal(res);
    });
  });

  describe("Thank You Page", () => {
    let res;
    let title;
    let urlCheck;
    let titleCheck;
    before(async () => {
      performance.mark("Prepare-start");
      await thankYouPage.openPage();
      urlCheck = await driver.wait(until.urlContains("thank-you"), 2000);
      await driver.sleep(1000);
      titleCheck = await driver
        .wait(
          until.elementLocated(By.xpath('//div[@data-id="9577218"]//div//h2')),
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

    it("MP_027_URL is correct", () => {
      expect(urlCheck).to.equal(true);
    });
    it("MP_028_Open page", () => {
      expect(titleCheck).is.equal("Thank You!");
    });
    it("MP_029_Click Contact Us Button", async () => {
      res = await thankYouPage.button("contact");
      await driver.sleep(2000);
      title = await driver
        .wait(until.elementLocated(By.xpath("//h1[1]")), 5000)
        .getText();
      expect(title).to.equal(res);
    });
    it("MP_030_Click Back To Home Button", async () => {
      await driver.sleep(1000);
      await thankYouPage.openPage();
      await driver.sleep(1000);

      res = await thankYouPage.button("home");
      await driver.sleep(2000);

      title = await driver
        .wait(
          until.elementLocated(By.xpath('//div[@data-id="ded5840"]//div//h5')),
          2000
        )
        .getText();

      expect(title).to.contain(res);
    });
  });

  describe("Cart Page", () => {
    let urlCheck;
    let titleCheck;
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

    it("MP_031_URL is correct", () => {
      expect(urlCheck).to.equal(true);
    });
    it("MP_032_Open page", () => {
      expect(titleCheck).is.equal("Enquiry Cart");
    });
  });
});
