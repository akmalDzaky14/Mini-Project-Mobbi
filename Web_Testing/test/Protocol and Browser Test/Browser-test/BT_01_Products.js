import { sleep } from "k6";

export default async function (page) {
  await page.goto("https://swaglabs.in/products/");

  page.waitForSelector(`//div[@data-id="d0e6d05"]//img`);
  page.screenshot({ path: "screenshots/01_Products_page.png" });
  sleep(3);
}
