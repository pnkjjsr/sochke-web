import React, { Component, Fragment } from "react";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
// import accountActions from "./actions";

import userAuth from "utils/userAuth";

import CandidateList from "components/List/CandidateList";
import PanelChoice from "components/Panel/Choice";
import RespondBox from "components/Respond/RespondBox";
import RespondList from "components/Respond/RespondList";

import "./style.scss";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <Fragment>
        <div className="home">
          <div className="container">
            <div className="row">
              <div className="col-lg-2 col-xl-2 d-none d-xl-block">
                <CandidateList />

                <CandidateList />
              </div>
              <div className="col-lg-9 col-xl-7">
                <RespondBox />

                <RespondList />
              </div>
              <div className="col-lg-3 col-xl-3 d-none d-lg-block">
                <PanelChoice />
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
  // accountAction: bindActionCreators(accountActions, dispatch)
});

export default connect(state => state, mapDispatchToProps)(userAuth(Home));
