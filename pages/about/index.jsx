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
                Sochke is a technology and data-driven platform that enables
                citizens to connect with their area minister and minister’s
                work, experience and background.
              </p>

              <p>
                Sochke is a networking platform that enables users to connect
                with other users. And it's a digital platform that empowers
                citizens to contribute to their constituencies to make it a
                better place.
              </p>

              <p>We’ll make politics transparent for the citizens.</p>

              <p>
                We want to change the perspective of politics and make politics
                and minister work transparent and accessible every time for
                citizens. Instead of the minister's word, citizens will believe
                in data.
              </p>

              <p>
                And want to break the hidden wall between the common man and
                minister. Ministers should be accessible all the time.
              </p>

              <p>
                All of this makes India a more cohesive, participative and
                involved democracy.
              </p>

              <p>
                You can contact with 'Sochke' via email at{" "}
                <b>
                  <a href="mailto:">contact@sochke.com</a>
                </b>
              </p>
            </section>
          </div>
        </div>
      </Fragment>
    );
  }
}
