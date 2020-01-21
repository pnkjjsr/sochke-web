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
                Sochke is a modern social media plateform which enables users to
                connect with other users, They can connect there congressmen
                also.
              </p>
              <p>
                Sochke is a digital plateform which is enables user to
                contritubte for there constituencies to make a better
                constituency.
              </p>
              <p>
                Some times we don't know how is responsible for which task or
                how to measure the credibility of the canditate so that we can
                make better decision during election.
              </p>
            </section>
          </div>
        </div>
      </Fragment>
    );
  }
}
