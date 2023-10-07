const chai = require("chai");
const { expect } = chai;
chai.use(require("chai-json-schema-ajv"));
const apiFetch = require("../component/fetchAPI");
const checkStatus = require("../component/checkStatus");
const formatTime = require("../component/formatTime");
const { categorySchema } = require("../component/schema");

let allCategories;
let randomElement;
let categoryId;

describe("Categories Test", () => {
  before(() => {
    performance.mark("start");
  });
  after(() => {
    performance.mark("end");
    const time = performance.measure("Time", "start", "end").duration.toFixed();
    formatTime(time);
  });
  describe("Get all categories", () => {
    before(async () => {
      allCategories = await apiFetch("categories");
      randomElement =
        allCategories.body[
          Math.floor(Math.random() * allCategories.body.length)
        ].id;
    });
    it("Status should 200", async () => {
      await checkStatus(allCategories, 200);
    });
    it("Should get list of products", async () => {
      expect(allCategories.body.length).above(1);
    });
    it("JSON schema is valid", () => {
      expect(allCategories.body[0]).have.jsonSchema(categorySchema);
    });
  });

  describe("Get one category", () => {
    let res;
    before(async () => {
      res = await apiFetch("categories/" + randomElement);
    });
    it("Status should 200", async () => {
      await checkStatus(res, 200);
    });
    it("Should get single category", async () => {
      expect(res.body[1]).is.equal(undefined);
    });
    it("Category id should same", async () => {
      expect(res.body.id).is.equal(randomElement);
    });
    it("JSON schema is valid", () => {
      expect(res.body).have.jsonSchema(categorySchema);
    });
  });

  describe("Create category", () => {
    let res;
    let data = {
      name: "New Category",
      image: "https://http.cat/404",
    };
    before(async () => {
      res = await apiFetch("categories", "POST", data);
      // assign id untuk di update
      categoryId = res.body.id;
    });
    it("Status should 201", async () => {
      await checkStatus(res, 201);
    });
    it("Creates new category", async () => {
      expect(res.body.name).to.equal(data.name);
      expect(res.body.image).to.equal(data.image);
    });
    it("JSON schema is valid", () => {
      expect(res.body).have.jsonSchema(categorySchema);
    });
  });

  describe("Update category", () => {
    let res;
    let data = {
      name: "Updated Name",
      image: "https://http.cat/104",
    };
    before(async () => {
      // Ambil category ID untuk update
      res = await apiFetch("categories/" + categoryId, "PUT", data);
    });
    it("Status should 200", async () => {
      await checkStatus(res, 200);
    });
    it("Updates existing category", async () => {
      expect(res.body.name).to.equal(data.name);
      expect(res.body.image).to.equal(data.image);
    });
    it("JSON schema is valid", () => {
      expect(res.body).have.jsonSchema(categorySchema);
    });
  });
});
