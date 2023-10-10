const path = require("path");

const options = {
  hostname: "0.0.0.0",
  port: 4723,
  logLevel: "error",
  capabilities: {
    platformName: "Android",
    "appium:automationName": "UIAutomator2",
    "appium:deviceName": "emulator-5554",
    "appium:app": path.join(process.cwd(), "apk/travelo.apk"),
    "appium:appActivity": ".MainActivity",
    // "appium:noReset": true, // Tidak hapus data apk
  },
};

module.exports = options;
