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
      pollView: 0,
      polls: [],
      renderView: "loading"
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.data.length) {
      return {
        polls: props.data,
        renderView: "polls"
      };
    }
    return null;
  }

  handlePoll = (pollVote, pollId, len) => {
    const { pollView } = this.state;
    const session = new authSession();
    let token = session.getToken();

    let data = {
      uid: token,
      pid: pollId,
      vote: pollVote
    };

    this.setState(
      {
        pollView: pollView + 1
      },
      () => {
        if (this.state.pollView == len) {
          console.log("render Last View Components.");
        }
      }
    );

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

    let lenArr = filterPolls.length;

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
              action={e => this.handlePoll(true, poll.id, lenArr)}
            />
            <Button
              text="No"
              variant="btn-danger"
              size="btn-sm"
              action={e => this.handlePoll(false, poll.id, lenArr)}
            />
          </div>
        </div>
      );
    });
  };

  render() {
    const { renderView } = this.state;
    console.log(renderView);

    switch (renderView) {
      case "loading":
        return "Loading...";
      case "polls":
        return this.loopPoll();
      case "end":
        return "Last Screen";
    }
  }
}

export default connect(state => state)(PanelPoll);
