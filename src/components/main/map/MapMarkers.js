import React, { Component } from "react";
import { connect } from "react-redux";
import MapMarker from "./marker/MapMarker";

class MapMarkers extends Component {
  renderMarkers = () => {
    return this.props.places.map(place => (
      <MapMarker
        key={place.place_id}
        place={place}
        redirect={this.props.redirect}
      />
    ));
  };
  render() {
    return <React.Fragment>{this.renderMarkers()}</React.Fragment>;
  }
}

const mapStateToProps = state => {
  return { places: state.places.data };
};

export default connect(mapStateToProps)(MapMarkers);
