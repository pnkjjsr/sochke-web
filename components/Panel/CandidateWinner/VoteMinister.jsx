import React, { Component, Fragment } from "react";

import Button from "components/Form/Button";
import Photo from "components/Photo";

import "./style.scss";

class VoteMinister extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  loopMinister = () => {};

  render() {
    const { minister, actionGood, actionBad } = this.props;

    return (
      <Fragment>
        <div className="photo">
          <Photo src={minister.photoUrl} />
          <figcaption>Defending Minister</figcaption>
        </div>

        <div className="party">
          <i className="material-icons">flag</i>
          <label htmlFor="party">{minister.party}</label>
        </div>

        <div className="name">{minister.name}</div>

        <div className="tenure">Last 5 Year?</div>

        <div className="action">
          <Button
            text="Good"
            variant="btn-success"
            action={() => actionGood(minister.id)}
          />
          <Button
            text="Bad"
            variant="btn-danger"
            action={() => actionBad(minister.id)}
          />
        </div>
      </Fragment>
    );
  }
}

export default VoteMinister;
