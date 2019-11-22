import React, { Component, Fragment } from "react";

import userAuth from "utils/userAuth";

import AccountNav from "components/Nav/Account/index";

import AccountHead from "./AccountHead";

import "./style.scss";

class Account extends Component {
  render() {
    return (
      <Fragment>
        <div className="container account">
          <div className="row">
            <div className="col-lg-3 d-none d-lg-block pt-5">
              <AccountNav />
            </div>
            <div className="col-lg-9">
              <AccountHead />
            </div>
          </div>
        </div>
        <style jsx>{``}</style>
      </Fragment>
    );
  }
}

export default userAuth(Account);
