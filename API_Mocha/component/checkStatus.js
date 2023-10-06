const { expect } = require("chai");

/**
 * Fungsi memeriksa status callback
 *
 * @param {object} res - object callback dari fungsi fetchAPI
 * @param {number} [statusCode=200] - kode status (optional)
 */
async function checkStatus(res, statusCode = 200) {
  let statusMessage = "";

  switch (statusCode) {
    case 200:
      statusMessage = "status is 200";
      break;
    case 201:
      statusMessage = "status is 201";
      break;
    default:
      throw new Error(`Invalid status code: ${statusCode}`);
  }
  expect(res.status, statusMessage).is.equal(statusCode);
}
module.exports = checkStatus;
