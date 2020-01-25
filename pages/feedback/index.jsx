import React, { Component, Fragment } from "react";

import Feedback from "components/Feedback";

import "./style.scss";

class feedback extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static async getInitialProps({ pathname }) {
    return { pathname };
  }

  render() {
    const mainClass = "feedback";
    return (
      <Fragment>
        <div className="container">
          <div className="context">
            <div className="context__header">
              <h1>Feedback &amp; Suggestions</h1>
            </div>

            <div className="context__section">
              <p>
                Your feedback is most valuable for us. You can suggest us new
                functionality issue, design suggesions, your political
                recruitment and any other thoughts for the website.
              </p>

              <div className="row justify-content-center">
                <div className="col-lg-6">
                  <div className={mainClass}>
                    <Feedback />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default feedback;
