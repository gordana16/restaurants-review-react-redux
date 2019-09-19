import React, { Component } from "react";
import StarRatings from "react-star-ratings";
import ToggleText from "../../shared/text/ToggleText";

class Reviews extends Component {
  renderReviews() {
    const { reviews } = this.props;
    return reviews.map(review => (
      <li className="list-group-item" key={review.time}>
        <h5 className="mb-0 font-weight-bold">{review.author_name}</h5>
        <StarRatings
          rating={review.rating}
          starRatedColor="orange"
          numberOfStars={5}
          name="rating"
          starDimension="16px"
          starSpacing="1px"
        />
        <ToggleText lines={3} more={"more"} less={"less"}>
          {review.text}
        </ToggleText>
      </li>
    ));
  }
  render() {
    return <ul className="list-group">{this.renderReviews()}</ul>;
  }
}

export default Reviews;
