import React, { Component, Fragment } from "react";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import respondActions from "./action";

import Storage from "utils/firestoreStorage";
import authSession from "utils/authSession";
import Moment from "utils/moment";

import VoteRespond from "./Vote";
import CirculateRespond from "./Circulate";
import OpinionRespond from "./Opinion";

import "./style.scss";

class RespondList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      responds: {},
      name: "",
      time: "",
      photoUrl: "",
      pincode: "",
      area: "",
      imgUsr: ""
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    let data = nextProps.responds.responds;
    let len = nextProps.responds.responds.length;
    if (len > 0) {
      return {
        responds: data
      };
    }

    return null;
  }

  componentDidMount() {
    const { respondAction } = this.props;
    const session = new authSession();
    const token = session.getToken();
    const profile = session.getProfile();

    respondAction.prefetch(token);

    this.setState({
      name: profile.displayName,
      photoUrl: profile.photoURL,
      pincode: profile.pincode,
      area: profile.area,
      imgUsr: profile.photoURL
    });
  }

  render() {
    const { responds, name, photoUrl, pincode, area, imgUsr } = this.state;
    const moment = new Moment();

    let list = Object.values(responds).map(respond => {
      const time = moment.format(respond.createdAt);
      let diplay = respond.imageUrl ? "" : "d-none";

      return (
        <div key={respond.id} className="respond-list">
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

          <div className="bottom">
            <ul className="actions">
              <li>
                <VoteRespond rid={respond.id} />
              </li>
              <li>
                <CirculateRespond />
              </li>
              <li>
                <OpinionRespond />
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
    });

    return list;
  }
}

const mapDispatchToProps = dispatch => ({
  respondAction: bindActionCreators(respondActions, dispatch)
});

export default connect(state => state, mapDispatchToProps)(RespondList);
