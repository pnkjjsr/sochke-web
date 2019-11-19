import React, { Component } from "react";

import { connect } from "react-redux";

import authSession from "utils/authSession"

import "./style.scss";

class UserImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imgUsr: ""
    };
  }

  componentDidMount() {
    const { login } = this.props;

    const session = new authSession;
    let profile = session.getProfile();

    let photo = profile.photoURL;

    if (photo || login.user.photoURL) {
      this.setState({
        imgUsr: photo || login.user.photoURL
      });
    }
  }

  render() {
    const { imgUsr } = this.state;
    let user = !imgUsr ? "icon" : <img src={imgUsr} alt="user profile image" />;

    return (
      <figure>{user}</figure>
    );
  }
}

export default connect(state => state)(UserImage);
