import React, { Fragment, Component } from "react";
import Link from "next/link";
import { connect } from "react-redux";

import { service } from "apiConnect";

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
      userDrawer: "",
      classSearch: "",
      classResult: "",
      usersData: [],
      ministersData: []
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

  handleClick = () => {
    this.setState({
      classSearch: "form__top__active"
    });
  };

  handleSubmit = e => {
    e.preventDefault();
  };

  handleChange = e => {
    let keyword = e.target.value;

    service
      .post("/search", { keyword })
      .then(res => {
        let usersLen = res.data.users.length;
        let ministersLen = res.data.ministers.length;

        if (!usersLen && !ministersLen) return;

        this.setState({
          classResult: "form__result__show",
          usersData: res.data.users,
          ministersData: res.data.ministers
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  renderLoopUsers = () => {
    const { usersData } = this.state;

    return usersData.map(user => {
      return (
        <li>
          <a href="">{user.displayName}</a>
        </li>
      );
    });
  };
  renderLoopMinisters = () => {
    const { ministersData } = this.state;

    return ministersData.map(minister => {
      return (
        <li>
          <a href="">{minister.name}</a>
        </li>
      );
    });
  };

  render() {
    const mainClass = "form";
    const { accountDrawer, userDrawer, classSearch, classResult } = this.state;
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

              <div className="col-lg-7">
                <form onSubmit={this.handleSubmit}>
                  <div className={`${mainClass}`}>
                    <div className={`${mainClass}__top ${classSearch}`}>
                      <i className="material-icons">search</i>
                      <input
                        className={`${mainClass}__top__control`}
                        name="search"
                        type="text"
                        placeholder="Search"
                        onChange={this.handleChange}
                        onClick={this.handleClick}
                      />
                      <button className="btn btn-sm">Go</button>
                    </div>

                    <div className={`${mainClass}__result ${classResult}`}>
                      <ul>
                        <li>
                          <span>Users</span>
                        </li>
                        {this.renderLoopUsers()}
                      </ul>
                      <ul>
                        <li>
                          <span>Minsters</span>
                        </li>
                        {this.renderLoopMinisters()}
                      </ul>
                    </div>
                  </div>
                </form>
              </div>

              <div className="col-7 col-sm-6 col-lg-3 pr-0 text-right d-flex justify-content-end align-items-center">
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
