import http from "k6/http";
import { group, check } from "k6";
import { Trend } from "k6/metrics";
import generateHeaders from "../../utils/generateHeader.js";
import check_status from "../../checks/check_status.js";

const productsTrend = new Trend("Products_Pagination");

/**
 * Fungsi filter product berdasarkan paramter offset dan limit.
 * Contoh: offset=20 & limit=10	Return products from 20 to 30
 *
 * @export
 * @param {number} offset - Skip pencarian
 * @param {number} limit - Batas pencarian
 * @param {number} [time=1000] - waktu (ms) eksekusi yang diharapkan
 */
export default function pro_pagination(offset, limit, time = 1000) {
  group("Pagination", () => {
    const res = http.get(
      "https://api.escuelajs.co/api/v1/products?offset=" +
        offset +
        "&limit=" +
        limit,
      generateHeaders("Products_Pagination")
    );

    productsTrend.add(res.timings.duration);

    check_status(res, time);
    check(res, {
      // Tidak bisa cek id karena data tidak konsisten
      ["Products length is " + limit]: (r) => r.json().length === limit,
    });
  });
}
