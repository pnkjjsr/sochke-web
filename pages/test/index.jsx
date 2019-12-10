import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import { service } from "apiConnect";

export class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    let data = {
      name: "Pankaj Jasoria"
    };
    service
      .post("/test", data)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <Fragment>
        <div>Test</div>
      </Fragment>
    );
  }
}

export default connect(state => state)(Test);
