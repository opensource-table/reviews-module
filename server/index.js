const path = require('path');
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const db = require('../database/index.js');
const redis = require('redis');

const app = express();
const client = redis.createClient(6379);

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.resolve(__dirname, '../public')));

// Gets files from public folder

app.get('/loaderio-aea42d407cb0b1b935785c8f31b4ec4d', (req, res) => {
  res.sendFile('loaderio-aea42d407cb0b1b935785c8f31b4ec4d.txt', { root: path.resolve(__dirname, '../public') });
});

app.get('/:id', (req, res) => {
if (!req.params.id) {
    res.status(400);
    res.end();
  } else {
    res.sendFile('index.html', { root: path.resolve(__dirname, '../public') });
  }
});

// Gets restaurant specific information
// Gets restaurant specific information
app.get('/:id/summary', (req, res) => {
  const summaryRedisKey = `summary:${req.params.id}`;
  return client.get(summaryRedisKey, (err, summary) => {
    if(summary) {
      res.status(200).send(summary);
    } else {
      db.getSummary(req.params.id, (err, result) => {
        if (err) {
          res.status(500);
          res.end();
        } else {
          client.setex(`summary:${req.params.id}`, 3600, JSON.stringify(result));
          res.status(200);
          res.send(result);
        }
      });
    }
  });
});

// Gets reviews for a specific restaurant
app.get('/:id/reviews', (req, res) => {
  const reviewsRedisKey = `reviews:${req.params.id}`;
  return client.get(reviewsRedisKey, (err, review) => {
    if (review) {
      res.status(200).send(review);
    } else {
      db.getAllReviews(req.params.id, (err, result) => {
        if (err) {
          res.status(500);
          res.end();
        } else {
          client.setex(`review:${req.params.id}`, 3600, JSON.stringify(result));
          res.status(200);
          res.send(result);
        }
      });
    }
  })
});

app.post('/:id/reviews', (req, res) => {
  db.createReview(req.body, (err) => {
    if (err) {
      console.log(err);
      res.status(422).end();
    } else {
      res.status(201).send('Successfully created review.');
    }
  })
});

app.put('/:id/reviews', (req, res) => {
  db.editReview(req.body, (err) => {
    if (err) {
      res.status(400).end();
    } else {
      res.status(200).send('Successfully edited review.');
    }
  })
});

app.delete('/:id/reviews', (req, res) => {
  db.deleteReview(req.body), (err) => {
    if (err) {
      res.status(404).end();
    } else {
      res.status(204).send('Successfully deleted review.');
    }
  }
})

module.exports = app;
