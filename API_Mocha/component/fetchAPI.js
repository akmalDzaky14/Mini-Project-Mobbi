const request = require("supertest")("https://api.escuelajs.co/api/v1/");
/**
 * Fungsi memanggil API berdasarkaan parameter
 *
 * @param {string} destination - Destinasi API
 * @param {string} [method="GET"] - Method yang ingin digunakan (optional)
 * @param {object} [data=null] - Data yang ingin di kirim (optional)
 * @return
 */
async function fetchAPI(destination, method = "GET", data = null, token) {
  if (token) {
    return await request
      .get(destination)
      .set("Authorization", `Bearer ${token}`);
  }
  if (method === "GET") {
    return await request.get(destination);
  }
  if (method === "POST") {
    return await request
      .post(destination)
      .send(data)
      .set("Accept", "application/json");
  }
  if (method === "PUT") {
    return await request
      .put(destination)
      .send(data)
      .set("Accept", "application/json");
  }
  if (method === "PATCH") {
    return await request
      .patch(destination)
      .send(data)
      .set("Accept", "application/json");
  }
  if (method === "DELETE") {
    return await request.delete(destination);
  }
}
module.exports = fetchAPI;
