import React, { Component, Fragment } from "react";
import { FaInfoCircle } from "react-icons/fa";
import Router from "next/router";

import { service } from "apiConnect";
import Link from "next/link";
import Photo from "components/Photo";
import Button from "components/Form/Button";

import "./style.scss";

class Contribute extends Component {
  constructor(props) {
    super(props);

    this.state = {
      contributeActive: 0,
      data: []
    };
  }

  componentDidMount() {
    if (screen.width >= 768) Router.push("/");

    service
      .get("/page-contributionPublic")
      .then(res => {
        this.setState({
          data: res.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  handleRegister = () => {
    Router.push("/mobile/register");
  };

  handleVote = e => {};

  renderContribute = () => {
    const { data, contributeActive } = this.state;
    const mainClass = "contribute";
    let len = data.length;
    return data.map((contribute, key) => {
      let classActive = "";
      if (contributeActive == key) classActive = "active";
      return (
        <div
          key={contribute.id}
          className={`${mainClass}__contribution ${classActive}`}
        >
          <div className={`item`}>
            <figure className="image">
              <img src={contribute.imgUrl} alt="" />
            </figure>

            <div className="bot">
              <FaInfoCircle className="info" />

              <div className="detail">
                <Photo className="photo" />
                <div>
                  <h4 className="title">Pankaj jasoria</h4>
                  <p>{contribute.title}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="action">
            <Button
              text="Agree"
              variant="btn-success"
              action={this.handleVote("true")}
            />
            <Button
              text="Disagree"
              variant="btn-danger"
              action={this.handleVote("false")}
            />
            <Button
              text="Pass"
              variant="btn-outline-primary"
              action={this.handleVote("pass")}
            />
          </div>
        </div>
      );
    });
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

          {this.renderContribute()}

          <footer className={`${mainClass}__footer`}>
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
