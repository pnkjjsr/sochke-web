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
      accountDrawer: "",
      userDrawer: ""
    };
  }

  handleOpen = e => {
    let name = `${e}Drawer`;
    this.setState({
      [name]: "open"
    });
  };
  handleClose = e => {
    let name = `${e}Drawer`;
    this.setState({
      [name]: ""
    });
  };

  render() {
    const { accountDrawer, userDrawer } = this.state;
    return (
      <Fragment>
        <div className="header bg" role="main">
          <div className="container">
            <div className="row">
              <div className="col-5 col-sm-6 col-lg-2 pl-0 pr-0 d-flex flex-row">
                <div className="menu d-inline-block d-lg-none d-flex align-items-center">
                  <i
                    className="material-icons"
                    onClick={e => this.handleOpen("account")}
                  >
                    menu
                  </i>
                  <Drawer
                    side="left"
                    open={accountDrawer}
                    action={e => this.handleClose("account")}
                  >
                    <AccountNav />
                  </Drawer>
                </div>

                <div className="logo">
                  <Link href="/">
                    <a>{process.env.domain}</a>
                  </Link>
                  <span>Beta</span>
                </div>
              </div>

              <div className="col-lg-6">
                <input className="form-control" type="text" />
              </div>

              <div className="col-7 col-sm-6 col-lg-4 pr-0 text-right d-flex justify-content-end align-items-center">
                <div className="nav-user">
                  <div onClick={e => this.handleOpen("user")}>
                    <UserImage />
                  </div>

                  <div className="drop-box">
                    <UserNav />
                  </div>

                  <Drawer
                    side="right"
                    open={userDrawer}
                    action={e => this.handleClose("user")}
                  >
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
