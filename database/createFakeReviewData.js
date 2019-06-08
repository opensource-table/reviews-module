const Faker = require('faker');
const moment = require('moment');
const fs = require('fs');
const writer = fs.createWriteStream('./reviewData5.txt');

function writeFakeReviewData(writer, data, encoding, callback) {
  let i = 100000000;
  write();
  function write() {
    let ok = true;
    do {
      i--;
      if (i === 0) {
        // last time!
        writer.write(createFakeReviewData(i), encoding);
      } else if (i === 9999999) {
        ok = writer.write('id,r_id,u_id,txt,date,ov_scr,fd_scr,srv_scr,amb_scr,val_scr,is_rec,tags\n' + createFakeReviewData(i), encoding);
      } else {
        // See if we should continue, or wait.
        // Don't pass the callback, because we're not done yet.
        if (i % 100000 === 0) {
          console.log(i);
        } 
        ok = writer.write(createFakeReviewData(i), encoding);
      }
    } while (i > 80000000 && ok);
    if (i > 80000000) {
      // had to stop early!
      // write some more once it drains
      writer.once('drain', write);
    }
  }
}

const fakeText = [];
const fakeDates = [];

const createFakeArrays = () => {
  for (let i = 0; i < 10000; i++) {
    fakeText.push(Faker.lorem.sentence() + Faker.lorem.sentence());
    fakeDates.push(moment(Faker.date.recent(365)).format('YYYY-MM-DD'));
  }
}

const createFakeReviewData = (counter) => {
  const foodWords = ['pr', 'c', 's', 'm', 'pp', 'w', 'fb', 'd']
  const tagWords = ['g', 'k', 'gf', 'df', 't', 'n', 'ol', 'v']
  const isRecommended = [true, false];
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
  return `${counter},${Math.floor(Math.random() * 10000000)},${Math.floor(Math.random() * 5000000)},${fakeText[Math.floor(Math.random() * 10000)]},${fakeDates[Math.floor(Math.random() * 10000)]},${1 + Math.floor(Math.random() * 4)},${1 + Math.floor(Math.random() * 4)},${1 + Math.floor(Math.random() * 4)},${1 + Math.floor(Math.random() * 4)},${1 + Math.floor(Math.random() * 4)},${isRecommended[Math.floor(Math.random() * 2)]},${tags}\n`
}

createFakeArrays();

writeFakeReviewData(writer, 'utf-8');
