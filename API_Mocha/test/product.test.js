const jsonSchema = require("chai-json-schema-ajv");
const chai = require("chai");
const { expect } = chai;
chai.use(jsonSchema);
const apiFetch = require("../component/fetchAPI");
const checkStatus = require("../component/checkStatus");
const { productSchema } = require("../component/schema");
const formatTime = require("../component/formatTime");

let randomElement;
let createdId;
let allProduct;

describe("Product Test", () => {
  before(() => {
    performance.mark("start");
  });
  after(() => {
    performance.mark("end");
    const time = performance.measure("Time", "start", "end").duration.toFixed();
    formatTime(time);
  });
  describe("Get all product", () => {
    before(async () => {
      allProduct = await apiFetch("products");
      // mengambil id random dari list products untuk digunakan test lain
      randomElement =
        allProduct.body[Math.floor(Math.random() * allProduct.body.length)].id;
    });
    it("Status should 200", async () => {
      await checkStatus(allProduct, 200);
    });
    it("Should get list of products", async () => {
      expect(allProduct.body.length).above(1);
    });
    it("JSON schema is valid", () => {
      expect(allProduct.body[0]).have.jsonSchema(productSchema);
    });
  });

  describe("Get one product", () => {
    let res;
    before(async () => {
      res = await apiFetch("products/" + randomElement);
    });
    it("Status should 200", async () => {
      await checkStatus(res, 200);
    });
    it("Should get single product", async () => {
      expect(res.body[1]).is.equal(undefined);
    });
    it("Product id should same", async () => {
      expect(res.body.id).is.equal(randomElement);
    });
    it("JSON schema is valid", () => {
      expect(res.body).have.jsonSchema(productSchema);
    });
  });

  describe("Pagination", () => {
    let res;
    let offset = 10;
    let limit = 10;
    before(async () => {
      res = await apiFetch("products?offset=" + offset + "&limit=" + limit);
    });
    it("Status should 200", async () => {
      await checkStatus(res, 200);
    });
    it("product start with correct offset", () => {
      expect(res.body[0].id).is.equal(allProduct.body[offset].id);
    });
    it("returns correct number of products", async () => {
      expect(res.body.length).to.equal(10);
    });
    it("JSON schema is valid", () => {
      expect(res.body[0]).have.jsonSchema(productSchema);
    });
  });

  describe("Create a product", () => {
    let res;
    let data;
    before(async () => {
      data = {
        title: "404 title",
        price: 1500,
        description: "404 description",
        categoryId: 1,
        images: ["https://http.cat/404", "https://http.cat/304"],
      };
      res = await apiFetch("products/", "POST", data);
      // Ambil id yg telah dibuat agar bisa digunakan di test lain
      createdId = res.body.id;
    });

    it("Status should 201", async () => {
      await checkStatus(res, 201);
    });
    it("Title is same", () => {
      expect(res.body.title).is.equal(data.title);
    });
    it("Price is same", () => {
      expect(res.body.price).is.equal(data.price);
    });
    it("Description is same", () => {
      expect(res.body.description).is.equal(data.description);
    });
    it("CategoryId is same", () => {
      expect(res.body.category.id).is.equal(data.categoryId);
    });
    it("Image URI is same", () => {
      expect(
        res.body.images.every(
          (element, index) => data.images[index] === element
        )
      );
    });
    it("JSON schema is valid", () => {
      expect(res.body).have.jsonSchema(productSchema);
    });
  });

  describe("Update product", () => {
    let res;
    let data = {
      title: "New Title",
      price: 99,
      description: "Test description",
    };
    before(async () => {
      res = await apiFetch("products/" + createdId, "PUT", data);
    });
    it("Status should 200", async () => {
      await checkStatus(res, 200);
    });
    it("Product title updated", () => {
      expect(res.body.title).to.equal(data.title);
    });
    it("Product price updated", () => {
      expect(res.body.price).to.equal(data.price);
    });
    it("Product description updated", () => {
      expect(res.body.description).to.equal(data.description);
    });
    it("JSON schema is valid", () => {
      expect(res.body).have.jsonSchema(productSchema);
    });
  });

  describe("Delete a product", () => {
    let res;
    before(async () => {
      res = await apiFetch("products/" + createdId, "DELETE");
    });
    it("Status should 200", async () => {
      await checkStatus(res, 200);
    });
    it("Product deleted", async () => {
      expect(res.text).to.equal("true");
    });
  });
});
