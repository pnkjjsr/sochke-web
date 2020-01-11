import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import { service } from "apiConnect";
import authSession from "utils/authSession";

import "./style.scss";

export class ResultMinister extends Component {
  constructor(props) {
    super(props);
    this.state = {
      minister: {},
      area: "",
      happy: 0,
      sad: 0
    };
  }

  componentDidMount() {
    const { ministerDetails } = this.props;

    const session = new authSession();
    const profile = session.getProfile();
    const area = profile.area;

    let voteTotal =
      ministerDetails.voteTrueCount + ministerDetails.voteFalseCount;
    let voteTrue = ministerDetails.voteTrueCount;

    let good = (voteTrue * 100) / voteTotal;
    let bad = 100 - good;

    this.setState({
      happy: good.toFixed(1),
      sad: bad.toFixed(1),
      area: area
    });
  }

  render() {
    const { area, happy, sad } = this.state;
    const { ministerDetails } = this.props;

    return (
      <Fragment>
        <div className="result">
          <div className="top">
            <figure>
              <i className="material-icons">account_circle</i>
            </figure>

            <div className="details">
              {ministerDetails.name}
              <span>
                <i className="material-icons">flag</i>
                {ministerDetails.party}
              </span>
            </div>
          </div>

          <div className="bottom">
            <small>{area}, Voice</small>
            <br />
            <b className="success">{happy}%,</b> people found him amazing.
            <br />
            <b className="error">{sad}%,</b> people not found him good.
          </div>
        </div>
      </Fragment>
    );
  }
}

export default connect(state => state)(ResultMinister);
