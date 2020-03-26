import React, { Component, Fragment } from "react";
import Contribution from "components/Contribution";

class Contribute extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const mainClass = "intro";
    return (
      <Fragment>
        <div className={mainClass}>
          <Contribution />
        </div>
      </Fragment>
    );
  }
}

export default Contribute;
