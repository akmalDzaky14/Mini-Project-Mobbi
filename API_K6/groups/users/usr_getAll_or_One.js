import http from "k6/http";
import { group, check } from "k6";
import { Trend } from "k6/metrics";
import generateHeaders from "../../utils/generateHeader.js";
import check_status from "../../checks/check_status.js";

const usersTrend = new Trend("Users_All_or_One");

/**
 * Fungsi mengambil satu atau seluruh data user tergantung parameter userId.
 * Jika parameter userId tidak di isi maka akan mengambil seluruh data user.
 *
 * @export
 * @param {number} [time=1000] - waktu (ms) eksekusi yang diharapkan
 * @param {number} userId Id user yang ingin dicari
 * @return
 */
export default function usr_getAll_or_One(time = 1000, userId) {
  if (!userId) {
    group("Get all users", () => {
      const res = http.get(
        "https://api.escuelajs.co/api/v1/users/",
        generateHeaders("Users_All")
      );

      usersTrend.add(res.timings.duration);

      check_status(res, time);
    });
    return;
  }
  group("Get a single user", () => {
    const res = http.get(
      "https://api.escuelajs.co/api/v1/users/" + userId,
      generateHeaders("Users_One")
    );

    usersTrend.add(res.timings.duration);

    check_status(res, time);
    check(res, {
      ["User id is " + userId]: (r) => r.json().id === userId,
    });
  });
}
