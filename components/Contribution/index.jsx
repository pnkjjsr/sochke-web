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
      contributions: {}
    };
  }

  handleContribution = () => {
    this.setState({
      view: "write-contribution"
    });
  };

  renderEmpty = () => {
    return (
      <Fragment>
        <div className="contribution">
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
        if (res.code == "contribution/empty") {
          this.setState({
            view: "empty"
          });
        }

        this.setState({
          view: "view-contribution",
          contributions: res.data.contributions
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    const { view, contributions } = this.state;
    if (view == "loading") {
      return <PageLoader />;
    } else if (view == "empty") {
      return this.renderEmpty();
    } else if (view == "write-contribution") {
      return <WriteContribution />;
    } else if (view == "view-contribution") {
      return <ViewContribution data={contributions} />;
    }
  }
}
