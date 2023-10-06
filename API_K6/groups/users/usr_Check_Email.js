import http from "k6/http";
import { group, check } from "k6";
import { Trend } from "k6/metrics";
import generateHeaders from "../../utils/generateHeader.js";
import check_status from "../../checks/check_status.js";

const usersTrend = new Trend("Users_Check_Email");

/**
 * Fungsi memeriksa apakah email sudah di pakai atau belum
 *
 * @export
 * @param {string} [email="email404@mail.com"] - Email yang ingin diperiksa
 * @param {number} [time=1000] - waktu (ms) eksekusi yang diharapkan
 */
export default function usr_Check_Email(
  email = "email404@mail.com",
  time = 1000
) {
  group("Check the email", () => {
    const res = http.post(
      "https://api.escuelajs.co/api/v1/users/is-available",
      { email },
      generateHeaders("Users_Check_Email")
    );

    usersTrend.add(res.timings.duration);

    check_status(res, time, 201);
    check(res, {
      // Return selalu false, masalah di API
      ["Return isAvailble is true"]: (r) => r.json().isAvailable === true,
    });
  });
}
