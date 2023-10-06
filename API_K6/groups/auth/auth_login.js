import http from "k6/http";
import { group, check } from "k6";
import { Trend } from "k6/metrics";
import generateHeaders from "../../utils/generateHeader.js";
import check_status from "../../checks/check_status.js";

const usersTrend = new Trend("Auth_Login");

/**
 * Fungsi Login user, mengembalikan access token dan refresh token
 *
 * @export
 * @param {string} [email="john@mail.com"] - email user
 * @param {string} [password="changeme"] - pasword user
 * @param {number} [time=1000] - waktu (ms) eksekusi yang diharapkan
 * @return
 */
export default function auth_login(
  email = "john@mail.com",
  password = "changeme",
  time = 1000
) {
  const data = { email, password };
  let access_token;
  let refresh_token;
  group("Login Authentication", () => {
    const res = http.post(
      "https://api.escuelajs.co/api/v1/auth/login",
      data,
      generateHeaders("Auth_Login")
    );

    usersTrend.add(res.timings.duration);
    access_token = res.json().access_token;
    refresh_token = res.json().refresh_token;
    check_status(res, time, 201);
    check(res, {
      ["Object have access_token"]: (r) =>
        Object.hasOwn(r.json(), "access_token"),
      ["Object have refresh_token"]: (r) =>
        Object.hasOwn(r.json(), "refresh_token"),
    });
  });
  return { access_token, refresh_token, email, password };
}
