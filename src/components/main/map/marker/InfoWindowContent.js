import React, { Component } from "react";
import StarRatings from "react-star-ratings";
import { fetchPlaceStreetView } from "../../../../actions";

class InfoWindowContent extends Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
  }
  componentDidMount() {
    const { place } = this.props;
    const panorama = new window.google.maps.StreetViewPanorama(
      this.ref.current
    );
    fetchPlaceStreetView(place.geometry.location).then(pano => {
      if (!pano) {
        panorama.setVisible(false);
      } else {
        panorama.setPano(pano);
        panorama.setPov({
          heading: 270,
          pitch: 0
        });
        panorama.setOptions({
          visible: true,
          showRoadLabels: false,
          linksControl: false
        });
      }
    });
  }

  render() {
    const { place } = this.props;

    return (
      <div className="info-window">
        <div
          id="pano"
          ref={this.ref}
          className="d-flex flex-column justify-content-center"
        >
          {/* if street view is found, div will be hidden by pano */}
          <div className="px-2">
            Street View data not found for this location!
          </div>
        </div>
        <div className="text-center mt-2">
          <StarRatings
            rating={place.rating}
            starRatedColor="orange"
            starDimension="1.5rem"
            starSpacing=".1rem"
          />
          <h4> {place.name} </h4>
          <p> {place.vicinity} </p>
          <button className="btn btn-link btn-more" id="iw-btn" type="button">
            More info
          </button>
        </div>
      </div>
    );
  }
}

export default InfoWindowContent;
