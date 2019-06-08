const Faker = require('faker');
const moment = require('moment');
const fs = require('fs');
const writer = fs.createWriteStream('./database/JSONforMongo.json');

function writeFakeRestaurantData(writer, data, encoding, callback) {
  let i = 10000001;
  write();
  function write() {
    let ok = true;
    do {
      i--;
      if (i === 1) {
        // last time!
        writer.write((createFakeRestaurantData(i) + '\n'), encoding);
      } else {
        // See if we should continue, or wait.
        // Don't pass the callback, because we're not done yet.
        if (i % 100000 === 0) {
          console.log(i);
        } 
        ok = writer.write((createFakeRestaurantData(i) + '\n'), encoding);
      }
    } while (i > 1 && ok);
    if (i > 1) {
      // had to stop early!
      // write some more once it drains
      writer.once('drain', write);
    }
  }
}

const fakeName = [];
const fakeText = [];
const fakeCities = [];
const fakeDates = [];

const createFakeArrays = () => {
  for (let i = 0; i < 10000; i++) {
    fakeName.push(Faker.lorem.word());
    fakeText.push(Faker.lorem.sentence() + Faker.lorem.sentence());
    fakeCities.push(Faker.address.city());
    fakeDates.push(moment(Faker.date.recent(365)).format('YYYY-MM-DD'));
  }
}

let fakeUsersArray = [];
const createFakeUsers = () => {
  const colors = ['d8', 'b', '6', 'df'];
  const booleans = [true, false];
  for (let k = 0; k < 5000000; k++) {
    fakeUsersArray.push({
      id: k,
      f_n: Faker.name.firstName(),
      l_n: Faker.name.lastName(),
      cit: fakeCities[Math.floor(Math.random() * 10000)],
      col: colors[Math.floor(Math.random() * 4)],
      vip: booleans[Math.floor(Math.random() * 2)],
      t_rev: Math.floor(Math.random() * 200),
    })
  }
}

const createFakeRestaurantData = (counter) => {
  const foodWords = ['pr', 'c', 's', 'm', 'pp', 'w', 'fb', 'd']
  const tagWords = ['g', 'k', 'gf', 'df', 't', 'n', 'ol', 'v']
  const isRecommended = [true, false];
  const noiseLevels = ['Q', 'A', 'L'];
  let reviewsArray = [];
  let tags = '';
  for (let i = 0; i < 8; i++) {
    if (Math.random() > 0.8) {
      if (tags === '') {
        tags += foodWords[i];
        tags += '/' + tagWords[i];
      } else {
        tags += '/' + foodWords[i];
        tags += '/' + tagWords[i];
      }
    }
  }
  let sumOverall = 0;
  let sumFood = 0;
  let sumService = 0;
  let sumAmbience = 0;
  let sumValue = 0;
  for (let i = 1; i < 20; i++) {
    if (Math.random() > 0.5) {
      const overall = 1 + Math.floor(Math.random() * 4);
      sumOverall += overall;
      const food = 1 + Math.floor(Math.random() * 4);
      sumFood += food;
      const service = 1 + Math.floor(Math.random() * 4);
      sumService += service;
      const ambience = 1 + Math.floor(Math.random() * 4);
      sumAmbience += ambience;
      const value = 1 + Math.floor(Math.random() * 4);
      sumValue += value;
      reviewsArray.push({
        id: counter * i,
        tx: fakeText[Math.floor(Math.random()*10000)],
        dt: fakeDates[Math.floor(Math.random()*10000)],
        os: overall,
        fs: food,
        ss: service,
        as: ambience,
        v_r: value,
        rc: isRecommended[Math.floor(Math.random() * 2)],
        tg: tags,
        us: fakeUsersArray[Math.floor(Math.random()*5000000)]
      })
    }
  }
  return JSON.stringify(({
    id: counter,
    nm: fakeName[Math.floor(Math.random() * 8)],
    lc: fakeCities[Math.floor(Math.random() * 10000)],
    ns: noiseLevels[Math.floor(Math.random() * 3)],
    rc_p: Math.random() * 100,
    avo: sumOverall / reviewsArray.length,
    avf: sumFood / reviewsArray.length,
    avs: sumService / reviewsArray.length,
    ava: sumAmbience / reviewsArray.length,
    v_r: sumValue / reviewsArray.length,
    rv: reviewsArray,
  }));
}

createFakeArrays();
createFakeUsers();

writeFakeRestaurantData(writer, 'utf-8');
