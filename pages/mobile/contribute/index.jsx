import React, { Component, Fragment } from "react";
import { FaInfoCircle } from "react-icons/fa";
import Router from "next/router";

import Link from "next/link";
import Photo from "components/Photo";
import Button from "components/Form/Button";

import "./style.scss";

class Contribute extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  handleRegister = () => {
    Router.push("/mobile/register");
  };

  componentDidMount() {
    if (screen.width >= 768) Router.push("/");
  }

  render() {
    const mainClass = "contribute";
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

            <div className="account">
              <Link href="/login">
                <a>
                  <Photo />
                </a>
              </Link>
            </div>
          </header>

          <div className={`${mainClass}__contribution`}>
            <div className="bot">
              <FaInfoCircle className="info" />

              <div className="detail">
                <Photo className="photo" />
                <div>
                  <h4 className="title">Pankaj jasoria</h4>
                  <p>Isn’t road side slum is not a problem for goverment?</p>
                </div>
              </div>
            </div>
          </div>

          <footer className={`${mainClass}__footer`}>
            <div className="top">
              <Button text="Agree" variant="btn-success" />
              <Button text="Disagree" variant="btn-danger" />
              <Button text="Pass" variant="btn-outline-primary" />
            </div>
            <div className="bot">
              <div className="add" onClick={this.handleRegister}>
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/sochke-web.appspot.com/o/cdn%2Fintro%2Fadd.gif?alt=media"
                  alt="Add Contribute"
                />
              </div>
            </div>
          </footer>
        </div>
      </Fragment>
    );
  }
}

export default Contribute;
