import React, { Component, Fragment } from "react";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import homeActions from "pages/index/action";

import userAuth from "utils/userAuth";
import authSession from "utils/authSession";

import AccountNav from "components/Nav/Account/index";
import PanelMinister from "components/Panel/Minister";

import AccountHead from "pages/account/AccountHead";

import "./style.scss";

class Constituency extends Component {
  constructor(props) {
    super(props);
    this.state = {
      state: "",
      area: ""
    };
  }

  componentDidMount() {
    const { homeAction, home } = this.props;
    const session = new authSession();
    const user = session.getProfile();

    let len = home.pms.length;
    if (!len) homeAction.prefetchHomeData();

    this.setState({
      state: user.state,
      pincode: user.pincode,
      area: user.constituency
    });
  }

  renderCurrent = () => {
    const { home } = this.props;
    let ministerArr = home.currentCandidates;

    return ministerArr.map(minister => {
      return <PanelMinister key={minister.id} data={minister} />;
    });
  };
  renderMLA = () => {
    const { home } = this.props;
    let ministerArr = home.mlas;

    return ministerArr.map(minister => {
      if (minister.winner == true)
        return <PanelMinister key={minister.id} data={minister} />;
    });
  };
  renderMP = () => {
    const { home } = this.props;
    let ministerArr = home.mps;

    return ministerArr.map(minister => {
      if (minister.winner == true)
        return <PanelMinister key={minister.id} data={minister} />;
    });
  };
  renderCM = () => {
    const { home } = this.props;
    let ministerArr = home.cms;

    return ministerArr.map(minister => {
      if (minister.winner == true)
        return <PanelMinister key={minister.id} data={minister} />;
    });
  };
  renderPM = () => {
    const { home } = this.props;
    let ministerArr = home.pms;

    return ministerArr.map(minister => {
      if (minister.winner == true)
        return <PanelMinister key={minister.id} data={minister} />;
    });
  };

  render() {
    const { area, state } = this.state;
    return (
      <Fragment>
        <div className="container constituency">
          <div className="row">
            <div className="col-lg-3 d-none d-lg-block pt-5">
              <AccountNav />
            </div>
            <div className="col-lg-9">
              <AccountHead />

              <h1 className="title">
                <span className="highlight">
                  2020, Your constituency MLA candidates,
                </span>{" "}
                {area} - {state}
              </h1>
              <div className="constituency__ministers">
                {this.renderCurrent()}
              </div>

              <h1 className="title">
                <span>Current position holder,</span> {area} - {state}
              </h1>
              <div className="constituency__ministers">
                {this.renderMLA()}
                {this.renderMP()}
                {this.renderCM()}
                {this.renderPM()}
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
export default connect(
  state => state,
  mapDispatchToProps
)(userAuth(Constituency));
