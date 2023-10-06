import http from "k6/http";
import { group, check } from "k6";
import { Trend } from "k6/metrics";
import generateHeaders from "../../utils/generateHeader.js";
import check_status from "../../checks/check_status.js";

const productsTrend = new Trend("Products_Filter_byPrice");

/**
 * Fungsi filter product berdasarkan harga.
 * Akan mengembalikan list product dengan harga yang sama dengan parameter price.
 *
 * @export
 * @param {number} price - Harga product yang dicari
 * @param {number} [time=1000] - waktu (ms) eksekusi yang diharapkan
 */
export default function filter_byPrice(price, time = 1000) {
  group("Filter by price", () => {
    const res = http.get(
      "https://api.escuelajs.co/api/v1/products?price=" + price,
      generateHeaders("Products_Filter_byPrice")
    );

    productsTrend.add(res.timings.duration);

    check_status(res, time);
    check(res, {
      ["First Product have price " + price]: (r) => {
        return r.json().every((obj) => obj.price === price);
      },
    });
  });
}
