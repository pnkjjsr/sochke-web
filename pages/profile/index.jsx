import React, { Component, Fragment } from "react";
import Router from "next/router";
import Link from "next/link";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import profileActions from "./action";

import RespondProfile from "./Respond";
import MediaRespondProfile from "./MediaRespond";
import "./style.scss";

class Profile extends Component {
  static async getInitialProps({ query }) {
    let user = query.userName;
    return { user };
  }

  constructor(props) {
    super(props);
    this.state = {
      user: props.user,
      userImage: ""
    };
  }

  static getDerivedStateFromProps(props, state) {
    const { profile } = props;

    let len = Object.keys(profile.data).length;

    if (!len) {
      return null;
    } else {
      return {
        userImage: profile.data.photoURL
      };
    }
  }

  componentDidMount() {
    const { user } = this.state;
    const { profileAction } = this.props;
    profileAction.prefetchProfileData(user);
  }

  handleEditProfile = () => {
    Router.push("/personal-info");
  };

  render() {
    const { user, userImage } = this.state;
    const { profile } = this.props;

    return (
      <Fragment>
        <div className="container profile">
          {/* Top User Details */}
          <div className="top">
            <div className="photo">
              <figure>
                <img src={userImage} alt="" />
              </figure>
            </div>

            <div className="details">
              <h1>Welcome, {user}</h1>
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

          <Tabs>
            <div className="tabs">
              <TabList>
                <Tab>Responds</Tab>
                <Tab>Contributions</Tab>
                <Tab>Media</Tab>
                <Tab>Belivers</Tab>
                <Tab>Leaders</Tab>
              </TabList>
            </div>

            <div className="tab-container">
              <TabPanel>
                <RespondProfile respondArr={profile.data} />
              </TabPanel>

              <TabPanel>
                <div className={`context-empty `}>
                  <h2>
                    You haven’t Contributed yet
                    <small>
                      When you write a Contribute, it’ll show up here.
                    </small>
                  </h2>
                  <p>
                    Contribute is a reall issue, problem, good thing or any
                    realastic point of your area. You can write 3 contribute in
                    a day. It will speacially show your area and other people
                    can VOTE and give Opinion on that. Biggest the support your
                    get from your area, biggest the value of Contribution.
                  </p>
                  <div className="action">
                    <button className="btn btn-lg btn-primary">
                      Contribute Now
                    </button>
                  </div>
                </div>
              </TabPanel>

              <TabPanel>
                <MediaRespondProfile respondArr={profile.data} />
              </TabPanel>

              <TabPanel>
                <div className={`context-empty `}>
                  <h2>
                    You haven’t any Beliver yet
                    <small>Belivers, show up here.</small>
                  </h2>
                  <p>
                    Belivers are the person and group of person who believe in
                    your thoughts.
                  </p>
                  <div className="action">
                    <button className="btn btn-lg btn-primary">
                      Invite Now
                    </button>
                  </div>
                </div>
              </TabPanel>

              <TabPanel>
                <div className={`context-empty `}>
                  <h2>
                    You haven’t any Leader yet
                    <small>Leaders, show up here.</small>
                  </h2>
                  <p>
                    Leaders are those you believe in. Their thoughts and
                    contriubtion is value for you.
                  </p>
                  <div className="action">
                    <button className="btn btn-lg btn-primary">
                      Show Leaders
                    </button>
                  </div>
                </div>
              </TabPanel>
            </div>
          </Tabs>
        </div>
      </Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  profileAction: bindActionCreators(profileActions, dispatch)
});

export default connect(state => state, mapDispatchToProps)(Profile);
