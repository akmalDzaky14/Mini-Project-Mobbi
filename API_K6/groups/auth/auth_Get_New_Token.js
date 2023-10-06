import http from "k6/http";
import { group, check } from "k6";
import { Trend } from "k6/metrics";
import generateHeaders from "../../utils/generateHeader.js";
import check_status from "../../checks/check_status.js";

const usersTrend = new Trend("Auth_Get_New_Token");

/**
 * Fungsi membat akses token user baru dengan parameter refresh_token
 *
 * @export
 * @param {string} refreshToken - refresh token yang didapat saat login
 * @param {number} [time=1000] - waktu (ms) eksekusi yang diharapkan
 */
export default function auth_Get_New_Token(refreshToken, time = 1000) {
  group("Get a new Access Token with a Refresh Token", () => {
    const res = http.post(
      "https://api.escuelajs.co/api/v1/auth/refresh-token",
      { refreshToken },
      generateHeaders("Auth_Get_New_Token")
    );

    usersTrend.add(res.timings.duration);

    check_status(res, time, 201);
    check(res, {
      ["Object have access_token"]: (r) =>
        Object.hasOwn(r.json(), "access_token"),
      ["Object have refresh_token"]: (r) =>
        Object.hasOwn(r.json(), "refresh_token"),
    });
  });
}
