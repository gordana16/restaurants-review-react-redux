import React, { Component } from "react";
import ReactDOM from "react-dom";
import google from "../../../../services/GoogleService";
import InfoWindowContent from "./InfoWindowContent";
import { getOpacity } from "../../../../shared/utilities";

class MapMarker extends Component {
  map = google.getMap();

  componentDidMount() {
    if (!this.map) {
      return;
    }
    const { place, redirect } = this.props;
    const opacity = getOpacity(place.rating);
    const marker = new window.google.maps.Marker({
      icon: "img/place_icon.png",
      title: place.name,
      position: place.geometry.location
    });
    marker.setOptions({ opacity: opacity });
    marker.setMap(this.map);

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
      infoWindow.open(this.map, marker);
    });
  }
  render() {
    return null;
  }
}

export default MapMarker;
