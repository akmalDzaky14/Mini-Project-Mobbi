const { expect } = require("chai");
const { WebDriver, By, until } = require("selenium-webdriver");

const HomePage = require("../../src/pages/home");
const scroll = require("../../src/functions/scroll");
const setupDriver = require("../../utils/setupDriver");
const formatTime = require("../../src/functions/convertTime");

describe("Component Test Home Page", () => {
  let res;
  let time;
  let title;
  let urlCheck;
  let titleCheck;
  /** @type {WebDriver} */ let driver;
  /** @type {HomePage} */ let homePage;

  before(async () => {
    driver = await setupDriver();
    performance.mark("Prepare-start");

    homePage = new HomePage(driver);
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

  it("CT_Home Page_001_URL is correct", () => {
    expect(urlCheck).to.equal(true);
  });
  it("CT_Home Page_002_Page is opened", () => {
    expect(titleCheck).include("Helping You Design, Shop");
  });
  it("CT_Home Page_003_Select Preset Pack", async () => {
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
  it("CT_Home Page_004_Select Custom Pack", async () => {
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
  it("CT_Home Page_005_Test Contact Form", async () => {
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
      .findElement(By.xpath(`//${parent}//input[@name="form_fields[message]"]`))
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
