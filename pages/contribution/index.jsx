import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import contributionActions from "./action";

import PageLoader from "components/Loader/page";
import ContributionComponent from "components/Contribution";

import "./style.scss";

class Contribution extends Component {
  constructor(props) {
    super(props);

    this.state = {
      view: 0,
      data: []
    };
  }

  static getDerivedStateFromProps(props, state) {
    let len = props.contribution.contributions.length;

    if (len)
      return {
        view: 1,
        data: props.contribution.contributions
      };

    return null;
  }

  componentDidMount() {
    const { contributionAction } = this.props;
    // contributionAction.prefetchContributionData();
  }

  render() {
    const main = "contribution";
    const { view } = this.state;

    return (
      <Fragment>
        <div className={main}>
          <div className="container">
            {/* {view ? <ContributionComponent /> : <PageLoader />} */}
            <ContributionComponent />
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  contributionAction: bindActionCreators(contributionActions, dispatch)
});

export default connect(state => state, mapDispatchToProps)(Contribution);
