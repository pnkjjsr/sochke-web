import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import { service } from "apiConnect";
import authSession from "utils/authSession";

import "./style.scss";

export class VoteRespond extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleClick = () => {
    let session = new authSession();
    const { rid } = this.props;
    const token = session.getToken();

    let data = {
      rid: rid,
      uid: token
    };

    service
      .post("vote-respond", data)
      .then()
      .catch();
  };

  render() {
    return (
      <Fragment>
        <div className="vote-respond" onClick={this.handleClick}>
          <i className="material-icons">add</i>
          <span>Vote</span>
        </div>
      </Fragment>
    );
  }
}

const mapDispatchToProps = {};

export default connect(state => state, mapDispatchToProps)(VoteRespond);
