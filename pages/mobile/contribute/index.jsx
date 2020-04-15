import React, { Component, Fragment } from "react";
import { FaInfoCircle } from "react-icons/fa";
import Link from "next/link";
import Router from "next/router";
import publicIp from "public-ip";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import registerActions from "pages/register/action";
import layoutActions from "components/Layout/actions";

import { service } from "apiConnect";
import Photo from "components/Photo";
import Button from "components/Form/Button";
import PageLoader from "components/Loader/page";

import "./style.scss";

const randomData = {
  0: {
    name: "Pankaj Jasoria",
    imgUrl: "/static/dummy/26.jpg",
  },
  1: {
    name: "Pawan",
    imgUrl: "/static/dummy/58.jpg",
  },
  2: {
    name: "Rahul Kumar",
    imgUrl: "/static/dummy/65.jpg",
  },
  3: {
    name: "Neha Tyagi",
    imgUrl: "/static/dummy/15.jpg",
  },
  4: {
    name: "Vinod Sharma",
    imgUrl: "/static/dummy/69.jpg",
  },
  5: {
    name: "Rakesh Jha",
    imgUrl: "/static/dummy/77.jpg",
  },
};
let len = Object.keys(randomData).length;
let getRandom = Math.floor(Math.random() * len);
let userName = randomData[getRandom].name;
let userImg = randomData[getRandom].imgUrl;

class Contribute extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contributeActive: 0,
      data: [],
      userIP: "",
      classDesc: "",
      notificationDisplay: "d-none",
    };
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

    (async () => {
      let userIP = await publicIp.v4();
      this.setState({
        userIP: userIP,
      });
    })();

    let getTry = sessionStorage.getItem("contributionTry");
    if (getTry == "done") {
      this.setState({
        contributeActive: 3,
      });
    }
    if (getTry == "all-done") {
      Router.push("/mobile/completed");
    }

    service
      .get("/page-contributionPublic")
      .then((res) => {
        this.setState({
          data: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleRegister = () => {
    Router.push("/mobile/register");
  };

  handleVote = (id, vote) => {
    const { data, userIP, contributeActive } = this.state;

    this.setState({
      notificationDisplay: "active",
    });

    let cpData = {
      createdAt: new Date().toISOString(),
      userIP: userIP,
      cpid: id,
      vote: vote,
    };
    service
      .post("/contributionPublic-vote", cpData)
      .then((res) => {
        if (res.data.code == "vote/added") {
          this.setState(
            {
              contributeActive: contributeActive + 1,
              notificationDisplay: "d-none",
            },
            () => {
              let len = data.length;
              if (len == this.state.contributeActive) {
                sessionStorage.setItem("contributionTry", "all-done");
                Router.push("/mobile/completed");
              }

              if (contributeActive == 2) {
                Router.push("/mobile/register");
                sessionStorage.setItem("contributionTry", "done");
                return true;
              }
            }
          );
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleDescShow = () => {
    this.setState({
      classDesc: "active",
    });
  };

  handleDescHide = () => {
    this.setState({
      classDesc: "",
    });
  };

  // renderRandomUser = () => {
  //   let len = Object.keys(randomData).length;
  //   let getRandom = Math.floor(Math.random() * len);
  //   this.setState({
  //     userName: randomData[getRandom].name,
  //     userImg: randomData[getRandom].imgUrl,
  //   });
  // };

  renderContribute = () => {
    const { data, contributeActive, classDesc } = this.state;
    const mainClass = "mobile_contribute";

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

            <div className={`desc ${classDesc}`}>
              <div className="hide" onClick={this.handleDescHide}>
                <span className="material-icons">cancel</span>
              </div>

              {contribute.description}
            </div>

            <div className="bot">
              <FaInfoCircle className="info" onClick={this.handleDescShow} />

              <div className="detail">
                <Photo className="photo" src={userImg} />
                <div>
                  <h4 className="title">{userName}</h4>
                  <p>{contribute.title}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="action">
            <Button
              text="Agree"
              variant="btn-success"
              action={(e) => this.handleVote(contribute.id, "agree")}
            />
            <Button
              text="Disagree"
              variant="btn-danger"
              action={(e) => this.handleVote(contribute.id, "disagree")}
            />
            <Button
              text="Pass"
              variant="btn-outline-primary"
              action={(e) => this.handleVote(contribute.id, "pass")}
            />
          </div>
        </div>
      );
    });
  };

  render() {
    const mainClass = "mobile_contribute";
    const { notificationDisplay } = this.state;

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

          <div className={`${mainClass}__notification ${notificationDisplay}`}>
            {/* <i className="close">
              <span className="material-icons">cancel</span>
            </i> */}

            <p>
              <b>Your opinion is saved.</b>
              <br />
              Every vote makes a difference in our society as Unity.
              <PageLoader />
            </p>
          </div>

          {this.renderContribute()}

          <footer className={`${mainClass}__footer`}>
            <div className="bot">
              <label>
                <small>Add Your</small>
                <br /> Contribution
              </label>
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

const mapDispatchToProps = (dispatch) => ({
  registerAction: bindActionCreators(registerActions, dispatch),
  layoutAction: bindActionCreators(layoutActions, dispatch),
});

export default connect((state) => state, mapDispatchToProps)(Contribute);
