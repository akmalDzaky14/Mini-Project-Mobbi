import { group, sleep } from "k6";
import pro_create from "./groups/products/pro_create.js";
import pro_update from "./groups/products/pro_update.js";
import pro_delete from "./groups/products/pro_delete.js";
import pro_pagination from "./groups/products/pro_pagination.js";
import pro_getAllorOne from "./groups/products/pro_getAllorOne.js";

import filter_byTitle from "./groups/filter_Products/byTitle.js";
import filter_byPrice from "./groups/filter_Products/byPrice.js";
import filter_byCategory from "./groups/filter_Products/byCategory.js";
import filter_byPriceRange from "./groups/filter_Products/byPriceRange.js";

import cat_getAll_or_One from "./groups/categories/cat_getAll_or_One.js";
import cat_create_or_Update from "./groups/categories/cat_Create_or_Update.js";
import usr_getAll_or_One from "./groups/users/usr_getAll_or_One.js";
import usr_Create_or_Update from "./groups/users/usr_Create_or_Update.js";
import usr_Check_Email from "./groups/users/usr_Check_Email.js";
import auth_login from "./groups/auth/auth_login.js";
import auth_Profile from "./groups/auth/auth_Profile.js";
import auth_Get_New_Token from "./groups/auth/auth_Get_New_Token.js";

import thresholds from "./utils/config/thresholds.js";

import sharedIterations from "./utils/config/sharedIterations.js";
import perVUIterations from "./utils/config/perVUIterations.js";
import constantVUs from "./utils/config/constantVUs.js";
import rampingVUs from "./utils/config/rampingVUs.js";
import constantArrivalRate from "./utils/config/constantArrivalRate.js";
import rampingArrivalRate from "./utils/config/rampingArrivalRate.js";

const threshold = thresholds(1);

const scenarioList = {
  shared: sharedIterations,
  perVUs: perVUIterations,
  constVUs: constantVUs,
  rampVUs: rampingVUs,
  constArrRate: constantArrivalRate,
  rampArrRate: rampingArrivalRate,
};

export const options = {
  threshold,
  scenarios: {
    select_Scenario: scenarioList[__ENV.Scenario] || sharedIterations,
  },
};
export default function (params) {
  group("Products", () => {
    pro_getAllorOne(1500, 123);
    const id = pro_create("Create 1 product", 1000, "Try create function", 2, [
      "https://http.cat/404",
      "https://http.cat/404",
    ]);
    pro_update(id);
    pro_delete(id);
    pro_pagination(10, 10);
  });

  group("Filter Products", () => {
    filter_byTitle("Plastic");
    filter_byPrice(695);
    filter_byPriceRange(100, 200);
    filter_byCategory(4);
  });

  group("Categories", () => {
    cat_getAll_or_One(1500); // get All
    cat_getAll_or_One(1500, 2); // get One
    cat_create_or_Update("Test Create Category", "https://http.cat/100"); //Create
    cat_create_or_Update("Test Create Category", "https://http.cat/102", 1); //Update
  });

  group("Users", () => {
    usr_getAll_or_One(1000); // get All
    usr_getAll_or_One(1000, 3); // get One
    usr_Create_or_Update(
      "Test Create Users",
      "test@gmail.com",
      "TetsPasswd123",
      "https://http.cat/405"
    ); // Create User
    usr_Create_or_Update(
      "Test Update Users",
      "update@gmail.com",
      "TestUpdatePass",
      "https://http.cat/105",
      24
    ); //Update Created User
    usr_Check_Email("test@mail.com"); //Test email selalu false, masalah dari API
  });

  group("Auth", () => {
    const { access_token, refresh_token, email, password } = auth_login();
    auth_Profile(email, password, access_token);
    auth_Get_New_Token(refresh_token);
  });

  sleep(1);
}
