import http from "k6/http";
import { group, check } from "k6";
import { Trend } from "k6/metrics";
import generateHeaders from "../../utils/generateHeader.js";
import check_status from "../../checks/check_status.js";

const categoriesTrend = new Trend("Categories_All_or_One");

/**
 * Fungsi mendapatkan satu atau seluruh kategori tergantung parameter categoryId.
 * Jika categoryId tidak di isi maka akan mengambil seluruh kategori.
 *
 * @export
 * @param {number} [time=1000] - waktu (ms) eksekusi yang diharapkan
 * @param {number} categoryId - id kategori (optional)
 * @return
 */
export default function cat_getAll_or_One(time = 1000, categoryId) {
  if (!categoryId) {
    group("Get all categories", () => {
      const res = http.get(
        "https://api.escuelajs.co/api/v1/categories",
        generateHeaders("Categories_All")
      );

      categoriesTrend.add(res.timings.duration);

      check_status(res, time);
    });
    return;
  }
  group("Get a single category", () => {
    const res = http.get(
      "https://api.escuelajs.co/api/v1/categories/" + categoryId,
      generateHeaders("Categories_One")
    );

    categoriesTrend.add(res.timings.duration);

    check_status(res, time);
    check(res, {
      ["Category id is " + categoryId]: (r) => r.json().id === categoryId,
    });
  });
}
