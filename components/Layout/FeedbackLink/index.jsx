import React, { Component, Fragment } from "react";
import Router from "next/router";

import "./style.scss";

class FeedbackLink extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleFeedback = () => {
    Router.push("/feedback");
  };

  render() {
    const mainClass = "feedback_link";
    return (
      <Fragment>
        <div className={mainClass}>
          <div className={`${mainClass}__link`} onClick={this.handleFeedback}>
            <i className="material-icons ">feedback</i>
            <label className={`${mainClass}_label`} htmlFor="feedback">
              Feedback
            </label>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default FeedbackLink;
