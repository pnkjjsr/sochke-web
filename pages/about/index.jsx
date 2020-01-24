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
                Sochke is a social plateform which enable users to connect with
                different people around them. And its a digital plateform which
                empower users to contritubte for their constituencies to make it
                better place.
              </p>

              <p>
                Sochke is a digital plateform which is enables user to
                contritubte for there constituencies to make a better
                constituency.
              </p>
            </section>
          </div>
        </div>
      </Fragment>
    );
  }
}
