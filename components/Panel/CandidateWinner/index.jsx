import React, { Component, Fragment } from "react";

import { service } from "apiConnect";
import authSession from "utils/authSession";

import VoteMinister from "./VoteMinister";
import AlertRespond from "./AlertRespond";
import OptionMinister from "./OptionMinister";
import ResultMinister from "./ResultMinister";

import "./style.scss";

export class CandidateWinner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vote: "",
      type: props.type,
      ministers: {},
      ministerWinner: {},
      dVote: "",
      dCirculate: "d-none",
      dResult: "d-none",
      dOption: "d-none"
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.data) {
      return {
        ministers: props.data
      };
    } else return null;
  }

  handleGood = () => {
    const { ministerWinner } = this.state;
    const session = new authSession();
    const token = session.getToken();
    const data = {
      uid: token,
      mid: ministerWinner.uid,
      vote: true
    };

    service
      .post("/minister-vote", data)
      .then(res => {
        this.setState({
          dVote: "d-none",
          dCirculate: "",
          vote: true
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  handleBad = () => {
    const { ministerWinner } = this.state;
    const session = new authSession();
    const token = session.getToken();
    const data = {
      uid: token,
      mid: ministerWinner.uid,
      vote: false
    };

    service
      .post("/minister-vote", data)
      .then(res => {
        this.setState({
          dVote: "d-none",
          dOption: ""
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  handleCirculate = () => {
    this.setState({
      dCirculate: "d-none",
      dResult: ""
    });
  };

  handleCirculateCancel = () => {
    this.setState({
      dCirculate: "d-none",
      dResult: ""
    });
  };

  handleChoose = () => {
    this.setState({
      dResult: "",
      dOption: "d-none"
    });
  };

  handleChoseCancel = () => {
    this.setState({
      dResult: "",
      dOption: "d-none"
    });
  };

  render() {
    const {
      dVote,
      dCirculate,
      dResult,
      dOption,
      ministers,
      ministerWinner
    } = this.state;

    return (
      <Fragment>
        <div className={`candidate-winner ${dVote}`}>
          <VoteMinister
            ministerDetails={ministers}
            actionGood={this.handleGood}
            actionBad={this.handleBad}
          />
        </div>

        <div className={`candidate-winner ${dCirculate}`}>
          <AlertRespond
            ministerDetails={ministerWinner}
            actionCirculate={this.handleCirculate}
            actionCancel={this.handleCirculate}
          />
        </div>

        <div className={`candidate-winner ${dResult}`}>
          {ministerWinner.uid ? (
            <ResultMinister ministerDetails={ministerWinner} />
          ) : (
            ""
          )}
        </div>

        <div className={`candidate-winner ${dOption}`}>
          <OptionMinister
            ministers={ministers}
            actionResult={this.handleChoose}
            actionCancel={this.handleChoseCancel}
          />
        </div>
      </Fragment>
    );
  }
}

export default CandidateWinner;
