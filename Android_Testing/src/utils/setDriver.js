const { remote } = require("webdriverio");

async function setDriver(options) {
  const DRIVER = await remote(options);
  return DRIVER;
}
module.exports = setDriver;
