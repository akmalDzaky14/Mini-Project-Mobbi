const page = require("./page");
const { WebDriver } = require("selenium-webdriver");

class AboutUsPage extends page {
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
    await this.openUrl("/about-us/");
  }
  async back() {
    await this.driver.navigate().back();
  }
}

module.exports = AboutUsPage;
