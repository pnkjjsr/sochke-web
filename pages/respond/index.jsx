import React, { Component, Fragment } from "react";
import Router from "next/router";
import { connect } from "react-redux";

import userAuth from "utils/userAuth";

import Loader from "components/Loader/page";
import RespondItem from "components/Respond/RespondItem";
import OpinionList from "components/Opinion/OpinionList";
import CandidateList from "components/List/CandidateList";
import CandidateWinner from "components/Panel/CandidateWinner";
import Poll from "components/Panel/Poll";

import "./style.scss";

class Respond extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 0
    };
  }

  static getDerivedStateFromProps(props, state) {
    let respond = Router.query;
    if (!respond.id) {
      Router.push("/");
      return null;
    }

    return {
      view: 1
    };
  }

  handleBack = () => {
    Router.push("/");
  };

  renderLoading = () => {
    const { view } = this.state;

    if (view == 0) {
      return <Loader />;
    } else {
      return this.renderRespond();
    }
  };

  renderRespond = () => {
    const respond = Router.query;

    return (
      <Fragment>
        <RespondItem respond={respond} />
        <OpinionList respond={respond} />
      </Fragment>
    );
  };

  render() {
    return (
      <Fragment>
        <div className="container respond">
          <div className="row">
            <div className="col-lg-2 col-xl-2 d-none d-xl-block">
              <CandidateList type="councillor" />
              <CandidateList type="mla" />
              <CandidateList type="mp" />
              <CandidateList type="cm" />
              <CandidateList type="pm" />
            </div>
            <div className="col-lg-9 col-xl-7">
              <div className="center">
                <div className="back">
                  <button className="btn btn-link" onClick={this.handleBack}>
                    <i className="material-icons">keyboard_backspace</i>
                  </button>
                </div>
                {this.renderLoading()}
              </div>
            </div>
            <div className="col-lg-3 col-xl-3 d-none d-lg-block">
              <div className="panel">
                <h2 className="title">Your Counstituency</h2>
                <div className="panel-container">
                  <CandidateWinner type="mla" />
                </div>
              </div>

              <div className="panel">
                <h2 className="title">Delhi want change for?</h2>
                <div className="panel-container">
                  <Poll type="state" />
                </div>
              </div>

              <div className="panel">
                <h2 className="title">Hari Nagar, has?</h2>
                <div className="panel-container">
                  <Poll type="area" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(userAuth(Respond));
