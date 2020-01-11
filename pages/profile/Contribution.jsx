import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import ContributionWeb from "components/Contribution/Web";

import "./style.scss";

export class ContributionProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      self: props.self,
      user: {},
      data: [],
      view: 0
    };
  }

  static getDerivedStateFromProps(props, state) {
    let arr = props.contributionArr.contributions;

    if (arr.length == 0) return null;

    return {
      user: props.contributionArr,
      data: arr,
      view: 1
    };
  }

  renderEmpty = () => {
    const { self } = this.state;
    const { contributionArr } = this.props;
    let person = !self ? contributionArr.userName : "You";

    return (
      <div className={`context-empty`}>
        <h2>
          <span className="person">{person}</span> haven’t Contributed yet
          <small>
            When <span className="person">{person}</span> write a Contribute,
            it’ll show up here.
          </small>
        </h2>
        <p>
          Contribute is a reall issue, problem, good thing or any realastic
          point of your area. You can write 3 contribute in a day. It will
          speacially show your area and other people can VOTE and give Opinion
          on that. Biggest the support your get from your area, biggest the
          value of Contribution.
        </p>
        <div className="action">
          <button className="btn btn-lg btn-primary">Contribute Now</button>
        </div>
      </div>
    );
  };

  renderLoop = () => {
    const { data, user } = this.state;
    const userData = {
      userName: user.userName,
      displayName: user.displayName,
      photoURL: user.photoURL,
      area: user.area,
      pincode: user.pincode
    };

    return data.map(contribution => {
      return (
        <div key={contribution.id} className="profile-contribution__items">
          <ContributionWeb data={contribution} />
        </div>
      );
    });
  };

  render() {
    const { view } = this.state;

    return (
      <Fragment>
        <div className="profile-contribution">
          {!view ? this.renderEmpty() : this.renderLoop()}
        </div>
      </Fragment>
    );
  }
}

export default connect(state => state)(ContributionProfile);
