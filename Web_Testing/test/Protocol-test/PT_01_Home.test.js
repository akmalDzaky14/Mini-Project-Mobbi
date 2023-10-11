import { check, group } from "k6";
import http from "k6/http";
import { Trend } from "k6/metrics";

import { headers } from "../../utils/headers.js";

const pageDuration = new Trend("page_home_duration", true);

export default function () {
  group("PT_01_Home", () => {
    const responses = http.batch([
      ["GET", "https://swaglabs.in/", headers],
      [
        "GET",
        "https://swaglabs.in/wp-content/plugins/woocommerce/assets/fonts/WooCommerce.woff",
        headers,
      ],
      [
        "GET",
        "https://swaglabs.in/wp-content/plugins/elementor/assets/lib/eicons/fonts/eicons.woff2?5.16.0",
        headers,
      ],
      [
        "GET",
        "https://swaglabs.in/wp-content/plugins/elementskit-lite/modules/elementskit-icon-pack/assets/fonts/elementskit.woff?y24e1e",
        headers,
      ],
      [
        "GET",
        "https://swaglabs.in/wp-content/plugins/elementor/assets/lib/font-awesome/webfonts/fa-solid-900.woff2",
        headers,
      ],
      [
        "GET",
        "https://swaglabs.in/wp-content/plugins/elementor/assets/lib/font-awesome/webfonts/fa-brands-400.woff2",
        headers,
      ],
      [
        "GET",
        "https://swaglabs.in/wp-content/plugins/elementor/assets/lib/font-awesome/webfonts/fa-regular-400.woff2",
        headers,
      ],
      [
        "GET",
        "https://swaglabs.in/wp-content/plugins/elementor-pro/assets/js/nav-menu.3347cc64f9b3d71f7f0c.bundle.min.js",
        headers,
      ],
      [
        "GET",
        "https://swaglabs.in/wp-admin/admin-ajax.php?action=pi_get_cart_json",
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
