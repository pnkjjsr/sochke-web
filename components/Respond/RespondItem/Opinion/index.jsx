import React, { Component, Fragment } from "react";
import Link from "next/link";
import { connect } from "react-redux";

import Drawer from "components/Drawer";

import "./style.scss";

export class OpinionRespond extends Component {
  render() {
    const { respond } = this.props;

    return (
      <Fragment>
        <div className="opinion-respond">
          <i className="material-icons">chat_bubble</i>
          <span>
            <Link
              href={{
                pathname: "/respond",
                query: respond
              }}
            >
              <a>Opinion</a>
            </Link>
          </span>
        </div>
        <Drawer>
          <div></div>
        </Drawer>
      </Fragment>
    );
  }
}

const mapDispatchToProps = {};

export default connect(state => state, mapDispatchToProps)(OpinionRespond);
