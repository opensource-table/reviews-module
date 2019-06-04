const path = require('path');
const cors = require('cors');
const express = require('express');
const db = require('../database/index.js');

const app = express();

app.use(cors());
app.use(express.static(path.resolve(__dirname, '../public')));

// Gets files from public folder
app.get('/:id', (req, res) => {
  if (!req.params.id) {
    res.status(400);
    res.end();
  } else {
    res.sendFile('index.html', { root: path.resolve(__dirname, '../public') });
  }
});

// Gets restaurant specific information
app.get('/:id/summary', (req, res) => {
  db.getSummary(req.params.id, (err, result) => {
    if (err) {
      res.status(500);
      res.end();
    } else {
      res.status(200);
      res.send(result);
    }
  });
});

// Gets reviews for a specific restaurant
app.get('/:id/reviews', (req, res) => {
  db.getAllReviews(req.params.id, (err, result) => {
    if (err) {
      res.status(500);
      res.end();
    } else {
      res.status(200);
      res.send(result);
    }
  });
});

app.post('/:id/reviews', (req, res) => {
  db.createReview(req.body, (err) => {
    if (err) {
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

module.exports = app;
