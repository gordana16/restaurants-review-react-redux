import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { matchPath } from "react-router";
import DisplayPlacesHeader from "./SortableListHeader";

class Header extends Component {
  match = () =>
    matchPath(this.props.location.pathname, {
      path: "/places/:id",
      exact: true,
      strict: false
    });
  render() {
    return (
      <React.Fragment>
        <nav className="navbar navbar-1 flex-grow-1 order-0 ">
          <Link to="/" className="navbar-brand">
            <img
              src="img/logo.png"
              className="d-inline-block align-top"
              alt=""
            />
            <span className="align-bottom">Restaurant Reviews</span>
          </Link>
        </nav>
        <nav
          className="navbar navbar-2 order-2 order-md-1 text-md-center"
          style={this.match() ? { display: "none" } : { display: "block" }}
        >
          <span className="pl-2 pl-md-0">Nearby Restaurants</span>
          <DisplayPlacesHeader />
        </nav>
      </React.Fragment>
    );
  }
}

export default withRouter(Header);
