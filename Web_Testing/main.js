// k6 run main.js
import { browser } from "k6/experimental/browser";
import home_protocol from "./test/Protocol and Browser Test/Protocol-test/PT_01_Home.js";
import products_protocol from "./test/Protocol and Browser Test/Protocol-test/PT_02_Products.js";
import packaging_protocol from "./test/Protocol and Browser Test/Protocol-test/PT_03_Packaging.js";
import item_protocol from "./test/Protocol and Browser Test/Protocol-test/PT_04_Item.js";
import cart_protocol from "./test/Protocol and Browser Test/Protocol-test/PT_05_Cart.js";

import products_browser from "./test/Protocol and Browser Test/Browser-test/BT_01_Products.js";

export const options = {
  scenarios: {
    protocolBased: {
      exec: "protocolBasedScript",
      executor: "constant-vus",
      vus: 10,
      duration: "10s",
    },
    // browserBased: {
    //   exec: "browserBasedScript",
    //   executor: "shared-iterations",
    //   options: {
    //     browser: {
    //       type: "chromium",
    //     },
    //   },
    // },
  },
};

// export async function browserBasedScript() {
//   const page = browser.newPage();

//   try {
//     await products_browser(page);
//   } finally {
//     page.close();
//   }
// }

export function protocolBasedScript() {
  home_protocol();
  products_protocol();
  packaging_protocol();
  item_protocol();
  cart_protocol();
}
