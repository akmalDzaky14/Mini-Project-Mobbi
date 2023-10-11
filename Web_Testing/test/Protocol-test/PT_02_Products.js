import { check, group } from "k6";
import http from "k6/http";
import { Trend } from "k6/metrics";

import { headers } from "../../utils/headers.js";

const pageDuration = new Trend("page_produts_duration", true);

export default function () {
  group("PT_02_Products", () => {
    const responses = http.batch([
      ["GET", "https://swaglabs.in/products/", headers],
      [
        "GET",
        "https://swaglabs.in/wp-includes/js/dist/api-fetch.min.js?ver=0fa4dabf8bf2c7adf21a",
        headers,
      ],
      [
        "GET",
        "https://swaglabs.in/wp-includes/js/api-request.min.js?ver=6.3.1",
        headers,
      ],
      [
        "GET",
        "https://swaglabs.in/wp-admin/admin-ajax.php?action=pi_get_cart_json",
        headers,
      ],
      [
        "GET",
        "https://swaglabs.in/wp-content/uploads/2022/08/4-1.webp",
        headers,
      ],
      [
        "GET",
        "https://swaglabs.in/wp-content/uploads/2022/08/6-1024x1024.1.webp",
        headers,
      ],
      [
        "GET",
        "https://swaglabs.in/wp-content/uploads/2022/08/24-1024x1024-1.webp",
        headers,
      ],
      [
        "GET",
        "https://swaglabs.in/wp-content/uploads/2022/08/22-1024x1024-1.webp",
        headers,
      ],
    ]);

    for (const res of responses) {
      pageDuration.add(res.timings.duration);

      check(res, {
        "status 200": (r) => r.status === 200,
      });
    }
  });
}
