import React, { Component, Fragment } from "react";
import StaticAbout from "components/static/about";

import "common/styles/context.scss";

export default class cookies extends Component {
  render() {
    const mainClass = "context";
    return (
      <Fragment>
        <div className="container">
          <div className={mainClass}>
            <div className={`${mainClass}__header`}>
              <h1>About Us</h1>
            </div>

            <section className={`${mainClass}__section`}>
              <StaticAbout />
            </section>
          </div>
        </div>
      </Fragment>
    );
  }
}
