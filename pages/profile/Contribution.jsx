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
      contributionArr: []
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (!props.contributionArr) return null;
    else {
      return {
        user: props.contributionArr,
        contributionArr: props.contributionArr.contributions
      };
    }
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
    const { contributionArr, user } = this.state;
    const userData = {
      userName: user.userName,
      displayName: user.displayName,
      photoURL: user.photoURL,
      area: user.area,
      pincode: user.pincode
    };

    return contributionArr.map(contribution => {
      return (
        <ContributionWeb key={contribution.id} contribution={contribution} />
      );
    });
  };

  render() {
    const { contributionArr } = this.state;

    return (
      <Fragment>
        <div className="profile-contribution">
          {contributionArr.length ? this.renderLoop() : this.renderEmpty()}
        </div>
      </Fragment>
    );
  }
}

export default connect(state => state)(ContributionProfile);
