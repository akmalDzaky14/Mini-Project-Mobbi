import { check, group } from "k6";
import http from "k6/http";
import { Trend } from "k6/metrics";

import { headers } from "../../utils/headers.js";

const pageDuration = new Trend("page_packaging_duration", true);

export default function () {
  group("PT_03_Packaging", () => {
    const responses = http.batch([
      ["GET", "https://swaglabs.in/packaging/", headers],
      [
        "GET",
        "https://swaglabs.in/wp-admin/admin-ajax.php?action=pi_get_cart_json",
        headers,
      ],
      [
        "GET",
        "https://swaglabs.in/wp-content/uploads/2022/08/Plantable-Greeting-card--300x300.webp",
        headers,
      ],
      [
        "GET",
        "https://swaglabs.in/wp-content/uploads/2022/07/camo-1-300x300.jpg",
        headers,
      ],
      [
        "GET",
        "https://swaglabs.in/wp-content/uploads/2022/07/EcoFriendly-Mix-Colors-300x300.webp",
        headers,
      ],
      [
        "GET",
        "https://swaglabs.in/wp-content/uploads/2022/07/Cream-300x300.webp",
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
