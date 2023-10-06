import http from "k6/http";
import { group, check } from "k6";
import { Trend } from "k6/metrics";
import generateHeaders from "../../utils/generateHeader.js";
import check_status from "../../checks/check_status.js";

const productsTrend = new Trend("Products_Filter_byPriceRange");

/**
 * Fungsi filter product berdasarkan kisaran harga sesuai parameter price_min dan price_max.
 *
 * @export
 * @param {*} price_min - Harga minimal pencarian
 * @param {*} price_max - Harga maksimal pencarian
 * @param {number} [time=1000] - waktu (ms) eksekusi yang diharapkan
 */
export default function filter_byPriceRange(price_min, price_max, time = 1000) {
  group("Filter by price range ", () => {
    const res = http.get(
      "https://api.escuelajs.co/api/v1/products/?price_min=" +
        price_min +
        "&price_max=" +
        price_max,
      generateHeaders("Products_Filter_byPriceRange")
    );

    productsTrend.add(res.timings.duration);

    check_status(res, time);
    check(res, {
      ["Every Product price between " + price_min + " and " + price_max]: (r) =>
        r
          .json()
          .every((obj) => obj.price >= price_min && obj.price <= price_max),
    });
  });
}
