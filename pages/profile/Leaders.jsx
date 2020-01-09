import React, { Component, Fragment } from "react";
import Link from "next/link";

import Photo from "components/Photo";

class LeaderProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      self: props.self,
      leaders: props.leaderArr.leaders
    };
  }

  renderEmpty = () => {
    const { self } = this.state;
    const { leaderArr } = this.props;
    let person = !self ? leaderArr.userName : "You";
    return (
      <div className={`context-empty `}>
        <h2>
          <span className="person">{person}</span> haven’t any Leader yet
          <small>Leaders, show up here.</small>
        </h2>
        <p>
          Leaders are those <span className="person">{person}</span> believe in.
          Their thoughts and contriubtion is value for you.
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
