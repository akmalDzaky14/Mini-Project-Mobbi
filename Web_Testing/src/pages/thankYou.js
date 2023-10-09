const page = require("./page");
const { WebDriver, By } = require("selenium-webdriver");

const id = {
  contact: { id: "4bb0c3b", title: "Contact Us" },
  home: { id: "12b7059", title: "Helping You Design, Shop" },
};
class thankYouPage extends page {
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
    await this.openUrl("/thank-you");
  }
  async back() {
    await this.driver.navigate().back();
  }
  async button(param) {
    const parent = `//div[@data-id="${id[param].id}"]//a`;
    await this.driver.findElement(By.xpath(`${parent}`)).click();
    return id[param].title;
  }
}

module.exports = thankYouPage;
