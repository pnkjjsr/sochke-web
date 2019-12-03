import React, { Component } from "react";

import { connect } from "react-redux";

import Moment from "utils/moment";
import authSession from "utils/authSession";

import VoteRespond from "./Vote";
import CirculateRespond from "./Circulate";
import OpinionRespond from "./Opinion";

import "./style.scss";

class RespondItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      photoUrl: "",
      pincode: "",
      area: "",
      imgUsr: "",
      uid: ""
    };
  }
  componentDidMount() {
    const session = new authSession();
    const token = session.getToken();
    const profile = session.getProfile();

    this.setState({
      name: profile.displayName,
      photoUrl: profile.photoURL,
      pincode: profile.pincode,
      area: profile.area,
      imgUsr: profile.photoURL,
      uid: token
    });
  }

  render() {
    const { respond } = this.props;
    const { name, pincode, area, imgUsr, uid } = this.state;

    const moment = new Moment();
    const time = moment.format(respond.createdAt);
    let diplay = respond.imageUrl ? "" : "d-none";

    return (
      <div className="respond-item">
        <div className="top">
          <figure>
            <img src={imgUsr} alt={name} />
          </figure>
          <div className="detail">
            {name}
            <span>{time}</span>
          </div>
        </div>

        <div className="respond">{respond.respond}</div>

        <div className={`respond-image ${diplay}`}>
          <figure>
            <img src={respond.imageUrl} alt={respond.respond} />
          </figure>
        </div>

        <div className="counts">
          {respond.likeCount} Votes ~ {respond.opinionCount} Opinions
        </div>

        <div className="bottom">
          <ul className="actions">
            <li>
              <VoteRespond rid={respond.id} uid={uid} voted={respond.voted} />
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
            Constituency: {area} - {pincode}
          </div>
        </div>
      </div>
    );
  }
}

export default connect(state => state)(RespondItem);
