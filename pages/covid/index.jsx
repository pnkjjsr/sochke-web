import React, { Component, Fragment } from "react";

import MapComponent from "components/Map";

import "./style.scss";

class Covid extends Component {
  render() {
    const mainClass = "covid";
    return (
      <Fragment>
        <div className={mainClass}>
          <MapComponent />
        </div>
      </Fragment>
    );
  }
}

export default Covid;
