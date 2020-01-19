import React, { Component, Fragment } from "react";

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
              <h2>Introduction</h2>
              <p>
                Sochke.com, is a 'polity network' internet platform between
                people and minister(s).
              </p>
              <p>
                Connect > Visibility > Voice > Understanding > Authority >
                Contribute > Succeed
              </p>
            </section>
          </div>
        </div>
      </Fragment>
    );
  }
}
