import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Report from './Report.jsx';
import styles from '../styles/styles.module.css';
import { helpful } from '../styles/svgs/svgs.jsx';
import { displayUtils } from '../helpers';

class Review extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      textOverflow: false
    };
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount() {
    const overflowing = displayUtils.isOverflown(this.text);
    this.setState({
      textOverflow: overflowing
    });
  }

  render() {
    const { review } = this.props;
    const { openReport } = this.props;
    const { handleReportClick } = this.props;
    const { handleReportClear } = this.props;
    const { textOverflow } = this.state;
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (review.overall >= i + 1) {
        stars[i] = <span key={i} className={styles.reviewStar} />;
      } else {
        stars[i] = <span key={i} className={styles.reviewStarBlank} />;
      }
    }
    const initials = review.first_name[0].toUpperCase() + review.last_name[0].toUpperCase();
    return (
      <div className={styles.singleReview}>
        <div className={styles.reviewer}>
          <div className={styles.initialsIcon} style={{ backgroundColor: review.avatarcolor }}>
            {review.isvip
              ? <div className={styles.vipLabel}>VIP</div>
              : null}
            <div>{initials}</div>
          </div>
          <p className={styles.name}>{review.first_name + ' ' + review.last_name[0]}</p>
          <p className={styles.city}>{review.city}</p>
          <div className={styles.reviewerStat}>
            <span className={styles.reviewIcon} /><p className={styles.reviewsCount}>{review.totalreviews} reviews</p>
          </div>
        </div>
        <div className={styles.reviewDetails}>
          <div className={styles.reviewHeader}>
            <div className={styles.stars}>
              {stars}
            </div>
            <p className={styles.date}>&nbsp;&middot;&nbsp;&nbsp;Dined on {moment(review.date).format('MMMM Do, YYYY')}</p>
          </div>
          <div className={styles.ratings}>
            <span className={styles.ratingName}>Overall&nbsp;</span>
            <span className={styles.rating}>{review.overall}
              <span className={styles.dot}>&middot;</span>
            </span>
            <span className={styles.ratingName}>Food&nbsp;</span>
            <span className={styles.rating}>{review.food}
              <span className={styles.dot}>&middot;</span>
            </span>
            <span className={styles.ratingName}>Service&nbsp;</span>
            <span className={styles.rating}>{review.service}
              <span className={styles.dot}>&middot;</span>
            </span>
            <span className={styles.ratingName}>Ambience&nbsp;</span>
            <span className={styles.rating}>{review.ambience}</span>
          </div>
          <p ref={(node) => { this.text = node; }} className={styles.reviewTextPartial}>{review.text}</p>
          <div className={styles.reportHelpful}>
            {textOverflow
              ? <p className={styles.readMore}>+ Read more</p>
              : null}
            <div className={styles.reportHelpfulButtons}>
              <div className={styles.report} onClick={handleReportClick} data-id={review.id}>
                {openReport
                  ? <Report handleReportClear={handleReportClear} />
                  : null}
                <i className={styles.reportIcon} />
                <p className={styles.reportHelpfulText}>Report</p>
              </div>
              <div className={styles.helpful}>
                {helpful}
                <p className={styles.reportHelpfulText}>Helpful</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Review.propTypes = {
  review: PropTypes.object.isRequired,
  openReport: PropTypes.bool,
  handleReportClick: PropTypes.func.isRequired,
  handleReportClear: PropTypes.func.isRequired
};

Review.defaultProps = {
  openReport: null
};

export default Review;
