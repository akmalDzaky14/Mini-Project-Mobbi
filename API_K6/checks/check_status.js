import { check } from "k6";

/**
 * Fungsi untuk memeriksa kode status callback API
 *
 * @export
 * @param {object} res - object callback API
 * @param {number} time - waktu (ms) eksekusi yang diharapkan
 * @param {number} [statusCode = 200] - Kode yang akan diperiksa (optional) [200 or 201]
 */
export default function (res, time, statusCode = 200) {
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

  check(res, {
    [statusMessage]: (r) => {
      if (r.status !== statusCode) {
        console.log(r.json().message);
        throw new Error(
          `Expected status code ${statusCode}, but got ${r.status}`
        );
      }
      return true;
    },
    ["transaction duration less than " + time]: (r) =>
      r.timings.duration < time,
  });
}
