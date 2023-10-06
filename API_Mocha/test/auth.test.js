const chai = require("chai");
const { expect } = chai;
chai.use(require("chai-json-schema-ajv"));
const apiFetch = require("../component/fetchAPI");
const checkStatus = require("../component/checkStatus");

let accessToken;
let refreshToken;
let data = { email: "john@mail.com", password: "changeme" };

describe("Auth Test", () => {
  describe("Login", () => {
    let res;
    before(async () => {
      res = await apiFetch("auth/login", "POST", data);
      accessToken = res.body.access_token;
      refreshToken = res.body.refresh_token;
    });
    it("Status should 201", async () => {
      await checkStatus(res, 201);
    });
    it("Login Success", () => {
      expect(res.body).haveOwnProperty("access_token");
      expect(res.body).haveOwnProperty("refresh_token");
    });
  });

  describe("Get user profile", () => {
    let res;
    before(async () => {
      res = await apiFetch("auth/profile", "GET", null, accessToken);
    });
    it("Status should 200", async () => {
      await checkStatus(res, 200);
    });
    it("Data profile is correct", () => {
      expect(res.body.email).to.equal(data.email);
      expect(res.body.password).to.equal(data.password);
    });
  });

  describe("Generate new access token", () => {
    let res;
    before(async () => {
      res = await apiFetch("auth/refresh-token", "POST", { refreshToken });
    });
    it("Status should 201", async () => {
      await checkStatus(res, 201);
    });
    it("Generate new success", () => {
      expect(res.body).haveOwnProperty("access_token");
      expect(res.body).haveOwnProperty("refresh_token");
    });
  });
});
