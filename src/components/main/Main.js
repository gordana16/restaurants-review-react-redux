import React, { Component } from "react";
import GoogleMap from "./map/GoogleMap";
import Places from "./Places";

class Main extends Component {
  render() {
    return (
      // <div className="content d-flex flex-column flex-md-row">
      <React.Fragment>
        <GoogleMap />
        <Places />
      </React.Fragment>
    );
  }
}

export default Main;
