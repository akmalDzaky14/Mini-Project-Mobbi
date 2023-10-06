import http from "k6/http";
import { group, check } from "k6";
import { Trend } from "k6/metrics";
import generateHeaders from "../../utils/generateHeader.js";
import check_status from "../../checks/check_status.js";

const productsTrend = new Trend("Products_Create");

/**
 * Fungsi membuat sebuah Pruct
 *
 * @export
 * @param {string} [title="404 title"] - Judul product
 * @param {number} [price=1] - Harga product
 * @param {string} [description="404 description"] - Dekripsi product
 * @param {number} [categoryId=1] - Nomor kategori product dari API /categories
 * @param {string} [images=["https://http.cat/404", "https://http.cat/404"]] - Array ber-isi URI gambar
 * @param {number} [time=1000] - waktu (ms) eksekusi yang diharapkan
 */
export default function pro_create(
  title = "404 title",
  price = 1,
  description = "404 description",
  categoryId = 1,
  images = ["https://http.cat/404", "https://http.cat/404"],
  time = 1000
) {
  let productId;
  const data = {
    title,
    price,
    description,
    categoryId,
    images,
  };

  group("Create a product", () => {
    const res = http.post(
      "https://api.escuelajs.co/api/v1/products/",
      data,
      generateHeaders("Products_Create")
    );

    productsTrend.add(res.timings.duration);
    productId = res.json().id;

    check_status(res, time, 201);
    check(res, {
      "Title is same": (r) => r.json().title === title,
      "Price is same": (r) => r.json().price === price,
      "Description is same": (r) => r.json().description === description,
      "Image URI is same": (r) => {
        return r
          .json()
          .images.every((element, index) => images[index] === element);
      },
      "Category is correct": (r) => r.json().category.id === categoryId,
    });
  });
  return productId;
}
