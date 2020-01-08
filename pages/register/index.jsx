import React, { Component, Fragment } from "react";
import base64 from "base-64";
import utf8 from "utf8";
import Link from "next/link";
import Router from "next/router";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import loginActions from "pages/login/actions";
import registerActions from "./action";
import notification from "components/Notification/actions";
import layoutActions from "components/Layout/actions";

import { service } from "apiConnect";

import Button from "components/Form/Button";
import authSession from "utils/authSession";
import authentication from "utils/authentication";

import validation from "./validation";

import "./style.scss";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 0,
      pincode: "",
      area: "",
      email: "",
      password: "",
      mobile: "",
      areaMsg: "",
      areaErr: "",
      pincodeMsg: "",
      emailMsg: "",
      mobileMsg: "",
      passwordMsg: "",
      pincodeErr: "",
      emailErr: "",
      passwordErr: "",
      mobileErr: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleVerification = this.handleVerification.bind(this);
  }

  static async getInitialProps({ pathname }) {
    const path = pathname;
    return { path };
  }

  static getDerivedStateFromProps(props, state) {
    const { register } = props;

    if (register.view === 1) {
      Router.push("/");
    }
    return null;
  }

  componentDidMount() {
    const { registerAction } = this.props;
    const { path, layoutAction } = this.props;

    layoutAction.update_path(path);
    registerAction.check_login();

    const data = {
      createdAt: new Date().toISOString()
    };

    // service
    //   .post("/session", data)
    //   .then(res => {
    //     console.log(res);
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
  }

  handleChange(e) {
    let elem = e.target.name;
    let err = elem + "Err";
    let msg = elem + "Msg";

    if (e.target.name == "pincode" && e.target.value.length == 6) {
      this.props.registerAction.get_area(e.target.value);
    }

    this.setState({
      [elem]: e.target.value,
      [err]: "",
      [msg]: ""
    });
  }

  async handleSubmit(e) {
    e.preventDefault();
    const { mobile, email, pincode, area, password } = this.state;
    const { notification, loginAction } = this.props;
    const { valid, errors } = validation({
      email,
      mobile,
      pincode,
      area,
      password
    });

    if (!valid) {
      notification.showNotification({
        code: "",
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

    const auth = new authentication();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(res => {
        if (res.code) {
          notification.showNotification({
            code: res.code,
            message: res.message,
            type: "danger"
          });

          if (res.code == "auth/email-already-in-use") {
            this.setState({
              emailErr: "error",
              emailMsg: res.message
            });
          } else if (res.code == "auth/weak-password") {
            this.setState({
              passwordErr: "error",
              passwordMsg: res.message
            });
          }
        } else {
          const { register } = this.props;

          const session = new authSession();
          let locations = register.area;
          let token = res.user.uid;

          let data = {
            id: token,
            email: email,
            mobile: mobile,
            area: area,
            district: locations[0].district,
            division: locations[0].division,
            state: locations[0].state,
            pincode: pincode,
            country: "India"
          };

          session.setToken(token);
          session.setProfile(data);
          auth.sendEmailVerification();
          loginAction.authenticate(data);

          let bytesPassword = utf8.encode(password);
          let encodedPassword = base64.encode(bytesPassword);

          let apiData = {
            uid: token,
            userType: "normal",
            email: email,
            mobile: mobile,
            password: encodedPassword,
            area: area,
            district: locations[0].district,
            division: locations[0].division,
            state: locations[0].state,
            pincode: pincode,
            country: "India"
          };
          service
            .post("/signup", apiData)
            .then(res => {
              session.setProfile(res.data);
              Router.push("/");
            })
            .catch(async error => {
              let data = error.response.data;
              let msg = data[Object.keys(data)[0]];
              let obj = {
                message: msg,
                type: "danger"
              };
              notification.showNotification(obj);
            });
        }
      })
      .catch(error => {
        let obj = {
          message: error,
          type: "danger"
        };
        notification.showNotification(obj);
      });
  }

  handleVerification(e) {
    e.preventDefault();
    const auth = new authentication();
    auth.sendEmailVerification();
  }

  renderHome = () => {
    return <div className="text-center">HomePage</div>;
  };

  renderRegistration() {
    const mainClass = "signup";
    const {
      areaMsg,
      areaErr,
      pincodeMsg,
      emailMsg,
      mobileMsg,
      passwordMsg,
      pincodeErr,
      emailErr,
      passwordErr,
      mobileErr
    } = this.state;
    const { register } = this.props;
    let locations = register.area;
    let selectOptions;
    if (locations.length > 0) {
      selectOptions = locations.map((location, key) => (
        <option key={key} value={location.area}>
          {location.area}
        </option>
      ));
    }

    return (
      <Fragment>
        <div className={mainClass}>
          {/* Top Banner */}
          <div className={`${mainClass}__top`}>
            <div className="container">
              <div className="row">
                <div className="col-12 col-md-6 col-lg-7">
                  {/* Top Text */}

                  <h2 className="title">
                    Welcome to your
                    <br />
                    polity network platform
                  </h2>
                </div>
                <div className="col-12 col-md-6 col-lg-5">
                  {/* Registration Form */}
                  <form autoComplete="on" onSubmit={this.handleSubmit}>
                    <div className="form">
                      <div className="header">
                        <h1 className="heading">Create your account</h1>
                        <div className="sub">One quick step for change !!</div>
                      </div>

                      <div className={`form-group ${emailErr}`}>
                        <label htmlFor="email">Email</label>
                        <input
                          className="form-control"
                          name="email"
                          type="text"
                          aria-label="email"
                          placeholder="abc@gmail.com"
                          onChange={this.handleChange}
                        />
                        <small className="form-text">{emailMsg}</small>
                      </div>

                      <div className={`form-group ${mobileErr}`}>
                        <label htmlFor="mobile">Mobile</label>
                        <input
                          className="form-control"
                          name="mobile"
                          type="tel"
                          aria-label="mobile"
                          placeholder="9210xxxx60"
                          onChange={this.handleChange}
                        />
                        <small className="form-text">{mobileMsg}</small>
                      </div>

                      <div className="row">
                        <div className="col-6 col-sm-6">
                          <div className={`form-group ${pincodeErr}`}>
                            <label htmlFor="pincode">Pincode</label>
                            <input
                              className="form-control"
                              name="pincode"
                              type="number"
                              aria-label="pincode"
                              placeholder="110064"
                              onChange={this.handleChange}
                            />
                            <small className="form-text">{pincodeMsg}</small>
                          </div>
                        </div>
                        <div className="col-6 col-sm-6">
                          <div className={`form-group ${areaErr}`}>
                            <label htmlFor="area">Area</label>
                            <select
                              className="form-control"
                              name="area"
                              aria-label="area"
                              onChange={this.handleChange}
                            >
                              <option value="">Select</option>
                              {selectOptions}
                            </select>
                            <small className="form-text">{areaMsg}</small>
                          </div>
                        </div>
                      </div>

                      <div className={`form-group ${passwordErr}`}>
                        <label htmlFor="password">Password</label>
                        <input
                          className="form-control"
                          name="password"
                          type="password"
                          aria-label="password"
                          placeholder="******"
                          autoComplete="off"
                          onChange={this.handleChange}
                        />
                        <small className="form-text">{passwordMsg}</small>
                      </div>

                      <div className="form-action mb-2">
                        <Button
                          text="Create My Account"
                          variant="btn-success"
                          size="btn-lg"
                          type="submit"
                        />
                      </div>

                      <div className="form-note">
                        By clicking Sign Up, you agree to our Terms, Data Policy
                        and Cookie Policy. You may receive SMS notifications
                        from us and can opt out at any time.
                      </div>
                    </div>

                    <div className="form-link">
                      Already a member?{" "}
                      <Link href="/login">
                        <button type="button" className="btn btn-sm btn-link">
                          Login
                        </button>
                      </Link>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>

          {/* Info Section */}
          <div className={`${mainClass}__info`}>
            <div className="container">
              <div className="row">
                <div className="col-12 col-md-8">
                  {/* Feedback */}
                  <div className={`${mainClass}__section`}>
                    <h2 className="title">Your feedback, our development!</h2>
                    <p className="para">
                      We are your developers, your feedback is our first
                      priority. We build what you want about your constituency,
                      ministers and area progress.
                    </p>

                    <div className="action">
                      <button className="btn btn-primary btn-lg">
                        Write your feedback
                      </button>
                      <button className="btn btn-link btn-sm">
                        Support Sochke
                      </button>
                    </div>
                  </div>

                  {/* About */}
                  <div className={`${mainClass}__section`}>
                    <h2 className="title">What is sochke?</h2>
                    <p className="para">
                      Sochke is social networking platform between people and
                      minister, build on user's feedback. With Sochke you will
                      get all the information about your constituency ministers.
                    </p>
                  </div>
                </div>
                <div className="col-12 col-md-4">
                  <div className={`${mainClass}__info__banner`}>
                    <figure>
                      <img
                        src="https://firebasestorage.googleapis.com/v0/b/sochke-dev.appspot.com/o/cdn%2Fregister%2Finfo.png?alt=media&token=abe3240e-0610-404f-9321-7b753482f4d0"
                        alt="Sochke Feedback"
                      />
                    </figure>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contribution */}
          <div className={`${mainClass}__bottom`}>
            <div className="container">
              <div className={`${mainClass}__section m-0`}>
                <h2 className="title">Contribute in progress of your area</h2>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }

  renderVerification = () => {
    return (
      <Fragment>
        <div>
          <form onSubmit={this.handleVerification}>
            <h1>Verification link sent on your email id.</h1>

            <div>
              <button type="submit">Send Verification link again</button>
            </div>
          </form>
          <hr />
          <p>
            By clicking on button, I'm agreed to send verification link on my
            email id.
          </p>
        </div>
      </Fragment>
    );
  };

  render() {
    return <Fragment>{this.renderRegistration()}</Fragment>;
  }
}

const mapDispatchToProps = dispatch => ({
  registerAction: bindActionCreators(registerActions, dispatch),
  loginAction: bindActionCreators(loginActions, dispatch),
  notification: bindActionCreators(notification, dispatch),
  layoutAction: bindActionCreators(layoutActions, dispatch)
});

export default connect(state => state, mapDispatchToProps)(Register);
