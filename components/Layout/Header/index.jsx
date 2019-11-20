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
    const { login } = props;
    if (login.token) {
      return {
        loggedIn: true
      };
    }
    return null;
  }
  componentDidUpdate(prevProps) {
    const { login } = this.props;

    if (prevProps.login.token != login.token) {
      this.setState({
        loggedIn: false
      });
    }
  }

  componentDidMount() {
    const session = new authSession();
    const token = session.getToken();
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
