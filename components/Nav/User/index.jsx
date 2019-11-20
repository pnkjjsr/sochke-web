import React, { Component, Fragment } from "react";
import Router from 'next/router'
import Link from "next/link";

import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import loginActions from 'pages/login/actions'

import authSession from "utils/authSession"
import authentication from "utils/authentication"

import "./style.scss";

class UserNav extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleLogout = (e) => {
    e.preventDefault();
    const { loginAction } = this.props;
    const session = new authSession()
    const auth = new authentication()

    loginAction.deauthenticate()
    session.logout();
    auth.signOut();
    Router.push('/login');
  }

  render() {
    return (
      <Fragment>
        <nav className="nav-user">
          <ul>
            <li>
              <Link href="/account">
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
})

export default connect(state => state, mapDispatchToProps)(UserNav);
