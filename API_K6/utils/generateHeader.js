/**
 * Fungsi membuat header dengan pilihan memberikan token atau tidak
 *
 * @export
 * @param {string} token - Token hasil login
 * @param {string} [tagsDetail=""]  - Tag untuk k6 entities
 * @return {object}
 */
export default function generateHeaders(tagsDetail = "", token) {
  if (token) {
    return {
      headers: {
        Authorization: "Bearer " + token,
      },
      tags: { detail: tagsDetail },
    };
  } else {
    return {
      tags: { detail: tagsDetail },
    };
  }
}
