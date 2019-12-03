import React, { Component } from "react";
import { connect } from "react-redux";

import "./style.scss";

class PhotoPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imgURL: ""
    };
  }

  render() {
    const { imgURL } = this.state;
    let user = !imgURL ? (
      <i className="material-icons">account_circle</i>
    ) : (
      <img src={imgURl} alt="user profile image" />
    );

    return <figure>{user}</figure>;
  }
}

export default connect(state => state)(PhotoPanel);
