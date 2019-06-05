const Faker = require('faker');
const moment = require('moment');
const fs = require('fs');
const csvWriter = require('csv-write-stream');
const writer = csvWriter();

const createFakeUserData = () => {
  const colors = ['#d86441', '#bb6acd', '#6c8ae4', '#df4e96'];
  const fakeFirstNames = [];
  const fakeLastNames = [];
  const fakeCities = [];
  const booleans = [true, false];
  for (let i = 0; i < 10000; i++) {
    fakeFirstNames.push(Faker.name.firstName());
    fakeLastNames.push(Faker.name.lastName());
    fakeCities.push(Faker.address.city());
  }
  writer.pipe(fs.createWriteStream('usersData.csv'));
  for (let j = 0; j < 5000000; j++) {
    if (j % 100000 === 0) {
      console.log(j);
    }
    writer.write({
      id: j,
      first_name: fakeFirstNames[Math.floor(Math.random() * 10000)],
      last_name: fakeLastNames[Math.floor(Math.random() * 10000)],
      city: fakeCities[Math.floor(Math.random() * 10000)],
      avatar_color: colors[Math.floor(Math.random() * 4)],
      is_vip: booleans[Math.floor(Math.random() * 2)],
      total_reviews: Math.floor(Math.random() * 50),
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

createFakeUserData();
// writeDataToFile(dataToWrite);