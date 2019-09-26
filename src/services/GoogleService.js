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
    this.infoWindow = null;
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
    if (this.placesService && !mapNode) {
      return;
    }
    const container = mapNode ? mapNode : document.createElement("div");
    this.map = new window.google.maps.Map(container, {
      center: { lat: 0, lng: 0 },
      zoom: 14
    });
    this.placesService = new window.google.maps.places.PlacesService(this.map);
    this.infoWindow = new window.google.maps.InfoWindow();
  }

  getMap() {
    return this.map;
  }

  getInfoWindow() {
    if (window.google) {
      window.google.maps.event.clearListeners(this.infoWindow, "domready");
    }
    return this.infoWindow;
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
}

export default new GoogleService();
