import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import Link from "next/link";

import Respond from "components/Respond";

import "./style.scss";

export class RespondProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      self: props.self,
      user: {},
      respondArr: []
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (!props.respondArr) return null;
    else {
      return {
        user: props.respondArr,
        respondArr: props.respondArr.responds
      };
    }
  }

  renderEmpty = () => {
    const { self } = this.state;
    const { respondArr } = this.props;
    let person = !self ? respondArr.userName : "You";

    return (
      <div className={`context-empty`}>
        <h2>
          <span className="person">{person}</span> haven’t Responed yet
          <small>
            When <span className="person">{person}</span> write a Respond, it’ll
            show up here.
          </small>
        </h2>
        <p>
          Respond is general thought of your about your area, problems, issue,
          good things and society. It can be positive or negative. Respond just
          show other people true face of the situation.
        </p>
        <div className="action">
          <Link href="/">
            <a>Respond Now</a>
          </Link>
        </div>
      </div>
    );
  };

  renderLoop = () => {
    const { respondArr, user } = this.state;
    const userData = {
      userName: user.userName,
      displayName: user.displayName,
      photoURL: user.photoURL,
      area: user.area,
      pincode: user.pincode
    };

    return respondArr.map(respond => {
      return <Respond key={respond.id} respond={respond} user={userData} />;
    });
  };

  render() {
    const { respondArr } = this.state;

    return (
      <Fragment>
        <div className="profile-respond">
          {respondArr.length ? this.renderLoop() : this.renderEmpty()}
        </div>
      </Fragment>
    );
  }
}

export default connect(state => state)(RespondProfile);
