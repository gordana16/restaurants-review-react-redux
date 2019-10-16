import React, { Component } from "react";
import google from "../../../services/GoogleService";
import MapMarker from "./marker/MapMarker";

class MapMarkers extends Component {
  componentDidUpdate() {
    const markers = google.getMarkers();

    const visiblePlaces = this.props.places;

    const visibleMarkers = markers.filter(marker =>
      visiblePlaces.find(
        place =>
          place.geometry.location.lat() === marker.position.lat() &&
          place.geometry.location.lng() === marker.position.lng()
      )
    );

    const hiddenMarkers = markers.filter(
      marker => !visibleMarkers.includes(marker)
    );

    visibleMarkers.forEach(marker => marker.setVisible(true));
    hiddenMarkers.forEach(marker => marker.setVisible(false));
  }

  renderMarkers = () => {
    return this.props.places.map(place => {
      return (
        <MapMarker
          key={place.place_id}
          place={place}
          redirect={this.props.redirect}
        />
      );
    });
  };

  render() {
    return <React.Fragment>{this.renderMarkers()}</React.Fragment>;
  }
}

export default MapMarkers;
