import http from "k6/http";
import { group, check } from "k6";
import { Trend } from "k6/metrics";
import generateHeaders from "../../utils/generateHeader.js";
import check_status from "../../checks/check_status.js";

const productsTrend = new Trend("Products_Update");

/**
 * Fungsi merubah data Product
 *
 * @export
 * @param {number} id - Id product yang ingin di ubah
 * @param {string} [title="404 title"] - Judul product
 * @param {number} [price=1] - Harga product
 * @param {string} [description="404 description"] - Deskripsi product
 * @param {string} [images=["https://http.cat/404", "https://http.cat/404"]] - Array ber-isi URI gambar
 * @param {number} [time=1000] - waktu (ms) eksekusi yang diharapkan
 */
export default function pro_update(
  id,
  title = "404 title",
  price = 1,
  description = "404 description",
  images = ["https://http.cat/404", "https://http.cat/404"],
  time = 1000
) {
  const data = { title, price, description, images };
  group("Update a product", () => {
    const res = http.put(
      "https://api.escuelajs.co/api/v1/products/" + id,
      data,
      generateHeaders("Products_Update")
    );

    productsTrend.add(res.timings.duration);

    check_status(res, time);

    check(res, {
      "Title is same": (r) => r.json().title === title,
      "Price is same": (r) => r.json().price === price,
      "Description is same": (r) => r.json().description === description,
      "Image URI is same": (r) => {
        return r
          .json()
          .images.every((element, index) => images[index] === element);
      },
    });
  });
}
