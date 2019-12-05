import React, { Component, Fragment } from "react";
import UserImage from "components/UserImage";

import "./style.scss";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static async getInitialProps({ query }) {
    return { query };
  }
  componentDidMount() {
    // console.log(this.props.query.name);
  }

  render() {
    return (
      <Fragment>
        <div className="container profile">
          {/* Top User Details */}
          <div className="top">
            <div className="photo">
              <UserImage />
            </div>

            <div className="details">
              <h1>Welcome, Pankaj Jasoria</h1>
              <div className="action">
                <button className="btn btn-sm btn-default">Edit Profile</button>
                <i className="material-icons setting">settings_applications</i>
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

          {/* Tab */}
          <div className="tabs">
            <ul>
              <li className="active">Responds</li>
              <li>Contributions</li>
              <li>Media</li>
              <li>Belivers</li>
              <li>Leaders</li>
            </ul>
          </div>

          {/* Tab Conatiner */}
          <div className="tab-container">
            <div className="context-empty">
              <h2>
                You haven’t Responed yet
                <small>When you write a Respond, it’ll show up here.</small>
              </h2>
              <p>
                Respond is general thought of your about your area, problems,
                issue, good things and society. It can be positive or negative.
                Respond just show other people true face of the situation.
              </p>
              <div className="action">
                <button className="btn btn-lg btn-primary">Respond Now</button>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Profile;
