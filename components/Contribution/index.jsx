import React, { Component, Fragment } from "react";

import { service } from "apiConnect";
import authSession from "utils/authSession";

import PageLoader from "components/Loader/page";
import Button from "components/Form/Button";

import WriteContribution from "./WriteContribution";
import ViewContribution from "./ViewContribution";
import "./style.scss";

export default class Contribution extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: "loading", //loading, empty, write-contribution, view-contribution
      contributions: [],
      contributionVoted: []
    };
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

  handlePreviewView = e => {
    this.setState({
      view: "view-contribution",
      contributions: [e]
    });
  };

  handleAllDone = () => {
    this.setState({
      view: "all-done"
    });
  };

  renderEmpty = () => {
    return (
      <Fragment>
        <div className="contribution active">
          <div className="empty">
            <i className="material-icons">group_work</i>
            <h1 className="title">
              Write first "contribution" for your area progress.
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
        <div className="contribution active">
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
    const { contributions, contributionVoted } = this.state;
    let filterContribution = [];

    contributions.map(contribute => {
      let isArrContain = contributionVoted.includes(contribute.id);
      if (!isArrContain) {
        filterContribution.push(contribute);
      }

      if (filterContribution.length == 0) {
        this.setState({
          view: "all-done"
        });
      }
    });
    return (
      <ViewContribution
        data={filterContribution}
        actionWriteView={this.handleWriteView}
        actionAllDone={this.handleAllDone}
      />
    );
  };

  componentDidMount() {
    const session = new authSession();
    const profile = session.getProfile();
    const data = {
      uid: profile.uid,
      constituency: profile.area,
      district: profile.district
    };
    service
      .post("/contribution", data)
      .then(res => {
        if (res.data.code == "contribution/empty") {
          return this.setState({
            view: "empty"
          });
        }

        this.setState({
          view: "view-contribution",
          contributions: res.data.contributions,
          contributionVoted: res.data.contributionVoted
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    const { view } = this.state;
    switch (view) {
      case "loading":
        return <PageLoader />;
      case "empty":
        return this.renderEmpty();
      case "all-done":
        return this.renderAllDone();
      case "write-contribution":
        return <WriteContribution actionPreviewView={this.handlePreviewView} />;
      case "view-contribution":
        return this.renderPreview();
      default:
        return <PageLoader />;
    }
  }
}
