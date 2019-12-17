import React, { Component, Fragment } from "react";

import { service } from "apiConnect";
import authSession from "utils/authSession";

import AlertRespond from "./AlertRespond";
import OptionMinister from "./OptionMinister";
import ResultMinister from "./ResultMinister";

import Button from "components/Form/Button";

import "./style.scss";

class VoteMinister extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  loopMinister = () => {
    const { ministerDetails, actionGood, actionBad } = this.props;
    return Object.values(ministerDetails).map((minister, key) => {
      if (minister.winner == true) {
        return (
          <Fragment key={key}>
            <div className="photo">
              <figure>
                <i className="material-icons">account_circle</i>
                {/* <img src={ministerWinner.photoUrl} alt="" /> */}
              </figure>
              <figcaption>Defending Minister</figcaption>
            </div>

            <div className="party">
              <i className="material-icons">flag</i>
              <label htmlFor="party">{minister.party}</label>
            </div>

            <div className="name">{minister.name}</div>

            <div className="tenure">Last 5 Year?</div>

            <div className="action">
              <Button text="Good" variant="btn-success" action={actionGood} />
              <Button text="Bad" variant="btn-danger" action={actionBad} />
            </div>
          </Fragment>
        );
      }
    });
  };

  render() {
    return this.loopMinister();
  }
}

export default VoteMinister;
