const Faker = require('faker');
const moment = require('moment');
const fs = require('fs');
const csvWriter = require('csv-write-stream');
const writer = csvWriter();

const createFakeRestaurantData = () => {
  const noiseLevels = ['Quiet', 'Average', 'Loud'];
  const fakeName = [];
  const fakeLocation = [];
  for (let i = 0; i < 10000; i++) {
    fakeName.push(Faker.lorem.word());
    fakeLocation.push(Faker.address.city());
  }
  writer.pipe(fs.createWriteStream('restaurantData.csv'));
  for (let j = 0; j < 10000000; j++) {
    if (j % 100000 === 0) {
      console.log(j);
    }
    let randNum = Math.random();
    writer.write({
      id: j,
      name: fakeName[Math.floor(Math.random() * 10000)],
      location: fakeLocation[Math.floor(Math.random() * 10000)],
      noise: noiseLevels[Math.floor(randNum * noiseLevels.length)],
      rec_percent: 40 + (randNum * 60),
      avg_overall: 1 + (randNum * 4),
      avg_service: 1 + (randNum * 4),
      avg_ambience: 1 + (randNum * 4),
      avg_food: 1 + (randNum * 4),
      value_rating: 1 + (randNum * 4),
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
