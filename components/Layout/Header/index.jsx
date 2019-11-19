import React, { Fragment, Component } from "react";
import { connect } from "react-redux";

import authSession from "utils/authSession";

import HeaderOpen from "./HeaderOpen";
import HeaderUser from "./HeaderUser";

import "./style.scss";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false
    };
  }

  static getDerivedStateFromProps(props) {
    if (!props.login.token) return {
      loggedIn: false
    };

    if (props.login.token) return {
      loggedIn: true
    };

    return null;
  }

  componentDidMount() {
    const session = new authSession();
    let token = session.getToken();

    if (token) {
      this.setState({
        loggedIn: true
      });
    }
  }

  render() {
    const { loggedIn } = this.state;
    return <Fragment>{!loggedIn ? <HeaderOpen /> : <HeaderUser />}</Fragment>;
  }
}

export default connect(state => state)(Header);
