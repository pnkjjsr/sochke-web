import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import homeActions from "pages/index/action";

import { service } from "apiConnect";
import authSession from "utils/authSession";

import PageLoader from "components/Loader/page";

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

  componentDidUpdate(prevProps, prevState) {
    const { ministers } = this.state;
    const oldMinisters = prevState.ministers;

    if (ministers != oldMinisters) {
      ministers.map(minister => {
        if (minister.winner == true) {
          this.setState(
            {
              ministerWinner: minister
            },
            () => this.checkVoted()
          );
        }
      });
    }
  }

  checkVoted = () => {
    const { ministerWinner } = this.state;
    const session = new authSession();
    const token = session.getToken();
    if (ministerWinner.id) {
      const data = {
        uid: token,
        mid: ministerWinner.id
      };
      service
        .post("/minister-voted", data)
        .then(res => {
          if (res.data.code == "vote/voted") {
            this.setState({
              dVote: "d-none",
              dResult: ""
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  handleGood = ministerId => {
    const session = new authSession();
    const token = session.getToken();
    const data = {
      uid: token,
      mid: ministerId,
      vote: true
    };

    this.setState({
      dVote: "d-none",
      dCirculate: "",
      vote: true
    });

    service
      .post("/minister-vote", data)
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  handleBad = ministerId => {
    const { ministerWinner } = this.state;
    const session = new authSession();
    const token = session.getToken();
    const data = {
      uid: token,
      mid: ministerId,
      vote: false
    };

    this.setState({
      dVote: "d-none",
      dOption: ""
    });

    service
      .post("/minister-vote", data)
      .then(res => {
        console.log(res.data);
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
          {ministerWinner.id ? (
            <VoteMinister
              minister={ministerWinner}
              actionGood={e => this.handleGood(e)}
              actionBad={e => this.handleBad(e)}
            />
          ) : (
            <PageLoader />
          )}
        </div>

        <div className={`candidate-winner ${dCirculate}`}>
          <AlertRespond
            ministerDetails={ministerWinner}
            actionCirculate={this.handleCirculate}
            actionCancel={this.handleCirculate}
          />
        </div>

        <div className={`candidate-winner ${dResult}`}>
          {ministerWinner.id ? (
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

const mapDispatchToProps = dispatch => ({
  homeAction: bindActionCreators(homeActions, dispatch)
});

export default connect(state => state, mapDispatchToProps)(CandidateWinner);
