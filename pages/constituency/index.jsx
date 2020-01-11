import React, { Component, Fragment } from "react";

import { connect } from "react-redux";

import userAuth from "utils/userAuth";
import authSession from "utils/authSession";

import AccountNav from "components/Nav/Account/index";
import PanelMinister from "components/Panel/Minister";

import AccountHead from "pages/account/AccountHead";

import "./style.scss";

class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      state: "",
      area: ""
    };
  }

  componentDidMount() {
    const session = new authSession();
    const user = session.getProfile();

    this.setState({
      state: user.state,
      pincode: user.pincode,
      area: user.area
    });
  }

  render() {
    const { area, state } = this.state;
    return (
      <Fragment>
        <div className="container constituency">
          <div className="row">
            <div className="col-lg-3 d-none d-lg-block pt-5">
              <AccountNav />
            </div>
            <div className="col-lg-9">
              <AccountHead />

              <h1 className="title">
                <span>Your Constituency,</span> {area} - {state}
              </h1>

              <div className="row">
                {/* <div className="col-12 col-lg-6 col-xl-4">
                  <PanelMinister title="MCD Councillor" type="councillor" />
                </div> */}
                <div className="col-12 col-lg-6 col-xl-4">
                  <PanelMinister
                    title="Member of legislative assembly"
                    type="mla"
                  />
                </div>
                <div className="col-12 col-lg-6 col-xl-4">
                  <PanelMinister title="Member of parliament" type="mp" />
                </div>
                <div className="col-12 col-lg-6 col-xl-4">
                  <PanelMinister title="Chief minister" type="cm" />
                </div>
                <div className="col-12 col-lg-6 col-xl-4">
                  <PanelMinister title="Prime minister" type="pm" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default connect(state => state)(userAuth(Account));
