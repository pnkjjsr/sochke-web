import React, { Component, Fragment } from "react";
import Link from "next/link";

import Photo from "components/Photo";

class LeaderProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      self: props.self,
      leaders: props.leaderArr
    };
  }

  renderEmpty = () => {
    const { self } = this.state;
    const { respondArr } = this.props;
    let person = !self ? respondArr.userName : "You";
    return (
      <div className={`context-empty `}>
        <h2>
          {person} haven’t any Leader yet
          <small>Leaders, show up here.</small>
        </h2>
        <p>
          Leaders are those {person} believe in. Their thoughts and contriubtion
          is value for you.
        </p>
        <div className="action">
          <button className="btn btn-lg btn-primary">Show Leaders</button>
        </div>
      </div>
    );
  };

  renderLeaders = () => {
    const { leaders } = this.state;
    return leaders.map(leader => {
      return (
        <Link href={leader.leaderUserName}>
          <div className="connection">
            <Photo src={leader.photoURL} />
            <div className="title">
              {leader.leaderDisplayName || leader.leaderUserName}
            </div>
          </div>
        </Link>
      );
    });
  };

  render() {
    const { leaders } = this.state;
    const len = leaders.length;

    return !len ? this.renderEmpty() : this.renderLeaders();
  }
}

export default LeaderProfile;
