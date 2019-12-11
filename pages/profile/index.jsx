import React, { Component, Fragment } from "react";
import Router from "next/router";
import Link from "next/link";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import profileActions from "./action";

import userAuth from "utils/userAuth";
import authSession from "utils/authSession";

import UserImage from "components/UserImage";

import TabsProfile from "./Tabs";
import TabContainer from "./TabContainer";
import "./style.scss";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = { name: "" };
  }

  componentDidMount() {
    const { profileAction } = this.props;
    const session = new authSession();
    const profile = session.getProfile();
    if (!profile.displayName) this.setState({ name: profile.userName });
    this.setState({ name: profile.displayName });
    profileAction.prefetchProfileData(profile.userName);
  }

  handleEditProfile = () => {
    Router.push("/personal-info");
  };

  render() {
    const { name } = this.state;
    const { profile } = this.props;

    return (
      <Fragment>
        <div className="container profile">
          {/* Top User Details */}
          <div className="top">
            <div className="photo">
              <UserImage />
            </div>

            <div className="details">
              <h1>Welcome, {name}</h1>
              <div className="action">
                <button
                  className="btn btn-sm btn-default"
                  onClick={this.handleEditProfile}
                >
                  Edit Profile
                </button>

                <Link href="/security">
                  <a className="setting">
                    <i className="material-icons ">settings_applications</i>
                  </a>
                </Link>
              </div>
              <div className="count">
                <ul>
                  <li>{profile.data.respondCount} responds</li>
                  <li>{profile.data.contributionCount} contributions</li>
                  <li>{profile.data.mediaCount} Media</li>
                  <li>{profile.data.believerCount} believers</li>
                  <li>{profile.data.leaderCount} leaders</li>
                </ul>
              </div>
            </div>
          </div>

          <TabsProfile />
          <TabContainer />
        </div>
      </Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  profileAction: bindActionCreators(profileActions, dispatch)
});

export default connect(state => state, mapDispatchToProps)(userAuth(Profile));
