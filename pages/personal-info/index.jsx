import React, { Component, Fragment } from "react";

import AccountNav from "components/Nav/Account";
import UserImage from "components/UserImage";
import EditText from "components/EditText";
import UploadFile from "components/UploadFile";
import Button from "components/Form/Button";

import "./style.scss";

export class index extends Component {
  render() {
    return (
      <Fragment>
        <div className="container">
          <div className="row">
            <div className="col-lg-3 d-none d-lg-block pt-5">
              <AccountNav />
            </div>
            <div className="col-lg-9">
              <div className="personal-info">
                <div className="top">
                  <div className="row">
                    <div className="col-12 col-lg-3">
                      <div className="user-photo">
                        <UserImage />
                      </div>
                    </div>
                    <div className="col-12 col-lg-9">
                      <div className="user-details">
                        <h1>
                          <EditText />
                        </h1>

                        <div className="upload-text">
                          <UploadFile>Upload Your Image</UploadFile>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <form className="form">
                  <div className="form-group">
                    <label htmlFor="name">Full name</label>
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
                    <textarea
                      type="text"
                      name="bio"
                      className="form-control text-area"
                      aria-label="bio"
                      placeholder="Short bio of you"
                    ></textarea>
                  </div>

                  <div className="form-group">
                    <label htmlFor="birthday">Birthday</label>
                    <input
                      type="text"
                      name="birthday"
                      className="form-control"
                      aria-label="name"
                      placeholder="Date of birth"
                    />
                  </div>

                  <h2>Private Information</h2>
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
                  <div className="form-group">
                    <label htmlFor="gender">Gender</label>
                    <select
                      type="text"
                      name="gender"
                      className="form-control"
                      aria-label="gender"
                      placeholder="Gender"
                    >
                      <option value="male">Male</option>
                      <option value="male">Female</option>
                      <option value="male">Prefer not to say</option>
                    </select>
                  </div>

                  <div className="action">
                    <Button text="Submit" variant="btn-primary" size="btn-lg" />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default index;
