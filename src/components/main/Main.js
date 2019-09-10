import React, { Component } from "react";
import GoogleMap from "./map/GoogleMap";
import Places from "./Places";

class Main extends Component {
  render() {
    return (
      <div className="content">
        <GoogleMap />
        <Places />
      </div>
    );
  }
}

export default Main;
