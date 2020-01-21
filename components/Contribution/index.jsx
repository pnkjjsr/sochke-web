import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import contributionActions from "pages/contribution/action";

import PageLoader from "components/Loader/page";
import Button from "components/Form/Button";

import WriteContribution from "./WriteContribution";
import ViewContribution from "./ViewContribution";
import "./style.scss";

class Contribution extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: "loading", //loading, empty, write-contribution, view-contribution
      contributions: []
    };
  }

  static getDerivedStateFromProps(props, state) {
    const { contributions } = props.contribution;
    let len = contributions.length;

    if (len) return { contributions: contributions };

    return null;
  }

  componentDidMount() {
    const { contributionAction } = this.props;
    contributionAction.prefetchContributionData();
  }
  componentDidUpdate(prevProps, prevState) {
    const { contributions } = prevProps.contribution;
    const { contribution } = this.props;

    if (contributions != contribution.contributions) {
      if (!contribution.contributions.length) {
        return this.setState({
          view: "empty"
        });
      }
      this.setState({
        view: "view-contribution"
      });
    }
  }

  handleContribution = () => {
    this.setState({
      view: "write-contribution"
    });
  };

  handleWriteView = () => {
    this.setState({
      view: "write-contribution"
    });
  };

  handlePreview = e => {
    const { contributionAction } = this.props;
    return contributionAction.prefetchContributionData();
  };

  handleAllDone = () => {
    this.setState({
      view: "all-done"
    });
  };

  renderEmpty = () => {
    return (
      <Fragment>
        <div className="contribution_component active">
          <div className="empty">
            <i className="material-icons">group_work</i>
            <h1 className="title">
              Write "contribution" for your area progress.
              <small>
                "Contribution" is the way to collect right issue/problem/work in
                your area. All the member of your area can see this
                'Contriubtion' agree or disagree for the same. Highest the vote,
                highest the value of your 'Contribution'.
              </small>
            </h1>

            <Button
              text="Write first 'Contribution'"
              variant="btn-link"
              action={this.handleContribution}
            />
          </div>
        </div>
      </Fragment>
    );
  };

  renderAllDone = () => {
    return (
      <Fragment>
        <div className="contribution_component active">
          <div className="empty">
            <i className="material-icons">group_work</i>
            <h1 className="title">
              You vote all the contribution in your area.
              <small>
                "Contribution" is the way to collect right issue/problem/work in
                your area. All the member of your area can see this
                'Contriubtion' agree or disagree for the same. Highest the vote,
                highest the value of your 'Contribution'.
              </small>
            </h1>

            <Button
              text="Write 'Contribution'"
              variant="btn-link"
              action={this.handleContribution}
            />
          </div>
        </div>
      </Fragment>
    );
  };

  renderPreview = () => {
    const { contributions } = this.state;

    return (
      <ViewContribution
        data={contributions}
        actionWriteView={this.handleWriteView}
        actionAllDone={this.handleAllDone}
      />
    );
  };

  render() {
    const { view } = this.state;
    console.log(view);

    switch (view) {
      case "loading":
        return <PageLoader />;
      case "empty":
        return this.renderEmpty();
      case "all-done":
        return this.renderAllDone();
      case "write-contribution":
        return <WriteContribution actionPreview={this.handlePreview} />;
      case "view-contribution":
        return this.renderPreview();
      default:
        return <PageLoader />;
    }
  }
}

const mapDispatchToProps = dispatch => ({
  contributionAction: bindActionCreators(contributionActions, dispatch)
});

export default connect(state => state, mapDispatchToProps)(Contribution);
