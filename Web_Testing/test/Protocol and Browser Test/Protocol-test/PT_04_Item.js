import { check, group } from "k6";
import http from "k6/http";
import { Trend } from "k6/metrics";

import { headers } from "../../../utils/headers.js";

const pageDuration = new Trend("page_item_duration", true);

export default function () {
  group("PT_04_Item", () => {
    const responses = http.batch([
      ["GET", "https://swaglabs.in/product/custom-greeting-card/", headers],
      [
        "GET",
        "https://swaglabs.in/wp-admin/admin-ajax.php?action=pi_get_cart_json",
        headers,
      ],
      [
        "GET",
        "https://swaglabs.in/wp-includes/js/dist/api-fetch.min.js?ver=0fa4dabf8bf2c7adf21a",
        headers,
      ],
      [
        "GET",
        "https://swaglabs.in/wp-content/plugins/woocommerce/assets/js/frontend/add-to-cart-variation.min.js?ver=8.0.3",
        headers,
      ],
      [
        "GET",
        "https://swaglabs.in/wp-content/uploads/2022/08/Plantable-Greeting-card-.webp",
        headers,
      ],
      [
        "GET",
        "https://swaglabs.in/wp-content/uploads/2022/08/Regular-Card--100x100.webp",
        headers,
      ],
      [
        "GET",
        "https://swaglabs.in/wp-content/uploads/2022/07/WhatsApp-Image-2022-06-06-at-10.33.16-PM-100x100.jpeg",
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
