import React, { Component, Fragment } from "react";
import Router from "next/router";
import Link from "next/link";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import profileActions from "./action";

import { service } from "apiConnect";
import authSession from "utils/authSession";

import Button from "components/Form/Button";
import PageLoader from "components/Loader/page";

import RespondProfile from "./Respond";
import MediaRespondProfile from "./MediaRespond";
import BelieverProfile from "./Believers";
import LeaderProfile from "./Leaders";
import "./style.scss";

class Profile extends Component {
  static async getInitialProps({ query }) {
    let queryName = query.userName;
    return { queryName };
  }

  constructor(props) {
    super(props);
    this.state = {
      selfProfile: 0,
      userImage: "",
      query: props.queryName,
      view: 0
    };
  }

  static getDerivedStateFromProps(props, state) {
    const { profile } = props;

    if (!profile.uid) {
      return null;
    } else {
      return {
        userImage: profile.photoURL,
        view: 1
      };
    }
  }

  componentDidMount() {
    const { query } = this.state;
    const { profileAction } = this.props;
    const session = new authSession();
    const profile = session.getProfile();

    if (query == profile.userName) {
      this.setState({
        selfProfile: 1
      });
    } else {
      this.setState({
        selfProfile: 0
      });
    }

    profileAction.prefetchProfileData(query);
  }

  handleEditProfile = () => {
    Router.push("/personal-info");
  };

  handleBelieve = () => {
    const { profile, profileAction } = this.props;
    const session = new authSession();
    const token = session.getToken();
    const userProfile = session.getProfile();

    const data = {
      createdAt: new Date().toISOString(),
      uid: token,
      userName: userProfile.userName,
      displayName: userProfile.displayName,
      photoURL: userProfile.photoURL,
      lid: profile.uid,
      leaderUserName: profile.userName,
      leaderDisplayName: profile.displayName,
      leaderPhotoURL: profile.photoURL
    };
    profileAction.addLeader();

    service
      .post("/i-believe", data)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  };

  handleRethink = () => {
    const { profile, profileAction } = this.props;
    const session = new authSession();
    const token = session.getToken();

    const data = {
      uid: token,
      lid: profile.uid
    };
    profileAction.removeLeader();

    service
      .post("/rethink", data)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  };

  renderAction = () => {
    const { selfProfile } = this.state;
    const { profile } = this.props;

    if (!selfProfile) {
      if (!profile.believe) {
        return (
          <Button
            text="I Believe"
            variant="btn-primary"
            action={this.handleBelieve}
          />
        );
      } else {
        return (
          <Button
            text="Rethink"
            variant="btn-danger"
            action={this.handleRethink}
          />
        );
      }
    } else {
      return (
        <Fragment>
          <Button
            text="Edit Profile"
            size="btn-sm"
            variant="btn-default"
            action={this.handleEditProfile}
          />

          <Link href="/security">
            <a className="setting">
              <i className="material-icons ">settings_applications</i>
            </a>
          </Link>
        </Fragment>
      );
    }
  };

  renderUserImage = () => {
    const { userImage } = this.state;

    if (userImage) {
      return <img src={userImage} alt="" />;
    } else {
      return <i className="material-icons">account_circle</i>;
    }
  };

  renderProfile = () => {
    const { query } = this.state;
    const { profile } = this.props;

    return (
      <Fragment>
        <div className="container profile">
          {/* Top User Details */}
          <div className="top">
            <div className="photo">
              <figure>{this.renderUserImage()}</figure>
            </div>

            <div className="details">
              <h1>Welcome, {query}</h1>
              <div className="action">{this.renderAction()}</div>
              <div className="count">
                <ul>
                  <li>{profile.respondCount} responds</li>
                  <li>{profile.contributionCount} contributions</li>
                  <li>{profile.mediaCount} Media</li>
                  <li>{profile.believerCount} believers</li>
                  <li>{profile.leaderCount} leaders</li>
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
                <RespondProfile respondArr={profile} />
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
                <MediaRespondProfile respondArr={profile} />
              </TabPanel>

              <TabPanel>
                <div className="connections">
                  <BelieverProfile believerArr={profile.believers} />
                </div>
              </TabPanel>

              <TabPanel>
                <div className="connections">
                  <LeaderProfile leaderArr={profile.leaders} />
                </div>
              </TabPanel>
            </div>
          </Tabs>
        </div>
      </Fragment>
    );
  };

  render() {
    const { view } = this.state;

    if (view == 0) {
      return <PageLoader />;
    } else {
      return this.renderProfile();
    }
  }
}

const mapDispatchToProps = dispatch => ({
  profileAction: bindActionCreators(profileActions, dispatch)
});

export default connect(state => state, mapDispatchToProps)(Profile);
