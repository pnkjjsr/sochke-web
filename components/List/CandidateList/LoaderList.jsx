import React, { Component, Fragment } from "react";

export default class LoaderList extends Component {
  render() {
    const mainClass = "candidate-list";
    return (
      <Fragment>
        <div className={`${mainClass}__loader`}>
          <div className="list"></div>
          <div className="list-sm"></div>
          <div className="list"></div>
        </div>
      </Fragment>
    );
  }
}
