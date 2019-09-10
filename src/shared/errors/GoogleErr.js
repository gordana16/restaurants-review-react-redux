import GoogleService from "../../services/GoogleService";

const GoogleErr = ({ error, location = null }) => {
  if (!error) {
    return null;
  }
  const map = new GoogleService().getMap();
  const infoPosition = location ? location : map.getCenter();
  const infowindow = new window.google.maps.InfoWindow({
    content: `<div>${error}</div>`,
    maxWidth: 300
  });

  map.setOptions({ disableDefaultUI: true });
  infowindow.open(map);
  infowindow.setPosition(infoPosition);
  return null;
};

export default GoogleErr;
