import React, { Component, Fragment } from "react";

export default class LoaderRespond extends Component {
  render() {
    const mainClass = "respond-item";
    return (
      <Fragment>
        <div className={`${mainClass} ${mainClass}__loader`}>
          <div className="top">
            <figure></figure>
            <div className="detail">
              <div className="name"></div>
              <div className="date"></div>
            </div>
          </div>
          <div className="respond"></div>

          <div className="counts"></div>
          <div className="bottom">
            <ul className="actions"></ul>
            <div className="detail"></div>
          </div>
        </div>
      </Fragment>
    );
  }
}
