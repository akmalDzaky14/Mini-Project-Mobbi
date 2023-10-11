const { WebDriver, By, until } = require("selenium-webdriver");
const { expect } = require("chai");

const BlogsPage = require("../../src/pages/blogs");
const setupDriver = require("../../utils/setupDriver");
const formatTime = require("../../src/functions/convertTime");

describe("Smoke Test Blogs Page", () => {
  let urlCheck;
  let titleCheck;
  let res;
  let articleTitle;
  let time;
  /** @type {WebDriver} */ let driver;
  /** @type {BlogsPage} */ let blogsPage;

  before(async () => {
    driver = await setupDriver();
    blogsPage = new BlogsPage(driver);
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

  it("ST_Blogs_01_URL is correct", () => {
    expect(urlCheck).to.equal(true);
  });
  it("ST_Blogs_02_Open page", () => {
    expect(titleCheck).is.equal("Blogs");
  });
  it("ST_Blogs_03_Select Article", async () => {
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
