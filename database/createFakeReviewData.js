const Faker = require('faker');
const moment = require('moment');
const fs = require('fs');
const csvWriter = require('csv-write-stream');
const writer = csvWriter({separator: '/'});

const createFakeRestaurantData = () => {
  const foodWords = ['pot roast', 'chicken', 'sushi', 'marshmallows', 'pumpkin pie', 'wine', 'good food', 'dessert'];
  const tagWords = ['groups', 'kids', 'gluten free', 'dairy free', 'trendy', 'new', 'open late', 'vegan'];
  const fakeText = [];
  const fakeDates = [];
  for (let i = 0; i < 10000; i++) {
    fakeText.push(Faker.lorem.sentence() + Faker.lorem.sentence());
    fakeDates.push(moment(Faker.date.recent(365)).format('YYYY-MM-DD'));
  }
  writer.pipe(fs.createWriteStream('reviewData.csv'));
  for (let j = 0; j < 6000000; j++) {
    if (j % 100000 === 0) {
      console.log(j);
    }
    let tagsArray = [];
    let restaurantsArray = [];
    let usersArray = [];
    for (let i = 0; i < 8; i++) {
      if (Math.random() > 0.8) {
        tagsArray.push(foodWords[i]);
        tagsArray.push(tagWords[i]);
      }
      restaurantsArray.push(Math.floor(Math.random() * 10000000));
      usersArray.push(Math.floor(Math.random() * 5000000));
    }
    let randNum = Math.random()
    writer.write({
      id: j,
      restaurant_id: restaurantsArray,
      user_id:  usersArray,
      text: fakeText[Math.floor(randNum * 10000)],
      date: fakeDates[Math.floor(randNum * 10000)],
      overall_score: 1 + (randNum * 4),
      ambience_score: 1 + (randNum * 4),
      food_score: 1 + (randNum * 4),
      service_score: 1 + (randNum * 4),
      is_recommended: 1 + (randNum * 4),
      tags: tagsArray,
    })
  }
  writer.end();
  console.log('done');
}

// const writeDataToFile = (array) => {
//   fs.writeFileSync('fakeData.txt', array[0].toString(), (err) => {
//     if (err) {
//       throw err;
//     }
//   });

//   for (let i = 1; i <= array.length - 1; i += 1) {
//     const fakeStr = array[i].toString();
//     fs.appendFile('fakeData.txt', `\n${fakeStr}`, (err) => {
//       if (err) {
//         throw err;
//       }
//     });
//   }
// };

createFakeRestaurantData();
// writeDataToFile(dataToWrite);