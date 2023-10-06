import http from "k6/http";
import { group, check } from "k6";
import { Trend } from "k6/metrics";
import generateHeaders from "../../utils/generateHeader.js";
import check_status from "../../checks/check_status.js";

const productsTrend = new Trend("Products_Filter_byTitle");

/**
 * Fungsi mencari product berdasarkan title/judul product.
 *
 * @export
 * @param {string} title - Judul product yang dicari
 * @param {number} [time=1000] - waktu (ms) eksekusi yang diharapkan
 */
export default function filter_byTitle(title, time = 1000) {
  group("Filter by title", () => {
    const res = http.get(
      "https://api.escuelajs.co/api/v1/products/?title=" + title,
      generateHeaders("Products_Filter_byTitle")
    );

    productsTrend.add(res.timings.duration);

    check_status(res, time);
    check(res, {
      // return r.json().every((el) => el.title.includes(title));
      ["Product title contain word " + title]: (r) => {
        return r.json().every((obj) => obj.title.includes(title));
      },
    });
  });
}
