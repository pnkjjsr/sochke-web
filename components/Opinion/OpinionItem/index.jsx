import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import Moment from "utils/moment";

import "./style.scss";

export class OpinionItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userImg: props.data.photoURL,
      name: props.data.displayName,
      date: props.data.createdAt,
      opinion: props.data.opinion
    };
  }

  render() {
    const { opinion, userImg, name, date } = this.state;
    const moment = new Moment();
    const time = moment.format(date);

    return (
      <Fragment>
        <div className="opinion-item">
          <div className="top">
            <figure>
              <img src={userImg} alt={name} />
            </figure>

            <div className="details">
              {name}
              <span>{time}</span>
            </div>
          </div>

          <div className="opinion">{opinion}</div>
        </div>
      </Fragment>
    );
  }
}

const mapDispatchToProps = {};

export default connect(state => state, mapDispatchToProps)(OpinionItem);
