import http from "k6/http";
import { group, check } from "k6";
import { Trend } from "k6/metrics";
import generateHeaders from "../../utils/generateHeader.js";
import check_status from "../../checks/check_status.js";

const productsTrend = new Trend("Products_Filter_byCategory");

/**
 * Fungsi memanggil Product berdasarkan Id kategori
 *
 * @export
 * @param {number} categoryId - id kategori [1 - 5, 8]
 * @param {number} [time=1000]
 */
export default function filter_byCategory(categoryId, time = 1000) {
  group("Filter by category", () => {
    const res = http.get(
      "https://api.escuelajs.co/api/v1/products/?categoryId=" + categoryId,
      generateHeaders("Products_Filter_byCategory")
    );

    productsTrend.add(res.timings.duration);

    check_status(res, time);
    check(res, {
      ["Category id is " + categoryId]: (r) => {
        return r.json().every((obj) => obj.category.id === categoryId);
      },
    });
  });
}
