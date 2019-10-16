import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import StarRatings from "react-star-ratings";
import { getPlaces, isSorting } from "../../selectors/placesSelector";

class Places extends Component {
  renderPlaces() {
    const { places } = this.props;

    return places.map(place => (
      <li className="list-group-item " key={place.place_id}>
        <StarRatings
          rating={place.rating}
          starRatedColor="orange"
          starDimension="2rem"
          starSpacing=".5rem"
        />
        <div>
          <Link className="place-link" to={`/places/${place.place_id}`}>
            {place.name}
          </Link>
        </div>
      </li>
    ));
  }

  render() {
    return (
      <ul className="sidebar list-group order-3">{this.renderPlaces()}</ul>
    );
  }
}

const mapStateToProps = state => {
  return { places: getPlaces(state), isSorting: isSorting(state) };
};
export default connect(mapStateToProps)(Places);
