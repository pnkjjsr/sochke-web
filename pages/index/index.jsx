import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import userAuth from "utils/userAuth";

import CandidateList from "components/List/CandidateList";
import CandidateWinner from "components/Panel/CandidateWinner";
import Poll from "components/Panel/Poll";
import RespondBox from "components/Respond/RespondBox";
import RespondList from "components/Respond/RespondList";

import "./style.scss";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Fragment>
        <div className="home">
          <div className="container">
            <div className="row">
              <div className="col-lg-2 col-xl-2 d-none d-xl-block">
                <CandidateList type="councillor" />
                <CandidateList type="mla" />
                <CandidateList type="mp" />
                <CandidateList type="cm" />
                <CandidateList type="pm" />
              </div>
              <div className="col-lg-9 col-xl-7">
                <RespondBox />
                <RespondList />
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
        </div>

        <style jsx>{``}</style>
      </Fragment>
    );
  }
}

export default connect(state => state)(userAuth(Home));
