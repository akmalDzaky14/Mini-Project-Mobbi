async function scrollDown(driver, x) {
  await driver.actions().scroll(0, 0, 0, x).perform();
}

module.exports = scrollDown;
