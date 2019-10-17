import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { UncontrolledCarousel } from "reactstrap";
import StarRatings from "react-star-ratings";
import { ToastContainer, toast } from "react-toastify";
import ErrorModal from "../../shared/errors/ErrorModal";
import ReviewForm from "./ReviewForm";
import Reviews from "./Reviews";
import {
  fetchPlaceDetails,
  fetchPlaceDetailsReset,
  addReview,
  updateRating
} from "../../actions";
import { getPlace, getError, isFetching } from "../../selectors/placeSelector";
import google from "../../services/GoogleService";

class PlaceDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: false
    };
  }
  componentDidMount() {
    const { id } = this.props.match.params;

    google
      .getAPI()
      .then(() => google.initService())
      .then(() => this.props.fetchPlaceDetails(id));
  }

  componentDidUpdate(prevProps) {
    if (
      !prevProps.isFetching &&
      this.props.place.reviews.length > prevProps.place.reviews.length
    ) {
      toast.success("Review is successfully submitted!");
      //send an action to update place rating in array of places
      const { place } = this.props;
      this.props.updateRating(place.place_id, place.rating);
    }
  }

  componentWillUnmount() {
    this.props.fetchPlaceDetailsReset();
  }

  navigatePage = () => this.setState({ redirect: true });

  renderCarousel = () => {
    const { photos } = this.props.place;
    if (!photos) {
      return null;
    }
    const items = photos.map(photo => {
      return {
        src: photo.getUrl({ maxWidth: 500, maxHeight: 500 }),
        altText: "",
        caption: "",
        header: ""
      };
    });
    return <UncontrolledCarousel items={items} />;
  };

  onSubmit = review => {
    const { place_id } = this.props.place;
    this.props.addReview(place_id, { ...review, time: Date.now() });
  };

  render() {
    const { place, error, isFetching } = this.props;
    if (this.state.redirect) {
      return <Redirect to={`/`} />;
    }
    if (isFetching) {
      return <div className="loading-place">Loading...</div>;
    }
    if (error) {
      return <ErrorModal error={error} redirect={this.navigatePage} />;
    }

    return (
      <div className="place-detail container-fluid">
        <ToastContainer />
        <div className="row">
          <div className="col-md-9 mb-3">
            <div className="heading">
              <h1 className="mr-3">{place.name}</h1>
              <StarRatings
                name="rating"
                rating={place.rating}
                starRatedColor="orange"
                numberOfStars={5}
                starDimension="1.8rem"
                starSpacing=".1rem"
              />
            </div>
            <div className="font-italic">
              <p className="mb-0">{place.address}</p>
              <p className="mb-0"> Phone: {place.phone}</p>
              <a
                className={`${place.website ? "" : "d-none"}`}
                href={place.website}
              >
                Visit Restaurant Website
              </a>
            </div>

            <div className="row mt-3">
              <div className="photos col-sm-6 col-md-7 mb-3 mb-sm-0">
                {this.renderCarousel()}
              </div>
              <div className="col-sm-6 col-md-5">
                <div className="review-container">
                  <h2 className="mb-4">Leave a review:</h2>
                  <ReviewForm onSubmit={this.onSubmit} />
                </div>
              </div>
            </div>
          </div>
          <div className="reviews col-md-3 mt-3 mt-md-0 ">
            <Reviews reviews={place.reviews} />
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    place: getPlace(state),
    error: getError(state),
    isFetching: isFetching(state)
  };
};
export default connect(
  mapStateToProps,
  { addReview, updateRating, fetchPlaceDetails, fetchPlaceDetailsReset }
)(PlaceDetail);
