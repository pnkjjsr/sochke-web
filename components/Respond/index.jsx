import React, { Component } from "react";
import { connect } from "react-redux";

import Moment from "utils/moment";

import VoteRespond from "./RespondItem/Vote";
import CirculateRespond from "./RespondItem/Circulate";
import OpinionRespond from "./RespondItem/Opinion";
import OpinionBox from "components/Opinion/OpinionBox";

import "./style.scss";

class Respond extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { respond, user } = this.props;
    const moment = new Moment();
    const time = moment.format(respond.createdAt);
    let display = respond.imageUrl ? "" : "d-none";
    let name = user.displayName ? user.displayName : user.userName;

    let userImg = user.photoURL ? (
      <img src={user.photoURL} alt={name} />
    ) : (
      <i className="material-icons">account_circle</i>
    );
    return (
      <div className="respond-item">
        <div className="top">
          <figure>{userImg}</figure>
          <div className="detail">
            {name}
            <span>{time}</span>
          </div>
        </div>

        <div className="respond">{respond.respond}</div>

        <div className={`respond-image ${display}`}>
          <figure>
            <img src={respond.imageUrl} alt={respond.respond} />
          </figure>
        </div>

        <div className="counts">
          {respond.voteCount} Votes ~ {respond.opinionCount} Opinions
        </div>

        <div className="bottom">
          <ul className="actions">
            <li>
              <VoteRespond rid={respond.id} />
            </li>
            <li>
              <CirculateRespond />
            </li>
            <li>
              <OpinionRespond respond={respond} />
            </li>
          </ul>
          <div className="detail">
            {/* Responsibility: Arvind Kejriwal - CM */}
            {/* <br /> */}
            Constituency: {user.area} - {user.pincode}
          </div>
        </div>

        <div className="opinion">
          <OpinionBox respond={respond} />
        </div>
      </div>
    );
  }
}

export default connect(state => state)(Respond);
