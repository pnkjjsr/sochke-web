import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import { service } from "apiConnect";
import authSession from "utils/authSession";

import Button from "components/Form/Button";

import "./style.scss";

export class OptionMinister extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleChoose = e => {
    const { actionResult } = this.props;
    const session = new authSession();
    const token = session.getToken();
    const mid = e;

    const data = {
      uid: token,
      mid: mid,
      vote: true
    };

    actionResult();

    service
      .post("/minister-vote", data)
      .then(res => {})
      .catch(err => {
        console.log(err);
      });
  };

  handleCancel = () => {
    const { actionCancel } = this.props;
    actionCancel();
  };

  renderLoop = () => {
    const { ministers } = this.props;

    return Object.values(ministers).map(minister => {
      return (
        <li key={minister.id}>
          <div className="minister-item">
            <div
              className="hover"
              onClick={e => this.handleChoose(minister.id)}
            >
              <ul>
                <li>
                  <div className="feature">
                    <i></i>
                    <span>
                      <b>{minister.cases}</b>
                      <br />
                      Cases
                    </span>
                  </div>
                </li>
                <li>
                  <div className="feature">
                    <i></i>
                    <span>
                      <b>Rs. {minister.assets}</b>
                      <br />
                      Assets
                    </span>
                  </div>
                </li>
              </ul>
              <div className="link">Click to select</div>
            </div>

            <figure>
              <i className="material-icons">account_circle</i>
            </figure>
            <div className="details">
              {minister.name}
              <span>
                <i className="material-icons">flag</i>
                {minister.partyShort}
              </span>
            </div>
          </div>
        </li>
      );
    });
  };

  render() {
    return (
      <Fragment>
        <p>Your opinion?</p>

        <ul className="minister-list">{this.renderLoop()}</ul>

        <div className="action">
          <Button
            text="Cancel"
            size="btn-sm"
            variant="btn-danger"
            action={this.handleCancel}
          />
        </div>
      </Fragment>
    );
  }
}

export default connect(state => state)(OptionMinister);
