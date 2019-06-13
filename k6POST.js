import http from "k6/http";
import { check, sleep } from "k6";

export let options = {
  stages: [
    {duration: "30s", target: 150},
    {duration: "270s", target: 150},
  ]
};

// skew requests towards end of database per Learn Requirement
let min = 8000000;
let max = 10000000;
const fakeText = ['dksalfjdasl ewqr d aic aewqr aka da', 'afkldfq caskl qeri das fc al', 'jdakl feqlk fda ca ewq', 'fjdkal eq pc qipurexnm'];
const fakeDates = ['2019-01-01', '2018-10-10', '2019-04-04', '2019-05-01'];
const fakeBooleans = ['t', 'f'];


export default function() {
  let randNum = Math.random();
  let formData = {
    restaurant_id: Math.floor(randNum*((max-min) + min)),
    user_id: Math.floor(randNum * 5000000),
    date: fakeDates[Math.floor(randNum * 4)],
    text: fakeText[Math.floor(randNum * 4)],
    overall_score: Math.floor(randNum * 4) + 1,
    food_score: Math.floor(randNum * 4) + 1,
    service_score: Math.floor(randNum * 4) + 1,
    ambience_score: Math.floor(randNum * 4) + 1,
    value_score: Math.floor(randNum * 4) + 1,
    is_recommended: fakeBooleans[Math.floor(randNum * 2)],
    tags: 'gluten free/dairy free/wine'
  }
  let headers = { "Content-Type": "application/x-www-form-urlencoded" }
  let res = http.post(`http://localhost:3010/${Math.floor(Math.random()*((max-min) + min))}/reviews`, formData, { headers: headers });
  check(res, {
    "status was 201": (r) => r.status == 201,
    "transaction time OK": (r) => r.timings.duration < 100
  });
  sleep(1);
};