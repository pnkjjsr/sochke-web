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
      pollView: 0,
      type: props.type,
      polls: []
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.data) {
      return {
        polls: props.data
      };
    }
    return null;
  }

  handlePoll = (pollVote, pollId) => {
    const { type, pollView } = this.state;
    const session = new authSession();
    let token = session.getToken();

    let data = {
      uid: token,
      pid: pollId,
      poll: pollVote
    };

    this.setState({
      pollView: pollView + 1
    });

    service
      .post("/add-poll", data)
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  loopPoll = () => {
    const { type, polls, pollView } = this.state;

    let filterPolls = [];

    polls.map(poll => {
      if (poll.type == type) {
        filterPolls.push(poll);
      }
    });

    return filterPolls.map((poll, key) => {
      let activeClass = pollView == key ? "active" : "";
      return (
        <div key={poll.id} className={`poll-panel ${activeClass}`}>
          <p>{poll.question}</p>

          <div className="action">
            <Button
              text="Yes"
              variant="btn-success"
              size="btn-sm"
              action={e => this.handlePoll(true, poll.id)}
            />
            <Button
              text="No"
              variant="btn-danger"
              size="btn-sm"
              action={e => this.handlePoll(false, poll.id)}
            />
          </div>
        </div>
      );
    });
  };

  render() {
    return this.loopPoll();
  }
}

export default connect(state => state)(PanelPoll);
