const page = require("./page");
const { WebDriver, until, By } = require("selenium-webdriver");

const Presets = ["b72b7e6", "c0b1e81", "7a69688", "60b1ab5"];
const Custom = ["d416047", "80825e1", "574e957", "a37ca92"];
class HomePage extends page {
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
    await this.openUrl("/");
  }
  async back() {
    await this.driver.navigate().back();
  }

  async selectPreset(presetNumber = 0) {
    const id = Presets[presetNumber];
    const data = await this.driver.wait(
      until.elementLocated(
        By.xpath(`//section[@data-id="9a9cd22"]//div[@data-id="${id}"]`)
      )
    );
    const presetText = data.getText();
    data.click();
    return presetText;
  }

  async selectCustom(customNumber = 0) {
    const id = Custom[customNumber];
    const data = await this.driver.wait(
      until.elementLocated(
        By.xpath(`//section[@data-id="759d9eb"]//div[@data-id="${id}"]`)
      )
    );

    const customText = data.getText();
    data.click();
    return customText;
  }
}

module.exports = HomePage;
