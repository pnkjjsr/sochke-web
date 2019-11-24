import React, { Component, Fragment } from "react";

import AccountNav from "components/Nav/Account";

import "./style.scss";

export class index extends Component {
  render() {
    return (
      <Fragment>
        <div className="container personal-info">
          <div className="row">
            <div className="col-lg-3 d-none d-lg-block">
              <AccountNav />
            </div>
            <div className="col-lg-9">
              <h1>Profile</h1>
              <div>
                <div>
                  <b>Upload Your Image</b>
                </div>

                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    aria-label="name"
                    placeholder="Your name"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="bio">I'm</label>
                  <input
                    type="text"
                    name="bio"
                    className="form-control"
                    aria-label="bio"
                    placeholder="Short intro of me"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="birthday">Birthday</label>
                  <input
                    type="text"
                    name="birthday"
                    className="form-control"
                    aria-label="name"
                    placeholder="Your name"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="gender">Gender</label>
                  <input
                    type="text"
                    name="gender"
                    className="form-control"
                    aria-label="gender"
                    placeholder="Gender"
                  />
                </div>
              </div>

              <hr />
              <h1>Contact Info</h1>
              <div className="form-group">
                <label htmlFor="gender">Mobile</label>
                <input
                  type="text"
                  name="mobile"
                  className="form-control"
                  aria-label="mobile"
                  placeholder="Mobile"
                />
              </div>

              <div className="form-group">
                <label htmlFor="gender">Email</label>
                <input
                  type="text"
                  name="email"
                  className="form-control"
                  aria-label="email"
                  placeholder="email"
                />
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default index;
