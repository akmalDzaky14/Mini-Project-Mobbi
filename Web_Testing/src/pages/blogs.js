const { expect } = require("chai");
const page = require("./page");
const { WebDriver, until, By } = require("selenium-webdriver");

class blogsPage extends page {
  /**
   * Membuat instance halaman login.
   *
   * @param {WebDriver} driver Driver WebDriver yang digunakan untuk berinteraksi dengan halaman.
   */
  constructor(driver) {
    super(driver);
  }

  /**
   * Membuka halaman login.
   *
   * @returns {Promise<void>}
   */
  async openPage() {
    await this.openUrl("/blogs");
  }
  async back() {
    await this.driver.navigate().back();
  }
  async selectArticle(selectedArticle = 1) {
    const parent = `//div[@data-id="7df021ff"]//article[${selectedArticle}]`;
    let postTitle = await this.driver
      .findElement(By.xpath(`${parent}//h3/a`))
      .getText();
    await this.driver
      .wait(
        until.elementLocated(
          By.xpath(`${parent}//a[@class="elementor-post__read-more"]`)
        )
      )
      .click();
    await this.driver.sleep(2000);
    return postTitle;
  }
}

module.exports = blogsPage;
