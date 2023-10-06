const chai = require("chai");
const { expect } = chai;
chai.use(require("chai-json-schema-ajv"));
const apiFetch = require("../component/fetchAPI");
const checkStatus = require("../component/checkStatus");

describe("Products Filter Test", () => {
  describe("Filter by category", () => {
    let res;
    let categoryId = 1;
    before(async () => {
      res = await apiFetch("products?categoryId=" + categoryId);
    });
    it("Status should 200", async () => {
      await checkStatus(res, 200);
    });
    it("returns products with correct category", async () => {
      res.body.forEach((product) => {
        expect(product.category.id).to.equal(categoryId);
      });
    });
  });

  describe("Filter by price", () => {
    let res;
    let price = 156;
    before(async () => {
      res = await apiFetch("products?price=" + price);
    });
    it("Status should 200", async () => {
      await checkStatus(res, 200);
    });
    it("returns products with correct price", async () => {
      res.body.forEach((product) => {
        expect(product.price).to.equal(price);
      });
    });
  });

  describe("Filter by price range", () => {
    let res;
    let min = 156;
    let max = 156;
    before(async () => {
      res = await apiFetch("products?price_min=" + min + "&price_max=" + max);
    });
    it("Status should 200", async () => {
      await checkStatus(res, 200);
    });
    it("returns products within price range", async () => {
      res.body.forEach((product) => {
        expect(product.price).to.be.within(min, max);
      });
    });
  });

  describe("Filter by title", () => {
    let res;
    let title = "jeans";
    before(async () => {
      res = await apiFetch("products?title=" + title);
    });
    it("Status should 200", async () => {
      await checkStatus(res, 200);
    });
    it("returns products with title containing text", async () => {
      res.body.forEach((product) => {
        expect(product.title).to.include(title);
      });
    });
  });
});
