import React, { Fragment, Component } from "react";
import Link from "next/link";
import { connect } from "react-redux";

import UserImage from "components/UserImage";
import Drawer from "components/Drawer";
import AccountNav from "components/Nav/Account";
import UserNav from "components/Nav/User";

import "./style.scss";

class HeaderUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openDrawer: ""
    };
  }

  handleOpen = () => {
    this.setState({
      openDrawer: "open"
    });
  };
  handleClose = () => {
    this.setState({
      openDrawer: ""
    });
  };

  render() {
    const { openDrawer } = this.state;

    return (
      <Fragment>
        <div className="header bg" role="main">
          <div className="container">
            <div className="row">
              <div className="col-5 col-sm-6 pl-0 pr-0">
                <div className="menu d-inline-block d-lg-none">
                  <span onClick={this.handleOpen}>M</span>
                  <Drawer name="account" side="left" open={openDrawer} action={this.handleClose}>
                    <AccountNav />
                  </Drawer>
                </div>

                <div className="logo">
                  <Link href="/">
                    <a>{process.env.domain}</a>
                  </Link>
                </div>
              </div>
              <div className="col-7 col-sm-6 pr-0 text-right">
                <div className="menu-right">
                  <div onClick={this.handleOpen}>
                    <UserImage />
                  </div>
                  <Drawer name="user" side="right" open={openDrawer} action={this.handleClose}>
                    <UserNav />
                  </Drawer>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default connect(state => state)(HeaderUser);
