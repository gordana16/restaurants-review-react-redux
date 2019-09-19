import React, { Component } from "react";
import { connect } from "react-redux";
import { UncontrolledCarousel } from "reactstrap";
import StarRatings from "react-star-ratings";
import { ToastContainer, toast } from "react-toastify";
import ErrorModal from "../../shared/errors/ErrorModal";
import ReviewForm from "./ReviewForm";
import Reviews from "./Reviews";
import { fetchPlaceDetails, addReview } from "../../actions";

class PlaceDetail extends Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchPlaceDetails(id);
  }

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
    const { id } = this.props.match.params;
    this.props.addReview(id, { ...review, time: Date.now() });
    toast.success("Review is successfully submitted!");
  };

  render() {
    const { place, error } = this.props;
    if (error) {
      return <ErrorModal error={error} redirectTo={"/places"} />;
    }

    if (Object.entries(place).length === 0 && place.constructor === Object)
      return <div>Loading...</div>;

    return (
      <div className="place-detail container-fluid">
        <ToastContainer />
        <div className="row">
          <div className="col-md-9">
            <div className="heading mt-5">
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
                <div className="review-container h-100">
                  <h2 className="mb-4">Leave a review:</h2>
                  <ReviewForm onSubmit={this.onSubmit} />
                </div>
              </div>
            </div>
          </div>
          <div className="reviews col-md-3 mt-3 mt-md-0">
            <Reviews reviews={place.reviews} />
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    place: state.place.details,
    error: state.place.error
  };
};
export default connect(
  mapStateToProps,
  { addReview, fetchPlaceDetails }
)(PlaceDetail);
