import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import "./style.scss";

export class CirculateRespond extends Component {
  render() {
    return (
      <Fragment>
        <div className="circulate-respond">
          <i className="material-icons">cached</i>
          <span>Circulate</span>
        </div>
      </Fragment>
    );
  }
}

const mapDispatchToProps = {};

export default connect(state => state, mapDispatchToProps)(CirculateRespond);
