import React, { Component, Fragment } from "react";

import "./style.scss";

export default class WriteContribution extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contribution: ""
    };
  }

  handleChange = () => {};

  render() {
    const { contribution } = this.state;
    return (
      <Fragment>
        <div className="contribution-box">
          <form action="">
            <textarea
              name="contribution"
              placeholder="Contribution for your area.  Write here!"
              value={contribution}
              onChange={this.handleChange}
            ></textarea>
          </form>
        </div>
      </Fragment>
    );
  }
}
