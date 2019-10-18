import { API_KEY } from "../shared/config";

let instance;
class GoogleService {
  constructor() {
    if (instance) {
      return instance;
    }
    instance = this;
    this.map = null;
    this.placesService = null;
    this.streeViewService = null;
    this.infoWindow = null;
    this.markers = [];
  }

  getAPI() {
    return new Promise((resolve, reject) => {
      if (window.google) {
        return resolve();
      } else {
        const script = document.createElement("script");
        script.type = "text/javascript";
        script.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=places`;
        script.async = true;
        const elem = document.getElementsByTagName("script")[0];
        elem.parentNode.insertBefore(script, elem);
        script.onload = () => {
          resolve();
        };
      }
    });
  }

  initService(mapNode) {
    if (!this.map || (this.map && mapNode)) {
      const container = mapNode || document.createElement("div");
      this.map = new window.google.maps.Map(container, {
        center: { lat: 0, lng: 0 },
        zoom: 13,
        minZoom: 10
      });
      this.updateMarkers(this.map);
      this.placesService = new window.google.maps.places.PlacesService(
        this.map
      );

      if (!this.streeViewService) {
        this.streetViewService = new window.google.maps.StreetViewService();
      }

      if (!this.infoWindow) {
        this.infoWindow = new window.google.maps.InfoWindow();
      }
    }
  }

  getMap() {
    return this.map;
  }

  updateMapBounds() {
    const bounds = new window.google.maps.LatLngBounds();
    this.markers.forEach(marker => bounds.extend(marker.position));
    this.map.fitBounds(bounds);
  }

  getInfoWindow() {
    window.google.maps.event.clearListeners(this.infoWindow, "domready");
    return this.infoWindow;
  }
  closeInfoWindowOnUnload() {
    if (this.infoWindow) {
      window.google.maps.event.clearListeners(this.infoWindow, "domready");
      this.infoWindow.close();
    }
  }
  getCurrentLocation() {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          position => {
            this.location = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            this.map.setCenter(this.location);
            resolve(this.location);
          },
          err => reject(err.message)
        );
      } else {
        reject("Browser does not support geolocation");
      }
    });
  }

  getNearbyPlaces() {
    return new Promise((resolve, reject) => {
      if (!this.map) {
        reject("Google Place Service could not been loaded");
      } else {
        this.placesService.nearbySearch(
          {
            location: this.location,
            radius: "5000",
            type: ["restaurant"]
          },
          (results, status) => {
            if (status === window.google.maps.places.PlacesServiceStatus.OK) {
              resolve(results);
            } else {
              reject(`Google Place Service failed with status ${status}`);
            }
          }
        );
      }
    });
  }

  getPlaceDetails(placeId) {
    return new Promise((resolve, reject) => {
      this.placesService.getDetails({ placeId: placeId }, (results, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          resolve(results);
        } else {
          reject(`Google Place Service failed with status ${status}`);
        }
      });
    });
  }

  getPlaceStreetView(latlng) {
    return new Promise((resolve, reject) => {
      this.streetViewService.getPanorama(
        { location: latlng },
        (results, status) => {
          if (status === window.google.maps.StreetViewStatus.OK) {
            resolve(results);
          } else {
            reject(`${status}`);
          }
        }
      );
    });
  }

  addMarker(marker) {
    marker.setMap(this.map);
    this.markers.push(marker);
  }

  getMarkers() {
    return this.markers;
  }

  updateMarkers(map) {
    this.markers.forEach(marker => marker.setMap(map));
  }
  releaseMarkers() {
    this.markers.forEach(marker => {
      window.google.maps.event.clearListeners(marker, "click");
      marker.setVisible(true);
    });
  }
}

export default new GoogleService();
