import React, { Component, Fragment } from "react";

import Router from "next/router";
import Link from "next/link";

import Header from "../components/Header";
import Footer from "../components/Footer";

import "./style.scss";

class Completed extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  handleContribute = () => {
    Router.push("/mobile/register");
  };

  componentDidMount() {
    if (screen.width >= 768) Router.push("/");
  }

  render() {
    const mainClass = "welcome";
    return (
      <Fragment>
        <div className={mainClass}>
          <Header sub="You have completed all the contribution." />

          <div className={`${mainClass}__photo`}>
            <figure>
              <img
                src="https://firebasestorage.googleapis.com/v0/b/sochke-web.appspot.com/o/cdn%2Fintro%2Fwhy.gif?alt=media"
                alt="Sochke | Why"
              />
            </figure>
          </div>

          <div className={`${mainClass}__enter`}>
            <button
              className="btn btn-lg btn-success"
              onClick={this.handleContribute}
            >
              <small>I want to contribute to society</small>
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

export default Completed;
