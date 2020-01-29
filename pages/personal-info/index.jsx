import React, { Component, Fragment } from "react";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import actionNotifications from "components/Notification/actions";
import loginActions from "pages/login/actions";

import { service } from "apiConnect";
import userAuth from "utils/userAuth";
import authSession from "utils/authSession";

import AccountNav from "components/Nav/Account";
import UserImage from "components/UserImage";
import EditText from "components/EditText";
import UploadFile from "components/UploadFile";
import Button from "components/Form/Button";
import CalendarSelect from "components/Form/Calendar/Select";

import validation from "./validation";
import "./style.scss";

export class PersonalInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uid: "",
      name: "",
      bio: "",
      date: "",
      month: "",
      year: "",
      mobile: "",
      gender: "",
      photoURL: "",
      email: "",
      emailErr: "",
      emailMsg: "",
      dob: ""
    };
  }

  componentDidMount() {
    const { loginAction } = this.props;
    const auth = new authSession();
    const profile = auth.getProfile();
    const token = auth.getToken();

    loginAction.authenticate(profile);
    this.setState({
      uid: token,
      photoURL: profile.photoURL,
      name: profile.displayName,
      bio: profile.bio,
      dob: profile.dateOfBirth || "",
      mobile: profile.phoneNumber,
      email: profile.email,
      gender: profile.gender
    });
  }

  handleChange = e => {
    let elem = e.target.name;
    let err = elem + "Err";
    let msg = elem + "Msg";

    this.setState({
      [elem]: e.target.value,
      [err]: "",
      [msg]: ""
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const {
      uid,
      name,
      bio,
      date,
      month,
      year,
      mobile,
      email,
      gender
    } = this.state;
    const { actionNotification, loginAction, login } = this.props;
    const { valid, errors } = validation({ email });
    let dob;
    if (date && month && year) {
      let time = `${date} ${month} ${year}`;
      dob = new Date(`${time} UTC+05:30`).toISOString();
    }

    const data = {
      uid,
      displayName: name,
      bio,
      dateOfBirth: dob || "",
      phoneNumber: mobile,
      gender
    };

    if (!valid) {
      actionNotification.showNotification({
        message: "Please enter the details.",
        type: "danger"
      });
      Object.keys(errors).map(e => {
        var err = e + "Err";
        var msg = e + "Msg";
        this.setState({
          [err]: "error",
          [msg]: errors[e]
        });
      });
      return;
    }

    service
      .post("/update-user", data)
      .then(res => {
        const session = new authSession();
        let uData = login.user;
        uData = {
          ...uData,
          ...data
        };

        loginAction.authenticate(uData);
        session.setProfile(uData);

        actionNotification.showNotification({
          message: "Details saved successfully",
          type: "success"
        });
      })
      .catch(error => {
        console.log(error);

        let data = error.response.data;
        let msg = data[Object.keys(data)[0]];
        let obj = {
          message: msg,
          type: "danger"
        };
        actionNotification.showNotification(obj);
      });
  };

  getDOB = e => {
    let data = e;
    this.setState({
      date: data.date,
      month: data.month,
      year: data.year
    });
  };

  getImageUrl = e => {
    const { loginAction } = this.props;
    const session = new authSession();
    let token = session.getToken();

    this.setState({
      photoURL: e.imgUrl
    });

    const data = {
      uid: token,
      photoURL: e.imgUrl
    };
    service
      .post("/add-user-photo", data)
      .then(res => {
        service
          .post("/user", { uid: token })
          .then(res => {
            loginAction.authenticate(res.data);
            session.setProfile(res.data);
          })
          .catch(err => {
            console.log(err);
          });
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    const {
      dob,
      bio,
      gender,
      name,
      mobile,
      email,
      emailErr,
      emailMsg
    } = this.state;

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
                          <UploadFile
                            path="images/users"
                            type="user"
                            action={e => this.getImageUrl(e)}
                          >
                            Upload Your Image
                          </UploadFile>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <form className="form" onSubmit={this.handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="name">Full name</label>
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      aria-label="name"
                      placeholder="Your name"
                      value={name}
                      onChange={this.handleChange}
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
                      value={bio}
                      onChange={this.handleChange}
                    ></textarea>
                  </div>

                  <div className="form-group">
                    <label htmlFor="date of birth">
                      <b>Date of birth</b>
                    </label>
                    <div className="calendar">
                      <CalendarSelect dob={dob} action={e => this.getDOB(e)} />
                    </div>
                  </div>

                  <h2>Private Information</h2>
                  <div className="form-group">
                    <label htmlFor="gender">Mobile</label>
                    <input
                      type="tel"
                      name="mobile"
                      className="form-control"
                      aria-label="mobile"
                      maxLength="10"
                      placeholder="Mobile"
                      value={mobile}
                      onChange={this.handleChange}
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
                      value={gender}
                      onChange={this.handleChange}
                    >
                      <option>Select</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="hidden">Prefer not to say</option>
                    </select>
                  </div>
                  <div className={`form-group ${emailErr}`}>
                    <label htmlFor="gender">Email</label>
                    <input
                      type="text"
                      name="email"
                      className="form-control"
                      aria-label="email"
                      placeholder="Email"
                      value={email}
                      onChange={this.handleChange}
                      disabled="disabled"
                    />
                    <small className="form-text">{emailMsg}</small>
                  </div>
                  <div className="action">
                    <Button
                      type="submit"
                      text="Save"
                      variant="btn-primary"
                      size="btn-lg"
                    />
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

const mapDispatchToProps = dispatch => ({
  actionNotification: bindActionCreators(actionNotifications, dispatch),
  loginAction: bindActionCreators(loginActions, dispatch)
});

export default connect(
  state => state,
  mapDispatchToProps
)(userAuth(PersonalInfo));
