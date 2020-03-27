import React, { Component, Fragment } from "react";
import { TiPlus } from "react-icons/ti";
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

          <div className={`${mainClass}__contribution`}></div>

          <footer className={`${mainClass}__footer`}>
            <div className="top">
              <Button text="Agree" variant="btn-success" />
              <Button text="Disagree" variant="btn-danger" />
              <Button text="Pass" variant="btn-outline-primary" />
            </div>
            <div className="bot">
              <div className="add">
                <TiPlus onClick={this.handleRegister} />
              </div>
            </div>
          </footer>
        </div>
      </Fragment>
    );
  }
}

export default Contribute;
