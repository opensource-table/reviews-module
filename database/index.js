const { Client } = require('pg');
const Pool = require('./queries.js');

module.exports.getAllReviews = (restaurantId, callback) => {
  Pool.pool.query(`
    SELECT * FROM reviews
    INNER JOIN users on reviews.user_id = users.id 
    WHERE restaurant_id = ${restaurantId}`, (err, results) => {
      if (err) { 
        callback(err);
      } else {
        callback(null, results);
      }
  })

};

module.exports.getSummary = (restaurantId, callback) => {
  // get restaurant summary info from restaurant table
  Pool.pool.query(`
  SELECT * FROM restaurants WHERE id = ${restaurantId}`, (err, results) => {
    if (err) {
      callback(err);
    } else {
      callback(null, results);
    }
})
};

module.exports.createReview = (reviewData, callback) => {
  const client = new Client({
    user: dbconf.role,
    host: dbconf.host,
    database: 'reviews',
    password: dbconf.password,
    port: 5432
  });

  const insertReview = `INSERT INTO reviews
    (
      restaurant,
      diner,
      text,
      date,
      overall,
      food,
      service,
      ambience,
      wouldrecommend,
      tags
    ) 
    VALUES
    (
      ${reviewData.restaurant},
      ${reviewData.diner},
      ${reviewData.text},
      ${reviewData.date},
      ${reviewData.overall},
      ${reviewData.food},
      ${reviewData.service},
      ${reviewData.ambience},
      ${reviewData.wouldrecommend},
      ${reviewData.tags},
    )`;
  
    makeQuery(client, insertReview, callback);
}

module.exports.editReview = (reviewData, callback) => {
  const client = new Client({
    user: dbconf.role,
    host: dbconf.host,
    database: 'reviews',
    password: dbconf.password,
    port: 5432
  });

  const editReview = `UPDATE reviews
    SET text = ${reviewData.text}
    WHERE id = ${reviewData.id}
    `;
  
    makeQuery(client, editReview, callback);
}

module.exports.deleteReview = (reviewData, callback) => {
  const client = new Client({
    user: dbconf.role,
    host: dbconf.host,
    database: 'reviews',
    password: dbconf.password,
    port: 5432
  });

  const deleteReview = `DELETE FROM reviews WHERE id = ${reviewData.id}`;
  
    makeQuery(client, deleteReview, callback);
}