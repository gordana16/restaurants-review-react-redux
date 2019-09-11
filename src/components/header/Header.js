import React, { Component } from "react";
import { Link } from "react-router-dom";

class Header extends Component {
  render() {
    return (
      <div className="header">
        <Link to="/">Header</Link>
      </div>
    );
  }
}

export default Header;
