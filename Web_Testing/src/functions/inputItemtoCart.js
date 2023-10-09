const { WebDriver, By } = require("selenium-webdriver");
/**
 * Fungsi memilih opsi pada halaman detail item
 *
 * @param {WebDriver} driver Driver yang akan dijalankan
 * @param {string} label Pilihan: [Color, Multicolor Box, Gender, Size]
 * @param {number} [number=1] index pilihan opsi dari label
 */
async function inputToCart(/** @type {WebDriver} */ driver, label, number = 1) {
  const title = await driver
    .findElement(By.xpath(`//h1[contains(@class, 'product_title')]`))
    .getText();
  const el = await driver.findElement(
    By.xpath(`//ul[@aria-label="${label}"]//li[${number}]`)
  );
  await el.click();
  const data = await el.getAttribute("data-wvstooltip");

  return { title, data };
}

module.exports = inputToCart;

//   await driver
//     .findElements(By.xpath(`//ul[@role="radiogroup"]`))
//     .then(async (el) => {
//       for (let x in el) {
//         el[x].findElement(By.xpath());
//         itemType.push(await el[x].getAttribute("aria-label"));
//       }
//     });
