import React, { Component, Fragment } from "react";

export default class LoaderPoll extends Component {
  render() {
    const mainClass = "poll-panel";
    return (
      <Fragment>
        <div className={`${mainClass}__loader`}>
          <div className="poll"></div>
          <div className="action"></div>
        </div>
      </Fragment>
    );
  }
}
