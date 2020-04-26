import React, { Component } from "react";

import "./style.scss";

export default class MarkerComponent extends Component {
  render() {
    const mainClass = "marker_component";
    return (
      <div className={mainClass}>
        <span className="material-icons">room</span>
      </div>
    );
  }
}
