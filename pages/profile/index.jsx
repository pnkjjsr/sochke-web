import React, { Component, Fragment } from "react";
import Router from "next/router";
import Link from "next/link";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import profileActions from "./action";

import authSession from "utils/authSession";

import Button from "components/Form/Button";
import PageLoader from "components/Loader/page";

import RespondProfile from "./Respond";
import MediaRespondProfile from "./MediaRespond";
import "./style.scss";

class Profile extends Component {
  static async getInitialProps({ query }) {
    let queryName = query.userName;
    return { queryName };
  }

  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      userImage: "",
      query: props.queryName,
      view: 0
    };
  }

  static getDerivedStateFromProps(props, state) {
    const { profile } = props;

    let len = Object.keys(profile.data).length;

    if (!len) {
      return null;
    } else {
      return {
        userImage: profile.data.photoURL,
        view: 1
      };
    }
  }

  componentDidMount() {
    const { query } = this.state;
    const { profileAction } = this.props;
    const session = new authSession();
    const profile = session.getProfile();

    this.setState({
      userName: profile.userName
    });

    profileAction.prefetchProfileData(query);
  }

  handleEditProfile = () => {
    Router.push("/personal-info");
  };

  renderAction = () => {
    const { userName, query } = this.state;

    if (userName == query) {
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
    } else {
      return (
        <Button
          text="I Believe"
          variant="btn-primary"
          action={this.handleEditProfile}
        />
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
