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
    this.state = {
      voteCount: props.respond.voteCount,
      opinionCount: props.respond.opinionCount
    };
  }

  handleVoteCount = e => {
    const { voteCount } = this.state;
    if (e) this.setState({ voteCount: voteCount + 1 });
    else this.setState({ voteCount: voteCount - 1 });
  };

  handleOpinionCount = () => {
    const { opinionCount } = this.state;
    let count = parseInt(opinionCount);

    this.setState({ opinionCount: count + 1 });
  };

  renderRespond = () => {
    const { voteCount, opinionCount } = this.state;
    const { respond, user } = this.props;
    const moment = new Moment();
    const time = moment.format(respond.createdAt);
    let display = respond.imageUrl ? "" : "d-none";
    let name = respond.displayName ? respond.displayName : respond.userName;

    let userImg = respond.photoURL ? (
      <img src={respond.photoURL} alt={name} />
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
          {voteCount} Votes ~ {opinionCount} Opinions
        </div>

        <div className="bottom">
          <ul className="actions">
            <li>
              <VoteRespond
                rid={respond.id}
                voted={respond.vote}
                count={respond.voteCount}
                action={e => this.handleVoteCount(e)}
              />
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
            Constituency: {respond.area} - {respond.pincode}
          </div>
        </div>

        <div className="opinion">
          <OpinionBox respond={respond} action={this.handleOpinionCount} />
        </div>
      </div>
    );
  };

  render() {
    this.renderRespond();
  }
}

export default connect(state => state)(Respond);
