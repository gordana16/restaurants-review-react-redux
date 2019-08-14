import React, { Component } from "react";

class GoogleMap extends Component {
  constructor() {
    super();
    this.ref = React.createRef();
    this.map = null;
  }
  componentDidMount() {
    if (!window.google) {
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://maps.google.com/maps/api/js?key=AIzaSyCgURx8CJ4iv_GN20xPz3Iall7r4pqwpmU`;
      const elem = document.getElementsByTagName("script")[0];
      elem.parentNode.insertBefore(script, elem);
      script.addEventListener("load", e => {
        this.onScriptLoad();
      });
    } else {
      this.onScriptLoad();
    }
  }

  onScriptLoad = () => {
    if (!this.map) {
      this.map = new window.google.maps.Map(this.ref.current, {
        center: { lat: 0, lng: 0 },
        zoom: 13
      });
    }
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          this.map.setCenter(location);
          const marker = new window.google.maps.Marker({
            position: location,
            title: "Current location"
          });

          // To add the marker to the map, call setMap();
          marker.setMap(this.map);
        },
        function() {
          console.error("The Geolocation service failed.'");
        }
      );
    } else {
      console.error("Browser does not support geoloaction");
    }
  };

  render() {
    return <div style={{ width: "85%", height: "100vh" }} ref={this.ref} />;
  }
}

export default GoogleMap;
