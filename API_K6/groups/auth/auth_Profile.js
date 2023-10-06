import http from "k6/http";
import { group, check } from "k6";
import { Trend } from "k6/metrics";
import generateHeaders from "../../utils/generateHeader.js";
import check_status from "../../checks/check_status.js";

const usersTrend = new Trend("Auth_Profile");

/**
 * Fungsi mendapatkan detail profile user (Harus memiliki access token  )
 *
 * @export
 * @param {string} email - Email user untuk validasi
 * @param {string} password - Password user untuk validasi
 * @param {string} token - Token user untuk mengakses Profile
 * @param {number} [time=1000] - waktu (ms) eksekusi yang diharapkan
 */
export default function auth_Profile(email, password, token, time = 1000) {
  group("Get user Profile with session", () => {
    const res = http.get(
      "https://api.escuelajs.co/api/v1/auth/profile",
      generateHeaders("Auth_Profile", token)
    );

    usersTrend.add(res.timings.duration);

    check_status(res, time);
    check(res, {
      ["User email is " + email]: (r) => r.json().email === email,
      ["User password is " + password]: (r) => r.json().password === password,
    });
  });
}
