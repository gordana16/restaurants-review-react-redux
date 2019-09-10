import { API_KEY } from "../shared/config";

let instance;
class GoogleService {
  constructor() {
    if (instance) {
      return instance;
    }
    instance = this;
    this.map = null;
    this.location = null;
  }
  init(mapNode) {
    return new Promise((resolve, reject) => {
      if (window.google) {
        resolve(this.map);
      }
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=places`;
      script.async = true;
      const elem = document.getElementsByTagName("script")[0];
      elem.parentNode.insertBefore(script, elem);
      script.onload = () => {
        this.map = new window.google.maps.Map(mapNode, {
          center: { lat: 0, lng: 0 },
          zoom: 14
        });

        resolve(this.map); // resolve with script, not event
      };
    });
  }

  getMap() {
    return this.map;
  }

  getCurrentLocation() {
    return new Promise((resolve, reject) => {
      if (this.location) {
        resolve(this.location);
      } else {
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
      }
    });
  }

  getNearbyPlaces() {
    return new Promise((resolve, reject) => {
      if (!this.map || !this.location) {
        reject("Google Place Service could not been loaded");
      } else {
        const service = new window.google.maps.places.PlacesService(this.map);
        service.nearbySearch(
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
}

export default GoogleService;
