import PropTypes from 'prop-types';
import React from 'react';
import styles from '../styles/styles.module.css';

function Summary(props) {
  const { totalReviews } = props;
  const { summary } = props;
  const { starPercentages } = props;
  const { handleRatingClick } = props;
  const stars = [];
  for (let i = 0; i < 5; i++) {
    if (summary.avg_overall >= i + 1) {
      stars[i] = <span key={i} className={styles.reviewStar} />;
    } else {
      stars[i] = <span key={i} className={styles.reviewStarBlank} />;
    }
  }
  return (
    <div className={styles.summary}>
      <div>
        <h4 className={styles.header}>What {totalReviews} People Are Saying</h4>
      </div>
      <div>
        <p className={styles.subHeader}>Overall ratings and reviews</p>
      </div>
      <div className={styles.center}>
        <div className={styles.left}>
          <p>Reviews can only be made by diners who have eaten at this restaurant</p>
          <div className={styles.overallStars}>
            <div>
              {stars}
            </div>
            <p>{summary.avg_overall} based on recent ratings</p>
          </div>
          <div className={styles.overallRatings}>
            <div className={styles.food}>
              <p className={styles.rating}>{summary.avg_food}</p>
              <p>Food</p>
            </div>
            <div className={styles.service}>
              <p className={styles.rating}>{summary.avg_service}</p>
              <p>Service</p>
            </div>
            <div className={styles.ambience}>
              <p className={styles.rating}>{summary.avg_ambience}</p>
              <p>Ambience</p>
            </div>
            <div className={styles.value}>
              <p className={styles.rating}>{summary.value_rating}</p>
              <p>Value</p>
            </div>
          </div>
          <div className={styles.noise}>
            <div className={styles.noiseIcon} />
            <span>Noise &middot; {summary.noise}</span>
          </div>
          <div className={styles.recommend}>
            <div className={styles.recommendIcon} />
            <span><strong>{Number.parseFloat(summary.rec_percent).toFixed(2)}% of people</strong> would recommend it to a friend</span>
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.bars}>
            {/* [[0, 23], [1, 42], ...] */}
            {starPercentages.map(ratingAndPercent => (
              <div className={styles.bar} key={ratingAndPercent[0]}>
                <span>{(ratingAndPercent[0] + 1).toString()}</span>
                <div className={styles.barContainer} id={`bar${ratingAndPercent[0] + 1}`} data-rating={ratingAndPercent[0] + 1} onClick={handleRatingClick}>
                  <div className={styles.progress} style={{ width: `${ratingAndPercent[1]}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className={styles.summaryBottom}>
        <div>
          <a className={styles.link}>Best Restaurants in {summary.location} ›</a>
        </div>
      </div>
    </div>
  );
}

Summary.propTypes = {
  totalReviews: PropTypes.number.isRequired,
  summary: PropTypes.object.isRequired,
  handleRatingClick: PropTypes.func.isRequired,
  starPercentages: PropTypes.array.isRequired
};

export default Summary;
