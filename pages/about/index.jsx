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
                Sochke App is a technology &amp; data-driven platform that
                enables citizens to connect with their area minister and
                minister’s work.
              </p>

              <p>
                Sochke is a social platform that enables users to connect with
                other users. And it's a digital platform that empowers citizens
                to contribute to their constituencies to make it a better place.
              </p>

              <p>
                Agenda: We’ll make politics transparent for the citizens and we
                want to change the perspective of politics.
              </p>

              <p>
                We want to change the perspective of politics and make politics
                and minister work transparent and accessible every time for
                users. Instead of word users would believe in data.
              </p>

              <p>
                And want to break the hidden wall between common man and
                minister. Minister should be accessible all the time.
              </p>

              <p>
                All of this makes India a more cohesive, participative and
                involved democracy.
              </p>
            </section>
          </div>
        </div>
      </Fragment>
    );
  }
}
