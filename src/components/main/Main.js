import React, { Component } from "react";
import GoogleMap from "./GoogleMap";
import Places from "./Places";

class Main extends Component {
  render() {
    return (
      <div className="d-flex">
        <GoogleMap />
        <Places />
      </div>
    );
  }
}

export default Main;
