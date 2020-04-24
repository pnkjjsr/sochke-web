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
          <div className={`${mainClass}__content`}>
            <div className="container">
              <div className="d-none">
                <label htmlFor="title">
                  <b>Subscribe for more details</b>
                </label>
                <input type="text" placeholder="abc@xyz.com" />
                <button>submit</button>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Covid;
