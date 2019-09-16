import React from "react";
import google from "../../services/GoogleService";

const GoogleErr = ({ error }) => {
  const map = google.getMap();
  if (!error || !map) {
    return null;
  }

  const infoPosition = map.getCenter();
  const infowindow = new window.google.maps.InfoWindow({
    content: `<div>${error}</div>`,
    maxWidth: 300
  });

  map.setOptions({ disableDefaultUI: true });
  infowindow.open(map);
  infowindow.setPosition(infoPosition);
  return (
    <div className="alert alert-danger ">
      <p>{error}</p>
    </div>
  );
};

export default GoogleErr;
