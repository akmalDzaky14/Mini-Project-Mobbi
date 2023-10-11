const { WebDriver, By, until } = require("selenium-webdriver");
const { expect } = require("chai");

const CartPage = require("../../src/pages/cart");
const setupDriver = require("../../utils/setupDriver");
const formatTime = require("../../src/functions/convertTime");

describe("Component Test Cart Page", () => {
  let time;
  let urlCheck;
  let titleCheck;
  /** @type {WebDriver} */ let driver;
  /** @type {CartPage} */ let cartPage;

  before(async () => {
    driver = await setupDriver();
    cartPage = new CartPage(driver);
    performance.mark("Prepare-start");
    await cartPage.openPage();
    urlCheck = await driver.wait(until.urlContains("enquiry-cart"), 2000);
    await driver.sleep(1000);
    titleCheck = await driver
      .wait(
        until.elementLocated(By.xpath('//article[@id="post-844"]//header//h1')),
        5000
      )
      .getText();
  });
  afterEach(async function () {
    await driver.sleep(500);
  });
  after(async function () {
    performance.mark("Prepare-finished");
    time = performance
      .measure("Prepare-time", "Prepare-start", "Prepare-finished")
      .duration.toFixed();
    await driver.close();
    formatTime(time);
  });

  it("CT_Cart_01_URL is correct", () => {
    expect(urlCheck).to.equal(true);
  });
  it("CT_Cart_02_Open page", () => {
    expect(titleCheck).is.equal("Enquiry Cart");
  });
});
