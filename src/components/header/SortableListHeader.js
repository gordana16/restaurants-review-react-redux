import React, { Component } from "react";
import { connect } from "react-redux";
import StarRatings from "react-star-ratings";
import { sortPlaces, filterPlaces, resetFilterPlaces } from "../../actions";
import { DESC_SORT, ASC_SORT, NO_SORT } from "../../actions/types";
import { getSort, getFilter } from "../../selectors/placesSelector";
import variables from "../../styles/_variables.scss";

class SortableListHeader extends Component {
  handleSortClick(direction) {
    if (direction === this.props.sortDirection) {
      this.props.sortPlaces(NO_SORT);
    } else {
      this.props.sortPlaces(direction);
    }
  }

  handleFilterClick(filter) {
    if (filter === this.props.ratingFilter) {
      this.props.resetFilterPlaces();
    } else {
      this.props.filterPlaces(filter);
    }
  }

  render() {
    const { sortDirection } = this.props;
    return (
      <div className="filter-sort-box d-flex justify-content-start justify-content-md-center ">
        <svg
          style={
            sortDirection === DESC_SORT
              ? { fill: variables.mainYellowColor }
              : { fill: variables.colorGreyLight1 }
          }
          className="down-icon mt-1"
          onClick={() => this.handleSortClick(DESC_SORT)}
        >
          <use xlinkHref="/img/sprite.svg#icon-triangle-down"></use>
        </svg>

        <svg
          style={
            sortDirection === ASC_SORT
              ? { fill: variables.mainYellowColor }
              : { fill: variables.colorGreyLight1 }
          }
          className="up-icon mt-1 mr-1"
        >
          <use
            xlinkHref="/img/sprite.svg#icon-triangle-up"
            onClick={() => this.handleSortClick(ASC_SORT)}
          ></use>
        </svg>
        <StarRatings
          name="rating"
          rating={this.props.ratingFilter}
          starEmptyColor={variables.colorGreyLight1}
          starHoverColor={variables.mainYellowColor}
          starRatedColor={variables.mainYellowColor}
          numberOfStars={5}
          changeRating={filter => this.handleFilterClick(filter)}
          starDimension="1.8rem"
          starSpacing=".1rem"
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { sortDirection: getSort(state), ratingFilter: getFilter(state) };
};

export default connect(
  mapStateToProps,
  { sortPlaces, filterPlaces, resetFilterPlaces }
)(SortableListHeader);
