const Faker = require('faker');
const moment = require('moment');
const fs = require('fs');
const writer = fs.createWriteStream('./userData.txt');

function writeFakeUserData(writer, data, encoding, callback) {
  let i = 5000000;
  write();
  function write() {
    let ok = true;
    do {
      i--;
      if (i === 0) {
        // last time!
        writer.write(createFakeUserData(i), encoding);
      } else if (i === 4999999) {
        ok = writer.write('id,first_name,last_name,city,avatar_color,is_vip,total_reviews\n' + createFakeUserData(i), encoding);
      } else {
        // See if we should continue, or wait.
        // Don't pass the callback, because we're not done yet.
        if (i % 100000 === 0) {
          console.log(i);
        } 
        ok = writer.write(createFakeUserData(i), encoding);
      }
    } while (i > 0 && ok);
    if (i > 0) {
      // had to stop early!
      // write some more once it drains
      writer.once('drain', write);
    }
  }
}

const fakeFirstNames = [];
const fakeLastNames = [];
const fakeCities = [];

const createFakeArrays = () => {
  for (let i = 0; i < 10000; i++) {
    fakeFirstNames.push(Faker.name.firstName());
    fakeLastNames.push(Faker.name.lastName());
    fakeCities.push(Faker.address.city());
  }
}

const createFakeUserData = (counter) => {
  const colors = ['#d86441', '#bb6acd', '#6c8ae4', '#df4e96'];
  const booleans = [true, false];
  return `${counter},${fakeFirstNames[Math.floor(Math.random() * 10000)]},${fakeLastNames[Math.floor(Math.random() * 10000)]},${fakeCities[Math.floor(Math.random() * 10000)]},${colors[Math.floor(Math.random() * 4)]},${booleans[Math.floor(Math.random() * 2)]},${1 + Math.floor(Math.random() * 50)}\n`
}

createFakeArrays();

writeFakeUserData(writer, 'utf-8');