import React, { Component, Fragment } from "react";

import Router from "next/router";
import Link from "next/link";
import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";

import "./style.scss";

class Splash extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  handleContribute = () => {
    Router.push("/mobile/contribute");
  };

  render() {
    const mainClass = "welcome";
    return (
      <Fragment>
        <div className={mainClass}>
          <header className={`${mainClass}__header`}>
            <div className="logo">
              <Link href="/">
                <a>{process.env.domain}</a>
              </Link>
              <span>Alpha</span>
            </div>
            <small>
              Political Networking Platform Contribute, Connect &amp; Build
              Healthy Democracy.
            </small>
          </header>

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
              <small>Let's</small>
              <span>Contribute</span>
            </button>

            <div className="link">
              Already a member?{" "}
              <Link href="/login">
                <a>Login</a>
              </Link>
            </div>
          </div>

          <footer className={`${mainClass}__footer`}>
            <div className="copy">© 2019 Sochke</div>
            <div className="social">
              <Link href="https://www.facebook.com/sochkeApp">
                <a className="facebook" target="_blank">
                  <FaFacebookF />
                </a>
              </Link>
              <Link href="https://www.twitter.com/sochkeApp">
                <a className="twitter" target="_blank">
                  <FaTwitter />
                </a>
              </Link>
              <Link href="https://www.linkedin.com/company/sochke">
                <a className="linkedin" target="_blank">
                  <FaLinkedinIn />
                </a>
              </Link>
            </div>
          </footer>
        </div>
      </Fragment>
    );
  }
}

export default Splash;
