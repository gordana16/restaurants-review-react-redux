import React, { Component } from "react";

class InfoWindowContent extends Component {
  render() {
    const { place } = this.props;

    return (
      <div className="info-window">
        <h4> {place.name} </h4>
        <p> {place.vicinity} </p>
        <button
          className="btn btn-link btn-more"
          id="info-window-btn"
          type="button"
        >
          More info
        </button>
      </div>
    );
  }
}

export default InfoWindowContent;
