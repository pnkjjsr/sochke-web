import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import pollActions from "./action";

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

  render() {
    return (
      <Fragment>
        <div className="poll-panel">
          <p>Pollution issue should be primary Agenda to solve.</p>

          <div className="action">
            <Button text="Yes" variant="btn-success" size="btn-sm" />
            <Button text="No" variant="btn-danger" size="btn-sm" />
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
