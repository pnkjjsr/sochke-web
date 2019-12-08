import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import { service } from "apiConnect";
import authSession from "utils/authSession";

import AlertRespond from "./AlertRespond";
import OptionMinister from "./OptionMinister";
import ResultMinister from "./ResultMinister";

import Button from "components/Form/Button";

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

  componentDidMount() {
    const { type } = this.state;

    const session = new authSession();
    let profile = session.getProfile();
    let data = {
      pincode: profile.pincode,
      district: profile.district
    };

    let getMinister = `/${type}`;
    service
      .post(getMinister, data)
      .then(res => {
        let data = res.data;
        this.setState({
          ministers: data
        });
        data.map(minister => {
          if (minister.winner == true) {
            this.setState(
              {
                ministerWinner: minister
              },
              () => {
                const session = new authSession();
                let token = session.getToken();
                const vData = {
                  uid: token,
                  mid: minister.uid
                };
                service
                  .post("/minister-voted", vData)
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
            );
          }
        });
      })
      .catch(err => {
        console.log(err);
      });
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
      type,
      vote,
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
          <div className="photo">
            <figure>
              <i className="material-icons">account_circle</i>
              {/* <img src={ministerWinner.photoUrl} alt="" /> */}
            </figure>
            <figcaption>Defending Minister</figcaption>
          </div>

          <div className="party">
            <i className="material-icons">flag</i>
            <label htmlFor="party">{ministerWinner.party}</label>
          </div>

          <div className="name">{ministerWinner.name}</div>

          <div className="tenure">Last 5 Year?</div>

          <div className="action">
            <Button
              text="Good"
              variant="btn-success"
              action={this.handleGood}
            />
            <Button text="Bad" variant="btn-danger" action={this.handleBad} />
          </div>
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

export default connect(state => state)(CandidateWinner);
