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
      .set("Authorization", `Bearer ${token}`)
      .expect(200);
  }
  if (method === "GET") {
    return await request.get(destination).expect(200);
  }
  if (method === "POST") {
    return await request
      .post(destination)
      .send(data)
      .set("Accept", "application/json")
      .expect(201);
  }
  if (method === "PUT") {
    return await request
      .put(destination)
      .send(data)
      .set("Accept", "application/json")
      .expect(200);
  }
  if (method === "PATCH") {
    return await request
      .patch(destination)
      .send(data)
      .set("Accept", "application/json")
      .expect(200);
  }
  if (method === "DELETE") {
    return await request.delete(destination).expect(200);
  }
}
module.exports = fetchAPI;
