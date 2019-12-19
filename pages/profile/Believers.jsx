import React, { Component, Fragment } from "react";
import Link from "next/link";

import Photo from "components/Photo";

class BelieverProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      believers: props.believerArr
    };
  }

  renderEmpty = () => {
    return (
      <div className={`context-empty `}>
        <h2>
          You haven’t any Beliver yet
          <small>Belivers, show up here.</small>
        </h2>
        <p>
          Belivers are the person and group of person who believe in your
          thoughts.
        </p>
        <div className="action">
          <button className="btn btn-lg btn-primary">Invite Now</button>
        </div>
      </div>
    );
  };

  renderBelievers = () => {
    const { believers } = this.state;

    return believers.map(believer => {
      return (
        <Link href={believer.userName}>
          <div className="connection">
            <Photo src={believer.photoURL} />
            <div className="title">
              {believer.displayName || believer.userName}
            </div>
          </div>
        </Link>
      );
    });
  };

  render() {
    const { believers } = this.state;
    const len = believers.length;

    return !len ? this.renderEmpty() : this.renderBelievers();
  }
}

export default BelieverProfile;
