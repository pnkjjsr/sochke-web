import React, { Component, Fragment } from "react";

import CandidateList from "components/List/CandidateList";

import "./style.scss";

class CurrentElection extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const mainClass = "current_election";

    return (
      <Fragment>
        <div className={mainClass}>{this.props.children}</div>
      </Fragment>
    );
  }
}

export default CurrentElection;
