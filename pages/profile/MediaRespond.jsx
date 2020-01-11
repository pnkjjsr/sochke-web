import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import Respond from "components/Respond";

import "./style.scss";

export class MediaRespondProfile extends Component {
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
      <div className={`context-empty `}>
        <h2>
          <span className="person">{person}</span> haven’t Upload Media Responed
          yet
          <small>
            When <span className="person">{person}</span> add a Media Respond,
            it’ll show up here.
          </small>
        </h2>
        <p>
          Media Respond, is same as respond but with photo of that area,
          problems, issue, good things and society. It can be positive or
          negative. Respond just show true face of the situation.
        </p>
        <div className="action">
          <button className="btn btn-lg btn-primary">Respond Now</button>
        </div>
      </div>
    );
  };

  renderLoop = () => {
    const { respondArr, user } = this.state;
    let len = respondArr.length;
    let filterArr = [];
    if (!len) return this.renderEmpty();
    else {
      respondArr.map(respond => {
        if (respond.type == "media") {
          filterArr.push(respond);
        }
      });

      if (!filterArr.length) {
        return this.renderEmpty();
      }

      return filterArr.map(respond => {
        return <Respond key={respond.id} respond={respond} user={user} />;
      });
    }
  };

  render() {
    return (
      <Fragment>
        <div className="profile-respond">{this.renderLoop()}</div>
      </Fragment>
    );
  }
}

export default connect(state => state)(MediaRespondProfile);
