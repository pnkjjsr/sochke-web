import React, { Component, Fragment } from "react";

import AccountNav from "components/Nav/Account";

import "./style.scss";

export class index extends Component {
  render() {
    return (
      <Fragment>
        <div className="container personal-info">
          <div className="row">
            <div className="col-lg-3 d-none d-lg-block pt-5">
              <AccountNav />
            </div>
            <div className="col-lg-9">
              <h1>Data &amp; personalisation</h1>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default index;
