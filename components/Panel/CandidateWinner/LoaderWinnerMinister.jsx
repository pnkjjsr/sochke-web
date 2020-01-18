import React, { Component, Fragment } from "react";

export default class LoaderWinnerMinister extends Component {
  render() {
    const mainClass = "candidate-winner";
    return (
      <Fragment>
        <div className={`${mainClass}__loader`}>
          <div className="photo"></div>
          <div className="title"></div>
          <div className="party"></div>
          <div className="name"></div>
          <div className="tenure"></div>
          <div className="action"></div>
        </div>
      </Fragment>
    );
  }
}
