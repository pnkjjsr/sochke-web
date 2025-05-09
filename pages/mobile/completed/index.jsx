import React, { Component, Fragment } from "react";

import Router from "next/router";
import Link from "next/link";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import registerActions from "pages/register/action";
import layoutActions from "components/Layout/actions";

import Header from "../components/Header";
import Footer from "../components/Footer";

import "./style.scss";

class Completed extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static getDerivedStateFromProps(props, state) {
    const { register } = props;
    if (register.view === 1) {
      Router.push("/");
    }
    return null;
  }

  componentDidMount() {
    if (screen.width >= 768) Router.push("/");
    const { registerAction, path, layoutAction } = this.props;
    layoutAction.update_path(path);
    registerAction.check_login();
  }

  handleContribute = () => {
    Router.push("/mobile/register");
  };

  render() {
    const mainClass = "welcome";
    return (
      <Fragment>
        <div className={mainClass}>
          <div className={`${mainClass}__heading`}>
            Hi, you have seen contributions of others.
          </div>

          <div className={`${mainClass}__photo`}>
            <figure>
              <img
                src="https://firebasestorage.googleapis.com/v0/b/sochke-web.appspot.com/o/cdn%2Fintro%2Fcomplete.gif?alt=media"
                alt="Sochke | Why"
              />
            </figure>
          </div>

          <p className={`${mainClass}__para`}>
            Now, it's your turn to contribute to your society. Let's develop our
            nation "Together"!
          </p>

          <div className={`${mainClass}__enter`}>
            <button
              className="btn btn-lg btn-success"
              onClick={this.handleContribute}
            >
              <span>Create My Account</span>
            </button>

            <div className="link">
              Already a member?{" "}
              <Link href="/login">
                <a>Login</a>
              </Link>
            </div>
          </div>

          <Footer />
        </div>
      </Fragment>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  registerAction: bindActionCreators(registerActions, dispatch),
  layoutAction: bindActionCreators(layoutActions, dispatch),
});

export default connect((state) => state, mapDispatchToProps)(Completed);
