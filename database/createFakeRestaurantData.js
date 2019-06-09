const Faker = require('faker');
const fs = require('fs');
const writer = fs.createWriteStream('./restaurantData.txt');

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
      } else if (i === 9999999) {
        ok = writer.write(('id,nm,loc,noise,rec_per,avg_ov,avg_fd,avg_srv,avg_amb,val_rat\n' + createFakeRestaurantData(i)), encoding);
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

const fakeName = [];
const fakeLocation = [];

const createFakeArrays = () => {
  for (let i = 0; i < 10000; i++) {
    fakeName.push(Faker.lorem.word());
    fakeLocation.push(Faker.address.city());
  }
}

const createFakeRestaurantData = (counter) => {
  const noiseLevels = ['Quiet', 'Average', 'Loud'];
  return `${counter},${fakeName[Math.floor(Math.random() * 10000)]},${fakeLocation[Math.floor(Math.random() * 10000)]},${noiseLevels[Math.floor(Math.random() * noiseLevels.length)]},${40 + (Math.random() * 60)},${1 + (Math.random() * 4)},${1 + (Math.random() * 4)},${1 + (Math.random() * 4)},${1 + (Math.random() * 4)},${1 + (Math.random() * 4)}\n`;
}

createFakeArrays();

writeFakeRestaurantData(writer, 'utf-8');
