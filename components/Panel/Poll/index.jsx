import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import pollActions from "./action";

import { service } from "apiConnect";
import authSession from "utils/authSession";

import Button from "components/Form/Button";

import "./style.scss";

export class PanelPoll extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: props.type
    };
  }

  componentDidMount() {
    const { type } = this.state;
    const { pollAction } = this.props;
    pollAction.prefetchPollData(type);
  }

  handlePoll = e => {
    const { polls, pollAction } = this.props;
    const session = new authSession();
    let token = session.getToken();

    let poll = polls.data;
    let data = {
      uid: token,
      pid: poll.id,
      poll: e
    };

    service
      .post("/add-poll", data)
      .then(res => {
        pollAction.prefetchPollData(type);
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    const { polls } = this.props;
    let poll = polls.data;

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

const mapDispatchToProps = dispatch => ({
  pollAction: bindActionCreators(pollActions, dispatch)
});

export default connect(state => state, mapDispatchToProps)(PanelPoll);
