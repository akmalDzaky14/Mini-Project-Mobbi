const { expect } = require("chai");
const { WebDriver, By, until } = require("selenium-webdriver");

const setupDriver = require("../../utils/setupDriver");
const ContactUsPage = require("../../src/pages/contactUs");
const formatTime = require("../../src/functions/convertTime");

describe("Component Test Form in Contact Us Page", () => {
  let time;
  let urlCheck;
  let titleCheck;
  /** @type {WebDriver} */ let driver;
  /** @type {ContactUsPage} */ let contactUsPage;

  before(async () => {
    driver = await setupDriver();
    contactUsPage = new ContactUsPage(driver);
    performance.mark("Prepare-start");
    await contactUsPage.openPage();
    await driver.sleep(2000);
    urlCheck = await driver.wait(until.urlContains("contact-us"), 2000);
    await driver.sleep(300);
    titleCheck = await driver
      .wait(until.elementLocated(By.xpath("//h1[1]")), 5000)
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

  it("CT_Form_01_Fill Form", async () => {
    const parent = 'form[@name="Contact-Form-1"]';
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
