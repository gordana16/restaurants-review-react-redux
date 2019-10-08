import React, { Component } from "react";
import { connect, Provider, ReactReduxContext } from "react-redux";
import { Redirect } from "react-router-dom";
import ReactDOM from "react-dom";
import { ToastContainer, toast } from "react-toastify";
import google from "../../../services/GoogleService";
import MapMarkers from "./MapMarkers";
import AddPlaceForm from "./AddPlaceForm";
import ErrorModal from "../../../shared/errors/ErrorModal";
import { fetchPlaces, addPlace, resetAddPlaceForm } from "../../../actions";
import {
  getPlaces,
  getError,
  isFetching
} from "../../../selectors/placesSelector";

class GoogleMap extends Component {
  static contextType = ReactReduxContext;
  constructor(props) {
    super(props);

    this.ref = React.createRef();
    this.infoWindow = null;
    this.state = {
      onLoadError: null,
      redirect: false,
      placeId: null
    };
  }

  componentDidMount() {
    google
      .getAPI()
      .then(() => google.initService(this.ref.current))
      .then(() => this.onScriptLoad())
      .then(() => this.props.fetchPlaces());
  }

  componentDidUpdate(prevProps) {
    if (
      !prevProps.isFetching &&
      this.props.places.length > prevProps.places.length
    ) {
      google.getInfoWindow().close();
      toast.success("Place is successfully submitted!");
    }
  }

  handleSubmitPlace = place => {
    this.props.addPlace(place);
  };

  createInfoWindow(event, map) {
    const { latLng } = event;
    const infoWindow = google.getInfoWindow();
    infoWindow.setOptions({
      content: '<div id="iw-place"/>',
      position: { lat: latLng.lat(), lng: latLng.lng() }
    });
    const store = this.context.store;

    infoWindow.addListener("domready", () => {
      ReactDOM.render(
        <Provider store={store}>
          <div className="info-window">
            <h4>Add new place: </h4>
            <AddPlaceForm onSubmit={this.handleSubmitPlace} />
          </div>
        </Provider>,
        document.getElementById("iw-place")
      );
    });

    ["closeclick", "position_changed"].forEach(e =>
      infoWindow.addListener(e, () => this.props.resetAddPlaceForm())
    );
    infoWindow.open(map);
  }

  onScriptLoad = () => {
    return new Promise((resolve, reject) => {
      google
        .getCurrentLocation()
        .then(location => {
          const map = google.getMap();
          new window.google.maps.Marker({
            position: location,
            map: map
          });
          map.addListener("click", event => {
            this.createInfoWindow(event, map);
          });

          resolve();
        })
        .catch(onLoadError => {
          this.setState({ onLoadError });
        });
    });
  };

  navigatePage = id => {
    this.setState({ redirect: true, placeId: id });
  };

  renderMarkers() {
    const { isFetching, places } = this.props;
    if (isFetching) {
      return null;
    }
    return <MapMarkers places={places} redirect={this.navigatePage} />;
  }
  render() {
    const { onLoadError, redirect, placeId } = this.state;
    const error = onLoadError || this.props.error;
    if (redirect) {
      return <Redirect to={`/places/${placeId}`} />;
    }
    return (
      <React.Fragment>
        <div className="map flex-grow-1 order-1 order-md-2" ref={this.ref} />
        <ToastContainer />
        {this.renderMarkers()}
        <ErrorModal error={error} />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    places: getPlaces(state),
    error: getError(state),
    isFetching: isFetching(state)
  };
};
export default connect(
  mapStateToProps,
  { fetchPlaces, addPlace, resetAddPlaceForm }
)(GoogleMap);
