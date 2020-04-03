import React, { Component, Fragment } from "react";
import { FaInfoCircle } from "react-icons/fa";
import Router from "next/router";
import publicIp from "public-ip";

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
      data: [],
      userIP: ""
    };
  }

  static async getInitialProps({ req, res }) {
    return true;
  }

  componentDidMount() {
    if (screen.width >= 768) Router.push("/");

    (async () => {
      let userIP = await publicIp.v4();
      this.setState({
        userIP: userIP
      });
    })();

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

  handleVote = (id, vote) => {
    const { userIP, contributeActive } = this.state;
    let data = {
      createdAt: new Date().toISOString(),
      userIP: userIP,
      cpid: id,
      vote: vote
    };

    service
      .post("/contributionPublic-vote", data)
      .then(res => {
        if (res.data.code == "vote/added") {
          this.setState({
            contributeActive: contributeActive + 1
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

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
              action={e => this.handleVote(contribute.id, "agree")}
            />
            <Button
              text="Disagree"
              variant="btn-danger"
              action={e => this.handleVote(contribute.id, "disagree")}
            />
            <Button
              text="Pass"
              variant="btn-outline-primary"
              action={e => this.handleVote(contribute.id, "pass")}
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
