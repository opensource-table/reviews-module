import http from "k6/http";
import { check, sleep } from "k6";

export let options = {
  stages: [
    {duration: "30s", target: 150},
    {duration: "570s", target: 150},
  ]
};

// skew requests towards end of database per Learn Requirement
let min = 8000000;
let max = 10000000;

export default function() {
  let res = http.get(`http://localhost:3010/${Math.floor(Math.random()*((max-min) + min))}/reviews`);
  check(res, {
    "status was 200": (r) => r.status == 200,
    "transaction time OK": (r) => r.timings.duration < 100
  });
  let res2 = http.get(`http://localhost:3010/${Math.floor(Math.random()*((max-min) + min))}/summary`);
  check(res2, {
    "status was 200": (r) => r.status == 200,
    "transaction time OK": (r) => r.timings.duration < 100
  });
  sleep(1);
};