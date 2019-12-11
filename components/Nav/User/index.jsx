import React, { Component, Fragment } from "react";
import Router from "next/router";
import Link from "next/link";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import loginActions from "pages/login/actions";

import authSession from "utils/authSession";
import authentication from "utils/authentication";

import "./style.scss";

class UserNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: ""
    };
  }

  handleLogout = e => {
    e.preventDefault();
    const { loginAction } = this.props;
    const session = new authSession();
    const auth = new authentication();

    loginAction.deauthenticate();
    session.logout();
    auth.signOut();
    Router.push("/login");
  };

  componentDidMount() {
    const session = new authSession();
    const profile = session.getProfile();
    let userName = profile.userName;

    this.setState({
      url: userName
    });
  }

  render() {
    const { url } = this.state;

    return (
      <Fragment>
        <nav className="user">
          <ul>
            <li>
              <Link href={`/profile/${url}`} as={`/profile/${url}`}>
                <a>Profile</a>
              </Link>
            </li>
            <li>
              <Link href="/constituency">
                <a>Account</a>
              </Link>
            </li>
            <li>
              <Link href="/">
                <a onClick={this.handleLogout}>Logout</a>
              </Link>
            </li>
          </ul>
        </nav>
      </Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  loginAction: bindActionCreators(loginActions, dispatch)
});

export default connect(state => state, mapDispatchToProps)(UserNav);
