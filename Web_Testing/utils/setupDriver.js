const { Builder, Browser } = require("selenium-webdriver");

/**
 * Mengatur driver untuk browser Edge
 *
 * @return {Promise<WebDriver>} - Promise yang mengembalikan driver
 */
async function setupDriver() {
  const driver = await new Builder().forBrowser(Browser.EDGE).build();
  await driver.manage().window().setRect({ width: 1920, height: 1080 });
  return driver;
}

module.exports = setupDriver;
