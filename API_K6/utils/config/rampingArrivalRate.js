const rampingArrivalRate = {
  executor: "ramping-arrival-rate",
  startRate: 0,
  timeUnit: "1s",
  preAllocatedVUs: 10,
  maxVUs: 30,
  stages: [
    { duration: "15s", target: 10 },
    { duration: "15s", target: 20 },
  ],
};
export default rampingArrivalRate;
