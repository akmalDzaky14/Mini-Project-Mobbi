import http from "k6/http";
import { group, check } from "k6";
import { Trend } from "k6/metrics";
import check_status from "../../checks/check_status.js";
import generateHeaders from "../../utils/generateHeader.js";

const productsTrend = new Trend("Products_Get_One_or_All");

/**
 * Fungsi mendapatkan semua atau satu product, tergantung parameter id product.
 * Jika id tidak di isi maka return semua product
 *
 * @export
 * @param {number} [time = 1000] - waktu (ms) eksekusi yang diharapkan
 * @param {number} id - id product yang ingin didapatkan (optional)
 */
export default function pro_getAllorOne(time = 1000, id) {
  if (!id) {
    group("Get all products", () => {
      const res = http.get(
        "https://api.escuelajs.co/api/v1/products/",
        generateHeaders("Products_Get_All")
      );

      productsTrend.add(res.timings.duration);

      check_status(res, time);
    });
    return;
  }
  group("Get a single product", () => {
    const res = http.get(
      "https://api.escuelajs.co/api/v1/products/" + id,
      generateHeaders("Products_Get_One")
    );

    productsTrend.add(res.timings.duration);

    check_status(res, time);
    check(res, {
      ["Product id is " + id]: (r) => r.json().id === id,
    });
  });
}
