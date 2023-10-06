import http from "k6/http";
import { group, check } from "k6";
import { Trend } from "k6/metrics";
import generateHeaders from "../../utils/generateHeader.js";
import check_status from "../../checks/check_status.js";

const usersTrend = new Trend("User_Create_or_Update");

/**
 * Fungsi membuat atau update data user tergantung parameter userId.
 * Jika parameter userId tidak di isi maka akan membuat user baru
 *
 * @export
 * @param {string} [name="404 title"] - Nama user
 * @param {string} [email="404 email"] - Email user
 * @param {string} [password="404 password"] - Password user
 * @param {string} [avatar="https://http.cat/404"] - Avatar user (harus url)
 * @param {number} userId - User id yang ingin di ubah
 * @param {number} [time=1000] - waktu (ms) eksekusi yang diharapkan
 * @return
 */
export default function usr_Create_or_Update(
  name = "404 title",
  email = "404 email",
  password = "404 password",
  avatar = "https://http.cat/404",
  userId,
  time = 1000
) {
  const data = { name, email, password, avatar };
  if (!userId) {
    group("Create a category", () => {
      const res = http.post(
        "https://api.escuelajs.co/api/v1/users/",
        data,
        generateHeaders("User_Create_or_Update")
      );

      usersTrend.add(res.timings.duration);

      check_status(res, time, 201);
      check(res, {
        ["User name is " + name]: (r) => r.json().name === name,
        ["User email is " + email]: (r) => r.json().email === email,
        ["User password is " + password]: (r) => r.json().password === password,
        ["User avatar is " + avatar]: (r) => r.json().avatar === avatar,
      });
    });
    return;
  }
  group("Update a category", () => {
    const res = http.put(
      "https://api.escuelajs.co/api/v1/users/" + userId,
      data,
      generateHeaders("User_Update")
    );

    usersTrend.add(res.timings.duration);

    check_status(res, time);
    check(res, {
      ["User name is " + name]: (r) => r.json().name === name,
      ["User email is " + email]: (r) => r.json().email === email,
      ["User password is " + password]: (r) => r.json().password === password,
      ["User avatar is " + avatar]: (r) => r.json().avatar === avatar,
    });
  });
}
