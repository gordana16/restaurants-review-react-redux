import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import google from "../../../services/GoogleService";
import MapMarkers from "./MapMarkers";
import GoogleErr from "../../../shared/errors/GoogleErr";
import { fetchPlaces } from "../../../actions";

class GoogleMap extends Component {
  constructor() {
    super();
    this.ref = React.createRef();
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
    if (!this.props.places.length || !this.ref.current) {
      return null;
    }
    return <MapMarkers redirect={this.navigatePage} />;
  }
  render() {
    const { onLoadError, redirect, placeId } = this.state;
    const error = onLoadError || this.props.error;
    if (redirect) {
      return <Redirect to={`/places/${placeId}`} />;
    }
    return (
      <React.Fragment>
        <div className="map" ref={this.ref} />
        {this.renderMarkers()}
        <GoogleErr error={error} />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return { places: state.places.data, error: state.places.error };
};
export default connect(
  mapStateToProps,
  { fetchPlaces }
)(GoogleMap);
