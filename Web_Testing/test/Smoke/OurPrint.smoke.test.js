const { expect } = require("chai");
const { WebDriver, By, until } = require("selenium-webdriver");

const setupDriver = require("../../utils/setupDriver");
const OurPrintPage = require("../../src/pages/ourPrint");
const formatTime = require("../../src/functions/convertTime");

describe("Smoke Test Our Prints Page", () => {
  let urlCheck;
  let titleCheck;
  /** @type {WebDriver} */ let driver;
  /** @type {OurPrintPage} */ let ourPrintPage;

  before(async () => {
    driver = await setupDriver();
    ourPrintPage = new OurPrintPage(driver);

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

  it("ST_Our Prints_01_URL is correct", () => {
    expect(urlCheck).to.equal(true);
  });
  it("ST_Our Prints_02_Open page", () => {
    expect(titleCheck).is.equal("Our Prints");
  });
});
