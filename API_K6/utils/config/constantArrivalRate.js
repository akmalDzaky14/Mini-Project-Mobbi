const constantArrivalRate = {
  executor: "constant-arrival-rate",
  rate: 10,
  timeUnit: "1s",
  duration: "30s",
  preAllocatedVUs: 10,
};

export default constantArrivalRate;
