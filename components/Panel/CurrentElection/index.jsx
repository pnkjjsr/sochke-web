import React, { Component, Fragment } from "react";
import "./style.scss";

class CurrentElection extends Component {
  render() {
    const mainClass = "current_election";
    return (
      <Fragment>
        <div className={mainClass}>
          <span>Coming Soon</span>, 2020 Delhi Candidate.
        </div>
      </Fragment>
    );
  }
}

export default CurrentElection;
