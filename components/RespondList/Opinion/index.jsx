import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import iconOpinion from "icons/opinion.svg";
import "./style.scss";

export class OpinionRespond extends Component {
  render() {
    return (
      <Fragment>
        <div className="opinion-respond">
          <i className="material-icons">chat_bubble</i>
          <span>Opinion</span>
        </div>
      </Fragment>
    );
  }
}

const mapDispatchToProps = {};

export default connect(state => state, mapDispatchToProps)(OpinionRespond);
