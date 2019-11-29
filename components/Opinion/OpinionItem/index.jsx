import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

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

    return (
      <Fragment>
        <div className="opinion-item">
          <div className="top">
            <figure>
              <img src={userImg} alt={name} />
            </figure>

            <div className="details">
              {name}
              <span>{date}</span>
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
