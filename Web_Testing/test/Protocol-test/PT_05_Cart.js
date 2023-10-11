import { check, group } from "k6";
import http from "k6/http";
import { Trend } from "k6/metrics";

import { headers } from "../../utils/headers.js";

const pageDuration = new Trend("page_cart_duration", true);

export default function () {
  group("PT_05_Cart", () => {
    const responses = http.batch([
      ["GET", "https://swaglabs.in/enquiry-cart/      ", headers],
      [
        "GET",
        "https://swaglabs.in/wp-admin/admin-ajax.php?action=pi_get_cart_json",
        headers,
      ],
      [
        "GET",
        "https://swaglabs.in/wp-includes/js/api-request.min.js?ver=6.3.1",
        headers,
      ],
      [
        "GET",
        "https://swaglabs.in/wp-includes/js/dist/api-fetch.min.js?ver=0fa4dabf8bf2c7adf21a",
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
