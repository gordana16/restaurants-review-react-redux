import React, { Component } from "react";
import ReactDOM from "react-dom";
import GoogleService from "../../../../services/GoogleService";
import InfoWindowContent from "./InfoWindowContent";

class MapMarker extends Component {
  map = new GoogleService().getMap();

  componentDidMount() {
    const { place, infoWindow, redirect } = this.props;
    const marker = new window.google.maps.Marker({
      icon: "img/place_icon.png",
      title: place.name,
      position: place.geometry.location
    });
    marker.setMap(this.map);

    marker.addListener("click", function() {
      const content = document.createElement("div");
      ReactDOM.render(<InfoWindowContent place={place} />, content);
      window.google.maps.event.addListener(infoWindow, "domready", () => {
        document
          .getElementById("info-window-btn")
          .addEventListener("click", () => redirect(place.id));
      });

      infoWindow.setContent(content.innerHTML);
      infoWindow.open(this.map, marker);
    });
  }
  render() {
    return null;
  }
}

export default MapMarker;
