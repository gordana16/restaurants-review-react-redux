import React, { Component } from "react";

class Place extends Component {
  render() {
    const { id } = this.props.match.params;
    return <div> Rendering place with id: {id} </div>;
  }
}

export default Place;
