const { expect } = require("chai");
const { WebDriver, By, until } = require("selenium-webdriver");

const setupDriver = require("../../utils/setupDriver");
const ThankYouPage = require("../../src/pages/thankYou");
const formatTime = require("../../src/functions/convertTime");

describe("Component Test Thank You Page", () => {
  let res;
  let title;
  let urlCheck;
  let titleCheck;
  let time;
  /** @type {WebDriver} */ let driver;
  /** @type {ThankYouPage} */ let thankYouPage;

  before(async () => {
    driver = await setupDriver();
    thankYouPage = new ThankYouPage(driver);
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

  it("CT_Thank You_01_URL is correct", () => {
    expect(urlCheck).to.equal(true);
  });
  it("CT_Thank You_02_Open page", () => {
    expect(titleCheck).is.equal("Thank You!");
  });
  it("CT_Thank You_03_Click Contact Us Button", async () => {
    res = await thankYouPage.button("contact");
    await driver.sleep(2000);
    title = await driver
      .wait(until.elementLocated(By.xpath("//h1[1]")), 5000)
      .getText();
    expect(title).to.equal(res);
  });
  it("CT_Thank You_04_Click Back To Home Button", async () => {
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
