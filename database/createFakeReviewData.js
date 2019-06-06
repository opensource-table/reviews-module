const Faker = require('faker');
const moment = require('moment');
const fs = require('fs');
const writer = fs.createWriteStream('./reviewData.txt');

function writeFakeRestaurantData(writer, data, encoding, callback) {
  let i = 10000000;
  write();
  function write() {
    let ok = true;
    do {
      i--;
      if (i === 0) {
        // last time!
        writer.write(createFakeRestaurantData(i), encoding);
      } else {
        // See if we should continue, or wait.
        // Don't pass the callback, because we're not done yet.
        if (i % 100000 === 0) {
          console.log(i);
        } 
        ok = writer.write(createFakeRestaurantData(i), encoding);
      }
    } while (i > 0 && ok);
    if (i > 0) {
      // had to stop early!
      // write some more once it drains
      writer.once('drain', write);
    }
  }
}

const fakeText = [];
const fakeDates = [];
const tagsArray = [];

const createFakeArrays = () => {
  for (let i = 0; i < 10000; i++) {
    fakeText.push(Faker.lorem.sentence() + Faker.lorem.sentence());
    fakeDates.push(moment(Faker.date.recent(365)).format('YYYY-MM-DD'));
  }
}

const createFakeRestaurantData = (counter) => {
  const foodWords = ['pot roast', 'chicken', 'sushi', 'marshmallows', 'pumpkin pie', 'wine', 'good food', 'dessert'];
  const tagWords = ['groups', 'kids', 'gluten free', 'dairy free', 'trendy', 'new', 'open late', 'vegan'];
  const isRecommended = [true, false];
  let tagsArray = [];
  for (let i = 0; i < 8; i++) {
    if (Math.random() > 0.8) {
      tagsArray.push(foodWords[i]);
      tagsArray.push(tagWords[i]);
    }
  }
  let randNum = Math.random()
  return `${counter},${Math.floor(randNum * 10000000)},${Math.floor(randNum * 5000000)},${fakeText[Math.floor(randNum * 10000)]},${fakeDates[Math.floor(randNum * 10000)]},${1 + (randNum * 4)},${1 + (randNum * 4)},${1 + (randNum * 4)},${1 + (randNum * 4)},${isRecommended[Math.floor(randNum * 2)]},{${tagsArray}}\n`
}

createFakeArrays();

writeFakeRestaurantData(writer, 'utf-8');
