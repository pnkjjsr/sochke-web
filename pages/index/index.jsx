import React, { Component, Fragment } from "react";
import Router from "next/router";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import homeActions from "./action";

import userAuth from "utils/userAuth";
import authSession from "utils/authSession";

import CandidateList from "components/List/CandidateList";
import CandidateWinner from "components/Panel/CandidateWinner";
import CurrentElection from "components/Panel/CurrentElection";
import Poll from "components/Panel/Poll";
import Respond from "components/Respond";
import LoaderRespond from "components/Respond/LoaderRespond";
import RespondBox from "components/Respond/RespondBox";

import "./style.scss";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      respondView: 0,
      profile: "",
      data: {},
      polls: []
    };
  }

  static getDerivedStateFromProps(props, state) {
    let data = props.home;
    let len = data.pms.length;

    if (len) {
      return {
        data: data,
        polls: data.polls,
        respondView: 1
      };
    } else {
      return null;
    }
  }

  componentDidMount() {
    const { homeAction, home } = this.props;
    const session = new authSession();
    const profile = session.getProfile();
    this.setState({
      profile: profile
    });

    homeAction.prefetchHomeData();
  }

  handleContribute = () => {
    Router.push("/contribution");
  };

  loopRespond = () => {
    const { data } = this.state;

    let respondArr = data.responds;
    let respondVoteArr = data.respondVoted;
    let respondFilter = [];

    respondArr.map(respond => {
      let isArrContain = respondVoteArr.includes(respond.id);
      if (isArrContain) {
        respond.vote = true;
      }
      respondFilter.push(respond);
    });

    return respondFilter.map(respond => {
      return <Respond key={respond.id} respond={respond} />;
    });
  };

  renderPromoted = () => {
    const { data } = this.state;

    return data.respondPromoted.map(respond => {
      return <Respond key={respond.id} respond={respond} />;
    });
  };

  render() {
    const { data, profile, respondView } = this.state;

    return (
      <Fragment>
        <div className="home">
          <div className="container">
            <div className="row">
              <div className="col-lg-2 col-xl-2 d-none d-xl-block">
                {/* <CandidateList type="councillor" data={data.councillors} /> */}
                <CurrentElection>
                  <CandidateList
                    type="mla"
                    title="2020, your MLA candidate"
                    data={data.currentCandidates}
                  />
                </CurrentElection>

                <CandidateList type="mla" title="MLA" data={data.mlas} />
                <CandidateList type="mp" title="MP" data={data.mps} />
                <CandidateList type="cm" title="CM" data={data.cms} />
                <CandidateList type="pm" title="PM" data={data.pms} />
              </div>
              <div className="col-lg-9 col-xl-7">
                <RespondBox />
                {!respondView ? <LoaderRespond /> : this.loopRespond()}

                <div>
                  <small>Promoted</small>
                </div>
                {!respondView ? <LoaderRespond /> : this.renderPromoted()}
              </div>
              <div className="col-lg-3 col-xl-3 d-none d-lg-block">
                <div className="panel contribute">
                  <span>
                    Your count: <b>{data.contributionCount}</b>
                  </span>
                  <button
                    className="btn btn-primary"
                    onClick={this.handleContribute}
                  >
                    Contribute
                  </button>
                </div>

                <div className="panel">
                  <h2 className="title">Your current MLA</h2>
                  <div className="panel-container">
                    <CandidateWinner type="mla" data={data.mlas} />
                  </div>
                </div>

                <div className="panel">
                  <h2 className="title">{profile.state} want change for?</h2>
                  <div className="panel-container">
                    <Poll type="state" />
                  </div>
                </div>

                <div className="panel">
                  <h2 className="title">{profile.area}, has?</h2>
                  <div className="panel-container">
                    <Poll type="area" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <style jsx>{``}</style>
      </Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  homeAction: bindActionCreators(homeActions, dispatch)
});

export default connect(state => state, mapDispatchToProps)(userAuth(Home));
