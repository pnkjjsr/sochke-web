import React, { Component, Fragment } from "react";
import Router from "next/router";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import homeActions from "pages/index/action";

import userAuth from "utils/userAuth";

import Loader from "components/Loader/page";
import RespondItem from "components/Respond";
import OpinionList from "components/Opinion/OpinionList";
import CandidateList from "components/List/CandidateList";
import CandidateWinner from "components/Panel/CandidateWinner";
import Poll from "components/Panel/Poll";

import "./style.scss";

class Respond extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 0,
      data: props.home
    };
  }

  static getDerivedStateFromProps(props, state) {
    let data = props.home;
    let respond = Router.query;

    let len = Object.keys(data).length;

    if (!respond.id) {
      Router.push("/");
      return null;
    }

    if (len) {
      return {
        view: 1,
        data: data
      };
    } else {
      return null;
    }
  }

  componentDidMount() {
    const { homeAction, home } = this.props;
    // homeAction.prefetchHomeData();
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
    const { data } = this.state;

    return (
      <Fragment>
        <div className="container respond">
          <div className="row">
            <div className="col-lg-2 col-xl-2 d-none d-xl-block">
              <CandidateList type="mla" data={data.mlas} />
              <CandidateList type="mp" data={data.mps} />
              <CandidateList type="cm" data={data.cms} />
              <CandidateList type="pm" data={data.pms} />
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
              {/* <div className="panel">
                <h2 className="title">Your Counstituency</h2>
                <div className="panel-container">
                  <CandidateWinner type="mla" data={data.mlas} />
                </div>
              </div> */}

              <div className="panel">
                <h2 className="title">Delhi want change for?</h2>
                <div className="panel-container">
                  <Poll type="state" data={data.polls} />
                </div>
              </div>

              <div className="panel">
                <h2 className="title">Hari Nagar, has?</h2>
                <div className="panel-container">
                  <Poll type="area" data={data.polls} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  homeAction: bindActionCreators(homeActions, dispatch)
});

export default connect(state => state, mapDispatchToProps)(userAuth(Respond));
