import React, { Component } from "react";
import ReactDOM from "react-dom";
import google from "../../../../services/GoogleService";
import InfoWindowContent from "./InfoWindowContent";
import { getOpacity } from "../../../../shared/utilities";

class MapMarker extends Component {
  componentDidMount() {
    const map = google.getMap();
    const markers = google.getMarkers();
    const { place, redirect } = this.props;
    let marker = null;
    marker = markers.find(
      marker =>
        marker.position.lat() === place.geometry.location.lat() &&
        marker.position.lng() === place.geometry.location.lng()
    );
    if (!marker) {
      marker = new window.google.maps.Marker({
        icon: "/img/place_icon.png",
        title: place.name,
        position: place.geometry.location
      });
      marker.setMap(map);
      google.addMarker(marker);
    }

    const opacity = getOpacity(place.rating);
    marker.setOptions({ opacity: opacity });

    marker.addListener("click", function() {
      const infoWindow = google.getInfoWindow();
      infoWindow.setContent('<div id="iw-marker"/>');
      infoWindow.addListener("domready", () => {
        ReactDOM.render(
          <InfoWindowContent place={place} />,
          document.getElementById("iw-marker")
        );
        document
          .getElementById("iw-btn")
          .addEventListener("click", () => redirect(place.place_id));
      });
      infoWindow.open(map, marker);
    });
  }

  render() {
    return null;
  }
}

export default MapMarker;
