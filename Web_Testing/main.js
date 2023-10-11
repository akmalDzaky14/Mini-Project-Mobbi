// k6 run main.js
// import { browser } from "k6/experimental/browser";
import home_protocol from "./test/Protocol-test/PT_01_Home.test.js";
import products_protocol from "./test/Protocol-test/PT_02_Products.js";
import packaging_protocol from "./test/Protocol-test/PT_03_Packaging.js";
import item_protocol from "./test/Protocol-test/PT_04_Item.js";
import cart_protocol from "./test/Protocol-test/PT_05_Cart.js";

export const options = {
  scenarios: {
    protocolBased: {
      exec: "protocolBasedScript",
      executor: "constant-vus",
      vus: 10,
      duration: "10s",
    },
  },
};

export function protocolBasedScript() {
  home_protocol();
  products_protocol();
  packaging_protocol();
  item_protocol();
  cart_protocol();
}
