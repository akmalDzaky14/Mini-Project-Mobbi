const { expect } = require("chai");
const { WebDriver, By, until } = require("selenium-webdriver");

const setupDriver = require("../../utils/setupDriver");
const PresetPackPage = require("../../src/pages/presetPack");
const formatTime = require("../../src/functions/convertTime");

describe("Component Test Preset Packs Page", () => {
  let res;
  let title;
  let urlCheck;
  let titleCheck;
  let time;
  /** @type {WebDriver} */ let driver;
  /** @type {PresetPackPage} */ let presetPackPage;

  before(async () => {
    driver = await setupDriver();
    presetPackPage = new PresetPackPage(driver);
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

  after(async () => {
    performance.mark("Prepare-finished");
    time = performance
      .measure("Prepare-time", "Prepare-start", "Prepare-finished")
      .duration.toFixed();
    await driver.close();
    afterEach(async function () {
      await driver.sleep(500);
    });
    formatTime(time);
  });

  it("CT_Preset Packs_01_URL is correct", () => {
    expect(urlCheck).to.equal(true);
  });
  it("CT_Preset Packs_02_Open page", () => {
    expect(titleCheck).is.equal("Preset Packs");
  });
  it("CT_Preset Packs_03_Test", async () => {
    res = await presetPackPage.selectPack(4);
    await driver.sleep(2000);
    title = await driver.findElement(By.xpath(`//h1`)).getText();
    expect(title).to.equal(res);
  });
  it("CT_Preset Packs_04_Test", async () => {
    await presetPackPage.openPage();
    await driver.sleep(1000);
    res = await presetPackPage.selectPack(3);
    await driver.sleep(2000);
    title = await driver.findElement(By.xpath(`//h1`)).getText();
    expect(title).to.equal(res);
  });
});
