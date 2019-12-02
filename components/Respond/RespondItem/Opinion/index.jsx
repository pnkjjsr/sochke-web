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
                query: {
                  createdAt: respond.createdAt,
                  id: respond.id,
                  imageUrl: respond.imageUrl,
                  respond: respond.respond,
                  type: respond.type,
                  uid: respond.uid,
                  voted: respond.voted,
                  likeCount: respond.likeCount,
                  opinionCount: respond.opinionCount
                }
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
