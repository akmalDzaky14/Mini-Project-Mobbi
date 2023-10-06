// const thresholds = {

// };
// export default thresholds;
export default function thresholds(option) {
  switch (option) {
    case 1:
      return {
        http_req_duration: ["avg<300", "p(90)<250"],
        http_req_failed: ["rate<0.5"],
        iterations: ["count>400"],
      };

    default:
      return {
        http_req_duration: ["avg<300", "p(90)<250"],
        http_req_failed: ["rate<0.5"],
        iterations: ["count>400"],
      };
  }
}
