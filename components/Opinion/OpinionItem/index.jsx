import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import "./style.scss";

export class OpinionItem extends Component {
  constructor(props) {
    super(props);
    console.log(props);

    this.state = {
      userImg: "",
      name: "",
      date: props.data.createdAt,
      opinion: props.data.opinion
    };
  }

  render() {
    const { opinion, userImg, name, date } = this.state;

    return (
      <Fragment>
        <div className="opinion-item">
          <figure>
            <img src={userImg} alt={name} />
          </figure>

          <div className="name">{name}</div>
          <div className="date">{date}</div>

          <div className="opinion">{opinion}</div>
        </div>
      </Fragment>
    );
  }
}

const mapDispatchToProps = {};

export default connect(state => state, mapDispatchToProps)(OpinionItem);
