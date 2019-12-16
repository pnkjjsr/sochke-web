import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import { service } from "apiConnect";
import authSession from "utils/authSession";

import Button from "components/Form/Button";

import "./style.scss";

export class PanelPoll extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: props.type,
      poll: []
    };
  }

  handlePoll = e => {
    const { type, poll } = this.state;
    const session = new authSession();
    let token = session.getToken();

    let data = {
      uid: token,
      pid: poll.id,
      poll: e
    };

    service
      .post("/add-poll", data)
      .then(res => {
        let pdata = {
          uid: token,
          type: type
        };
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    const { type, poll } = this.state;

    return (
      <Fragment>
        <div className="poll-panel">
          <p>{poll.poll}</p>

          <div className="action">
            <Button
              text="Yes"
              variant="btn-success"
              size="btn-sm"
              action={e => this.handlePoll(true)}
            />
            <Button
              text="No"
              variant="btn-danger"
              size="btn-sm"
              action={e => this.handlePoll(false)}
            />
          </div>
        </div>
      </Fragment>
    );
  }
}

export default connect(state => state)(PanelPoll);
