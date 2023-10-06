const rampingVUs = {
  executor: "ramping-vus",
  startVUs: 1,
  stages: [
    { duration: "10s", target: 50 },
    { duration: "5s", target: 50 },
    { duration: "5s", target: 0 },
  ],
};
export default rampingVUs;
