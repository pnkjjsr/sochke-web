import React, { Component, Fragment } from "react";

import Link from "next/link";
import { connect } from "react-redux";

import authSession from "utils/authSession";

import Drawer from "components/Drawer";

import "./style.scss";

class Nav extends Component {
  constructor(props) {
    super(props);

    this.state = {
      admin: props.user.profile.userType,
      nav: "",
      anime: "",
      imgUsr: "",
      openMenu: ""
    };
  }
  handleOpen = () => {
    this.setState({
      openMenu: "open"
    });
  };
  handleClose = () => {
    this.setState({
      openMenu: ""
    });
  };

  renderUser(e) {
    const { imgUsr } = this.state;
    let user = !imgUsr ? "icon" : <img src={imgUsr} alt="user profile image" />;

    return (
      <div className={`user-menu ${e}`} onClick={this.handleOpen}>
        <figure>{user}</figure>
      </div>
    );
  }

  async componentDidMount() {
    const auth = new authSession();
    const profile = await auth.getProfile();

    this.setState({
      imgUsr: profile.photoURL
    });
  }

  render() {
    const { nav, anime, openMenu } = this.state;
    const { action } = this.props;

    return (
      <Fragment>
        {this.renderUser()}

        <Drawer side="right" open={openMenu} action={this.handleClose}>
          <nav>
            <ul className={anime}>
              <li>{this.renderUser("inside")}</li>

              <li>
                <Link href="/account">
                  <a>Account</a>
                </Link>
              </li>
              <li>
                <Link href="/">
                  <a onClick={action}>Logout</a>
                </Link>
              </li>
            </ul>
          </nav>
        </Drawer>
      </Fragment>
    );
  }
}

export default connect(state => state)(Nav);
