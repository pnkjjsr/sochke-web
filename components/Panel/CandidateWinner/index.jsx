import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import { service } from "apiConnect";
import authSession from "utils/authSession";

import Button from "components/Form/Button";

import "./style.scss";

export class CandidateWinner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: props.type,
      ministers: {},
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
    let apitHit = `/${type}`;
    service
      .post(apitHit, data)
      .then(res => {
        let data = res.data;
        data.map(minister => {
          if (minister.winner == true) {
            this.setState({
              ministers: minister
            });
          }
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  handleGood = () => {
    const { ministers } = this.state;
    const session = new authSession();
    const token = session.getToken();
    const data = {
      uid: token,
      mid: ministers.uid,
      vote: true
    };

    service
      .post("/minister-vote", data)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });

    this.setState({
      dVote: "d-none",
      dCirculate: ""
    });
  };
  handleBad = () => {
    this.setState({
      dVote: "d-none",
      dOption: ""
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
  handleChoose = e => {
    e.preventDefault();
    this.setState({
      dCirculate: "",
      dOption: "d-none"
    });
  };

  render() {
    const { dVote, dCirculate, dResult, dOption, ministers } = this.state;

    return (
      <Fragment>
        <div className={`candidate-winner ${dVote}`}>
          <div className="photo">
            <figure>
              <i className="material-icons">account_circle</i>
              {/* <img src={ministers.photoUrl} alt="" /> */}
            </figure>
            <figcaption>Defending Minister</figcaption>
          </div>

          <div className="party">
            <i className="material-icons">flag</i>
            <label htmlFor="party">{ministers.party}</label>
          </div>

          <div className="name">{ministers.name}</div>

          <div className="tenure">Last 5 Year</div>

          <div className="action">
            <Button
              text="Good"
              variant="btn-success"
              action={this.handleGood}
            />
            <Button text="Bad" variant="btn-danger" action={this.handleBad} />
          </div>
        </div>

        {/* Action Penal */}
        <div className={`candidate-winner ${dCirculate}`}>
          <p>Circulate, on my page</p>
          <div className="action">
            <Button
              text="Circulate"
              variant="btn-primary"
              size="btn-sm"
              action={this.handleCirculate}
            />
            <Button
              text="Cancel"
              variant="btn-light"
              size="btn-sm"
              action={this.handleCirculateCancel}
            />
          </div>
        </div>

        {/* Result */}
        <div className={`candidate-winner ${dResult}`}>
          <div className="result">
            <div className="top">
              <figure>
                <i className="material-icons">account_circle</i>
              </figure>

              <div className="details">
                Jagdeep Singh
                <span>
                  <i className="material-icons">flag</i>
                  Aam Aadmi Party
                </span>
              </div>
            </div>

            <div className="bottom">
              <small>Hari Nagar, Voice</small>
              <br />
              <b className="success">95%,</b> people found him amazing.
              <br />
              <b className="error">5%,</b> people not found him good.
            </div>
          </div>
        </div>

        {/* Option panel */}
        <div className={`candidate-winner ${dOption}`}>
          <p>Your opinion?</p>

          <ul className="minister-list">
            <li>
              <div className="minister-item" onClick={this.handleChoose}>
                <a className="hover" href="">
                  <ul>
                    <li>
                      <div className="feature">
                        <i></i>
                        <span>
                          <b>03</b>
                          <br />
                          Cases
                        </span>
                      </div>
                    </li>
                    <li>
                      <div className="feature">
                        <i></i>
                        <span>
                          <b>1.85 crore</b>
                          <br />
                          Assets
                        </span>
                      </div>
                    </li>
                  </ul>
                  <div className="link">Click to select</div>
                </a>

                <figure>
                  <i className="material-icons">account_circle</i>
                </figure>
                <div className="details">
                  Jagdeep Singh
                  <span>
                    <i className="material-icons">flag</i>
                    Aam Aadmi Party
                  </span>
                </div>
              </div>
            </li>
            <li>
              <div className="minister-item" onClick={this.handleChoose}>
                <a className="hover" href="">
                  <ul>
                    <li>
                      <div className="feature">
                        <i></i>
                        <span>
                          <b>03</b>
                          <br />
                          Cases
                        </span>
                      </div>
                    </li>
                    <li>
                      <div className="feature">
                        <i></i>
                        <span>
                          <b>1.85 crore</b>
                          <br />
                          Assets
                        </span>
                      </div>
                    </li>
                  </ul>
                  <div className="link">Click to select</div>
                </a>

                <figure>
                  <i className="material-icons">account_circle</i>
                </figure>
                <div className="details">
                  Jagdeep Singh
                  <span>
                    <i className="material-icons">flag</i>
                    Aam Aadmi Party
                  </span>
                </div>
              </div>
            </li>
            <li>
              <div className="minister-item" onClick={this.handleChoose}>
                <a className="hover" href="">
                  <ul>
                    <li>
                      <div className="feature">
                        <i></i>
                        <span>
                          <b>03</b>
                          <br />
                          Cases
                        </span>
                      </div>
                    </li>
                    <li>
                      <div className="feature">
                        <i></i>
                        <span>
                          <b>1.85 crore</b>
                          <br />
                          Assets
                        </span>
                      </div>
                    </li>
                  </ul>
                  <div className="link">Click to select</div>
                </a>

                <figure>
                  <i className="material-icons">account_circle</i>
                </figure>
                <div className="details">
                  Jagdeep Singh
                  <span>
                    <i className="material-icons">flag</i>
                    Aam Aadmi Party
                  </span>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(CandidateWinner);
