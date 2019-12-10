import React, { Component, Fragment } from "react";
import Router from "next/router";
import Link from "next/link";

import authSession from "utils/authSession";

import UserImage from "components/UserImage";

import TabsProfile from "./Tabs";
import TabContainer from "./TabContainer";
import "./style.scss";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ""
    };
  }

  static async getInitialProps({ query }) {
    return { query };
  }
  componentDidMount() {
    // console.log(this.props.query.name);
    const session = new authSession();
    const profile = session.getProfile();
    this.setState({
      name: profile.displayName
    });
  }

  handleEditProfile = () => {
    Router.push("/personal-info");
  };

  render() {
    const { name } = this.state;
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
                  <li>0 responds</li>
                  <li>0 contributions</li>
                  <li>0 believers</li>
                  <li>0 leaders</li>
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

export default Profile;
