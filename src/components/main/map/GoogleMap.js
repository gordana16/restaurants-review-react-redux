import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import GoogleService from "../../../services/GoogleService";
import MapMarkers from "./MapMarkers";
import GoogleErr from "../../../shared/errors/GoogleErr";
import { fetchPlaces } from "../../../actions";

class GoogleMap extends Component {
  constructor() {
    super();
    this.ref = React.createRef();
    this.service = null;
    this.state = {
      loadError: null,
      redirect: false,
      placeId: null
    };
  }

  componentDidMount() {
    this.service = new GoogleService();
    this.service
      .init(this.ref.current)
      .then(() => this.onScriptLoad())
      .then(() => this.props.fetchPlaces());
  }

  onScriptLoad = () => {
    return new Promise((resolve, reject) => {
      this.service
        .getCurrentLocation()
        .then(location => {
          const map = this.service.getMap();
          new window.google.maps.Marker({
            position: location,
            map: map
          });
          resolve();
        })
        .catch(error => {
          this.setState({ error });
          reject(error);
        });
    });
  };

  navigatePage = id => {
    this.setState({ redirect: true, placeId: id });
  };

  renderMarkers() {
    if (!this.props.places.length) {
      return null;
    }
    return <MapMarkers redirect={this.navigatePage} />;
  }
  render() {
    const { loadError, redirect, placeId } = this.state;
    const error = loadError || this.props.error;
    if (redirect) {
      return <Redirect to={`places/${placeId}`} />;
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
