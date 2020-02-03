import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import authSession from "utils/authSession";
import homeActions from "pages/index/action";

import CurrentElection from "components/Panel/CurrentElection";
import PanelMinister from "components/Panel/Minister";

import "./style.scss";

class ConstituencyComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      state: "",
      area: "",
      home: props.data
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

  renderView = () => {
    const classMain = "constituency_components";
    const { area, state } = this.state;
    return (
      <Fragment>
        <div className={classMain}>
          <CurrentElection>
            <h2 className={`${classMain}__title`}>
              <span>2020, Your constituency MLA candidates,</span>
              <br />
              {area} - {state}
            </h2>
            <div>{this.renderCurrent()}</div>
          </CurrentElection>

          <h2 className={`${classMain}__title mt-5`}>
            <span>Current position holder,</span> {area} - {state}
          </h2>
          <div>
            {this.renderMLA()}
            {this.renderMP()}
            {this.renderCM()}
            {this.renderPM()}
          </div>
        </div>
      </Fragment>
    );
  };

  render() {
    return this.renderView();
  }
}

const mapDispatchToProps = dispatch => ({
  homeAction: bindActionCreators(homeActions, dispatch)
});

export default connect(
  state => state,
  mapDispatchToProps
)(ConstituencyComponent);
