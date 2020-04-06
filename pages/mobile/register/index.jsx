import React, { Component } from "react";
import Link from "next/link";
import Router from "next/router";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import registerActions from "pages/register/action";
import layoutActions from "components/Layout/actions";

import Header from "../components/Header";
import Footer from "../components/Footer";
import RegisterComponent from "../components/Register";

import "./style.scss";

class Register extends Component {
  static async getInitialProps({ pathname }) {
    const path = pathname;
    return { path };
  }

  static getDerivedStateFromProps(props, state) {
    const { register } = props;

    if (register.view === 1) {
      Router.push("/");
    }
    return true;
  }

  componentDidMount() {
    if (screen.width >= 768) Router.push("/");
    const { registerAction, path, layoutAction } = this.props;
    layoutAction.update_path(path);
    registerAction.check_login();
  }

  render() {
    const mainClass = "mobile_register";
    return (
      <div className={mainClass}>
        <div className={`${mainClass}__skip`}>
          <Link href="/mobile/contribute">
            <a>Skip</a>
          </Link>
        </div>
        <Header sub="Create your citizen account. Let’s build our nation 'Together'!" />

        <RegisterComponent />

        <Footer />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  registerAction: bindActionCreators(registerActions, dispatch),
  layoutAction: bindActionCreators(layoutActions, dispatch),
});

export default connect((state) => state, mapDispatchToProps)(Register);
