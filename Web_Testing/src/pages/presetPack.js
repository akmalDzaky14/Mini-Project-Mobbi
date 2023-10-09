const page = require("./page");
const { WebDriver, until, By } = require("selenium-webdriver");

const Packs = [
  "82f5421",
  "9dc716b",
  // 7e021cc link ke /jackets
  "7e021cc",
  "2e16fe6",
  "c8d5fa3",
  "0143230",
  "e32d84c",
  "87caacf",
];
class presetPackPage extends page {
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
    await this.openUrl("/preset-packs");
  }
  async back() {
    await this.driver.navigate().back();
  }
  async selectPack(param = 0) {
    const id = Packs[param];
    const parent = `//div[@data-id="${id}"]`;

    const el = await this.driver.wait(
      until.elementLocated(
        By.xpath(`${parent}//span[@class="elementor-button-text"]`)
      )
    );
    const title = el.getText();
    el.click();
    return title;
  }
}

module.exports = presetPackPage;
