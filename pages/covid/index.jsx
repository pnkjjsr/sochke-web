import React, { Component, Fragment } from "react";

import MapComponent from "components/Map";
import SubscribeComponent from "components/Subscribe";

import "./style.scss";

class Covid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayLocation: "",
    };
  }

  componentDidMount() {}

  render() {
    const mainClass = "covid";
    const { displayLocation } = this.state;
    return (
      <Fragment>
        <div className={mainClass}>
          <MapComponent />
          <div className={`${mainClass}__content`}>
            <div className="container">
              {/* Subscription Box */}
              <div className={`${mainClass}__subscribe`}>
                <SubscribeComponent />
              </div>
            </div>
          </div>

          <footer className={`${mainClass}__footer`}>
            <div className="bot">
              <label>
                <small>I want support in</small>
                <br /> Covid-19
              </label>
              <div className="add" onClick={this.handleRegister}>
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/sochke-web.appspot.com/o/cdn%2Fcovid%2Fsupport.gif?alt=media"
                  alt="Add Contribute"
                />
              </div>
            </div>
          </footer>
        </div>
      </Fragment>
    );
  }
}

export default Covid;
