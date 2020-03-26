import React, { Component, Fragment } from "react";

import Splash from "./splash";
import Contribute from "./contribute";

class Intro extends Component {
  constructor(props) {
    super(props);

    this.state = {
      view: 1
    };
  }

  render() {
    const { view } = this.state;
    if (view == 0) {
      return <Splash />;
    } else if (view == 1) {
      return <Contribute />;
    }
  }
}

export default Intro;
