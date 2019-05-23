import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

function Review(props) {
  const { review } = props;
  return (
    <div className="single-review">
      <div className="reviewer">
        <div className="initials-icon">
          <div>J</div>
        </div>
        <p className="name">Jaclyn</p>
        <p className="city">Baltimore</p>
        <div className="reviewer-stat">
          <span className="review-icon" /><p className="reviews-count">2 reviews</p>
        </div>
      </div>
      <div className="review-details">
        <div className="header">
          <div className="stars">
            <span className="review-star" />
            <span className="review-star" />
            <span className="review-star" />
            <span className="review-star" />
            <span className="review-star" />
          </div>
          <p className="date">{moment().format('MMMM Do, YYYY', review.date)}</p>
        </div>
        <div className="ratings">
          <span className="rating-name">Overall</span>
          <span className="rating">{review.overall}
            <span className="dot">&middot;</span>
          </span>
          <span className="rating-name">Food</span>
          <span className="rating">{review.food}
            <span className="dot">&middot;</span>
          </span>
          <span className="rating-name">Service</span>
          <span className="rating">{review.service}
            <span className="dot">&middot;</span>
          </span>
          <span className="rating-name">Ambience</span>
          <span className="rating">{review.ambience}</span>
        </div>
        <p className="text">{review.text}</p>
        <div className="report-helpful">
          <div className="report">
            <i className="report-icon" />
            <button type="button">Report</button>
          </div>
          <div className="helpful">
            <i className="helpful-icon" />
            <button type="button">Helpful</button>
          </div>
        </div>
      </div>
    </div>
  );
}

Review.propTypes = {
  review: PropTypes.object.isRequired
};

export default Review;