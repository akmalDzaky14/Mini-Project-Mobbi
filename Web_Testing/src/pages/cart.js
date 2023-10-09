const page = require("./page");
const { WebDriver } = require("selenium-webdriver");

class cartPage extends page {
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
    await this.openUrl("/enquiry-cart");
  }
  async back() {
    await this.driver.navigate().back();
  }
}

module.exports = cartPage;
