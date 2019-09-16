import React, { Component } from "react";
import { connect } from "react-redux";
import { UncontrolledCarousel } from "reactstrap";
import StarRatings from "react-star-ratings";
import { ToastContainer, toast } from "react-toastify";
import google from "../../services/GoogleService";
import GoogleErr from "../../shared/errors/GoogleErr";
import ReviewForm from "./ReviewForm";
import { fetchPlaceDetails, addReview } from "../../actions";

class PlaceDetail extends Component {
  state = {
    error: null,
    place: {}
  };
  componentDidMount() {
    const { id } = this.props.match.params;
    google
      .getAPI()
      .then(() => google.initService())
      .then(() => fetchPlaceDetails(id))
      .then(place => this.setState({ place }))
      .catch(error => this.setState({ error }));
  }

  renderCarousel = () => {
    const { photos } = this.state.place;
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
    this.props.addReview(id, review);
    toast.success("Review is successfully submitted!");
  };

  render() {
    const { place, error } = this.state;
    if (error) {
      return <GoogleErr error={error} />;
    }
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
          <div className="reviews col-md-3 mt-3 mt-md-0">Reviews</div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return { reviews: state.reviews };
};
export default connect(
  mapStateToProps,
  { addReview }
)(PlaceDetail);
