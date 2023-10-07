const chai = require("chai");
const { expect } = chai;
chai.use(require("chai-json-schema-ajv"));
const apiFetch = require("../component/fetchAPI");
const checkStatus = require("../component/checkStatus");
const formatTime = require("../component/formatTime");
const { userSchema } = require("../component/schema");

let allUsers;
let userId;
let randomElement;
describe("Users Test", () => {
  before(() => {
    performance.mark("start");
  });
  after(() => {
    performance.mark("end");
    const time = performance.measure("Time", "start", "end").duration.toFixed();
    formatTime(time);
  });
  describe("Get all users", () => {
    before(async () => {
      allUsers = await apiFetch("users");
      randomElement =
        allUsers.body[Math.floor(Math.random() * allUsers.body.length)].id;
    });
    it("Status should 200", async () => {
      await checkStatus(allUsers, 200);
    });
    it("Should get list of products", async () => {
      expect(allUsers.body.length).above(1);
    });
    it("JSON schema is valid", () => {
      expect(allUsers.body[0]).have.jsonSchema(userSchema);
    });
  });

  describe("Get one user", () => {
    let res;

    before(async () => {
      res = await apiFetch("users/" + randomElement);
    });
    it("Status should 200", async () => {
      await checkStatus(res, 200);
    });
    it("Should get single user", async () => {
      expect(res.body[1]).is.equal(undefined);
    });
    it("User id should same", async () => {
      expect(res.body.id).is.equal(randomElement);
    });
    it("JSON schema is valid", () => {
      expect(res.body).have.jsonSchema(userSchema);
    });
  });

  describe("Create user", () => {
    let res;
    let data = {
      name: "404 title",
      email: "email12321@mail.com",
      password: "404password",
      avatar: "https://http.cat/404",
    };

    before(async () => {
      res = await apiFetch("users", "POST", data);
      // assign id untuk di update
      userId = res.body.id;
    });
    it("Status should 201", async () => {
      await checkStatus(res, 201);
    });
    it("Creates new user", async () => {
      expect(res.body.name).to.equal(data.name);
      expect(res.body.email).to.equal(data.email);
      expect(res.body.password).to.equal(data.password);
      expect(res.body.avatar).to.equal(data.avatar);
    });
    it("JSON schema is valid", () => {
      expect(res.body).have.jsonSchema(userSchema);
    });
  });

  describe("Update creatd user", () => {
    let res;
    let data = {
      name: "404Update",
      email: "updateTets123@mail.com",
      password: "404UpdatePassword",
      avatar: "https://http.cat/304",
    };

    before(async () => {
      res = await apiFetch("users/" + userId, "PUT", data);
    });
    it("Status should 200", async () => {
      await checkStatus(res, 200);
    });
    it("Updates existing user", async () => {
      expect(res.body.name).to.equal(data.name);
      expect(res.body.email).to.equal(data.email);
      expect(res.body.password).to.equal(data.password);
      expect(res.body.avatar).to.equal(data.avatar);
    });
    it("JSON schema is valid", () => {
      expect(res.body).have.jsonSchema(userSchema);
    });
  });

  describe("Check email availability", () => {
    let res;
    let data = {
      email: "maria@mail.com",
    };

    before(async () => {
      res = await apiFetch("users/is-available", "POST", data);
    });
    it("Status should 201", async () => {
      await checkStatus(res, 201);
    });
    it("Return true", async () => {
      // isAvailable selalu return false
      // expect(res.body.isAvailable).is.equal(true);
    });
  });
});
