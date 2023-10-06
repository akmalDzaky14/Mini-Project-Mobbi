import http from "k6/http";
import { group, check } from "k6";
import { Trend } from "k6/metrics";
import generateHeaders from "../../utils/generateHeader.js";
import check_status from "../../checks/check_status.js";

const productsTrend = new Trend("Products_Delete");

/**
 * Fungsi delete sebuah product
 *
 * @export
 * @param {number} id - Id product yang ingin di hapus
 * @param {number} [time=1000]  - waktu (ms) eksekusi yang diharapkan
 */
export default function pro_delete(id, time = 1000) {
  group("Delete a product", () => {
    const res = http.del(
      "https://api.escuelajs.co/api/v1/products/" + id,
      generateHeaders("Products_Delete")
    );

    productsTrend.add(res.timings.duration);

    check_status(res, time);
    check(res, {
      "Callback is true": (r) => r.json() === true,
    });
  });
}
