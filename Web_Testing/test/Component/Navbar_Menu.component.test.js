/**
 * Delay dulu, buat android. lanjut kalau masih ada waktu
 * [hanya positive]
 * Top Navbar menu
 *
 * [positive dan negative]
 * Option yang ada di /product/selected-product/post (seperti Size, Color, dll)
 * Tombol Add to cart
 * Form Get in touch atau Contact Us
 * Form 'Leave a comment' pada Blogs -> pilih 1 postingan
 * Form di Cart
 */
const { WebDriver, By, until } = require("selenium-webdriver");
const { expect } = require("chai");

const formatTime = require("../../src/functions/convertTime");
const setupDriver = require("../../utils/setupDriver");

describe("Smoke Test Top Navbar Menu", () => {
  /** @type {WebDriver} */ let driver;

  before(async () => {
    driver = await setupDriver();
    performance.mark("Prepare-start-all");
  });
  afterEach(async () => {
    await driver.sleep(500);
  });
  after(async () => {
    await driver.close();
    performance.mark("Prepare-finished-all");
    const totalTime = performance
      .measure("Prepare-time-all", "Prepare-start-all", "Prepare-finished-all")
      .duration.toFixed();
    formatTime(totalTime, true);
  });

  it("ST_01_Home", async () => {
    await driver.get("https://swaglabs.in/about-us/");

    await driver
      .findElement(
        By.xpath(
          `//section[@data-id="7b39696"]//div[@data-id="6c1d68c"]//ul[@id="menu-1-c2a71a6"]/li[1]/a`
        )
      )
      .click();

    await driver
      .wait(until.titleIs("Swag Labs - Quality Corporate Merchandise"))
      .then((res) => {
        expect(res).to.equal(true);
      }, 2000);
  });
  it("ST_02_About Us", async () => {
    await driver
      .findElement(
        By.xpath(
          `//section[@data-id="7b39696"]//div[@data-id="6c1d68c"]//ul[@id="menu-1-c2a71a6"]/li[2]/a`
        )
      )
      .click();

    await driver.wait(until.titleIs("Swag Labs - About Us")).then((res) => {
      expect(res).to.equal(true);
    }, 2000);
  });
  it("ST_03_Our Prints", async () => {
    await driver
      .findElement(
        By.xpath(
          `//section[@data-id="7b39696"]//div[@data-id="6c1d68c"]//ul[@id="menu-1-c2a71a6"]/li[3]/a`
        )
      )
      .click();

    await driver.wait(until.titleIs("Swag Labs - Our Prints")).then((res) => {
      expect(res).to.equal(true);
    }, 2000);
  });
  it("ST_04_All Products", async () => {
    const parent = `//section[@data-id="7b39696"]//div[@data-id="6c1d68c"]//ul[@id="menu-1-c2a71a6"]/li[4]`;

    await driver.findElement(By.xpath(`${parent}`)).click();

    await driver
      .wait(
        until.elementLocated(By.xpath(`${parent}//ul[@aria-hidden="false"]`)),
        2000
      )
      .catch((e) => {
        throw new Error(e);
      });

    await driver.findElement(By.xpath(`${parent}//li[1]/a`)).click();

    await driver.wait(until.titleIs("Swag Labs - All Products")).then((res) => {
      expect(res).to.equal(true);
    }, 2000);
  });
  it("ST_05_Preset Packs", async () => {
    const parent = `//section[@data-id="7b39696"]//div[@data-id="6c1d68c"]//ul[@id="menu-1-c2a71a6"]/li[4]`;

    await driver.findElement(By.xpath(`${parent}`)).click();

    await driver
      .wait(
        until.elementLocated(By.xpath(`${parent}//ul[@aria-hidden="false"]`)),
        2000
      )
      .catch((e) => {
        throw new Error(e);
      });

    await driver.findElement(By.xpath(`${parent}//li[2]/a`)).click();

    await driver.wait(until.titleIs("Swag Labs - Preset Packs")).then((res) => {
      expect(res).to.equal(true);
    }, 2000);
  });
  it("ST_06_Blogs", async () => {
    await driver
      .findElement(
        By.xpath(
          `//section[@data-id="7b39696"]//div[@data-id="6c1d68c"]//ul[@id="menu-1-c2a71a6"]/li[5]/a`
        )
      )
      .click();

    await driver.wait(until.titleIs("Blogs - Swag Labs")).then((res) => {
      expect(res).to.equal(true);
    }, 2000);
  });
  it("ST_07_Contact Us", async () => {
    await driver
      .findElement(
        By.xpath(
          `//section[@data-id="7b39696"]//div[@data-id="6c1d68c"]//ul[@id="menu-1-c2a71a6"]/li[6]/a`
        )
      )
      .click();

    await driver.wait(until.titleIs("Swag Labs - Contact Us")).then((res) => {
      expect(res).to.equal(true);
    }, 2000);
  });
});
