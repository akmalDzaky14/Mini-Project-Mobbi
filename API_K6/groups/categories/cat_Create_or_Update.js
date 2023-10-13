import http from "k6/http";
import { group, check } from "k6";
import { Trend } from "k6/metrics";
import generateHeaders from "../../utils/generateHeader.js";
import check_status from "../../checks/check_status.js";

const categoriesTrend = new Trend("Categories_Create_or_Update");

/**
 * Fungsi Membuat atau Update kategori tegantung parameter categoryId.
 * Jika categoryId tidak di isi maka akan membuat kategori baru
 *
 * @export
 * @param {string} [name="404 title"] - Nama kategori
 * @param {string} [image="https://http.cat/404"] - URL gambar kategori
 * @param {number} categoryId - nomor kategori (optional)
 * @param {number} [time=1000] - waktu (ms) eksekusi yang diharapkan
 * @return
 */
let Id = 3;
export default function cat_create_or_Update(
  name = "404 title",
  image = "https://http.cat/404",
  categoryId,
  time = 1000
) {
  const data = { name, image };
  if (!categoryId) {
    group("Create a category", () => {
      const res = http.post(
        "https://api.escuelajs.co/api/v1/categories/",
        data,
        generateHeaders("Categories_Create")
      );
      Id = res.body.id;

      categoriesTrend.add(res.timings.duration);

      check_status(res, time, 201);
      check(res, {
        ["Category name is " + name]: (r) => r.json().name === name,
        ["Category image is " + image]: (r) => r.json().image === image,
      });
    });
    return;
  }
  if (categoryId) {
    Id = categoryId;
  }
  group("Update a category", () => {
    const res = http.put(
      "https://api.escuelajs.co/api/v1/categories/" + Id,
      data,
      generateHeaders("Categories_Update")
    );

    categoriesTrend.add(res.timings.duration);

    check_status(res, time);
    check(res, {
      ["Category name is " + name]: (r) => r.json().name === name,
      ["Category image is " + image]: (r) => r.json().image === image,
    });
  });
}
