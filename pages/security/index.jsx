import React, { Component, Fragment } from "react";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import notificationActions from "components/Notification/actions";

import { service } from "apiConnect";
import authSession from "utils/authSession";
import authentication from "utils/authentication";

import AccountNav from "components/Nav/Account";
import Button from "components/Form/Button";

import validation from "./validation";
import "./style.scss";

export class Security extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPassword: "",
      currentPasswordErr: "",
      currentPasswordMsg: "",
      newPassword: "",
      newPasswordErr: "",
      newPasswordMsg: "",
      confirmPassword: "",
      confirmPasswordErr: "",
      confirmPasswordMsg: "",
      inputState: "disabled"
    };
  }

  handleChange = e => {
    let elem = e.target.name;
    let err = elem + "Err";
    let msg = elem + "Msg";

    this.setState(
      {
        [elem]: e.target.value,
        [err]: "",
        [msg]: ""
      },
      () => this.state
    );
  };

  handleBlur = e => {
    const { notificationAction } = this.props;

    const session = new authSession();
    const token = session.getToken();
    let currentPassword = e.target.value;

    let data = {
      uid: token,
      password: currentPassword
    };

    service
      .post("verify-password", data)
      .then(res => {
        let obj = {};
        console.log(res);
        if (res.data.code == "password/not-match") {
          this.setState({
            currentPassword: ""
          });
          obj = {
            message: res.data.message,
            type: "danger"
          };
          notificationAction.showNotification(obj);
        } else {
          this.setState({
            inputState: ""
          });
        }
      })
      .catch(error => {
        let data = error.response.data;
        let msg = data[Object.keys(data)[0]];
        let obj = {
          message: msg,
          type: "danger"
        };
        notificationAction.showNotification(obj);
      });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { currentPassword, newPassword, confirmPassword } = this.state;
    const { notificationAction } = this.props;

    const { valid, errors } = validation({
      currentPassword,
      newPassword,
      confirmPassword
    });

    if (!valid) {
      let obj = {
        message: "Please enter the details.",
        type: "danger"
      };
      notificationAction.showNotification(obj);

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

    if (newPassword != confirmPassword) {
      let obj = {
        message: "Confirm password not match.",
        type: "danger"
      };
      return notificationAction.showNotification(obj);
    } else {
      const auth = new authentication();
      auth
        .updatePassword(newPassword)
        .then(res => {
          if (res.code == "auth/requires-recent-login") {
            let obj = {
              message: "Please re-login for reset password.",
              type: "danger"
            };
            return notificationAction.showNotification(obj);
          } else {
            console.log(res);
            let obj = {
              message: "Password changed successfully",
              type: "success"
            };
            return notificationAction.showNotification(obj);
          }
        })
        .catch(err => console.log(err));
    }
  };

  render() {
    const {
      currentPassword,
      currentPasswordErr,
      currentPasswordMsg,
      newPasswordMsg,
      newPasswordErr,
      confirmPasswordErr,
      confirmPasswordMsg,
      inputState
    } = this.state;
    return (
      <Fragment>
        <div className="container">
          <div className="row">
            <div className="col-lg-3 d-none d-lg-block pt-5">
              <AccountNav />
            </div>
            <div className="col-lg-9">
              <div className="security">
                <h1>Change your password</h1>

                <form
                  className="form"
                  onSubmit={this.handleSubmit}
                  autoComplete="false"
                >
                  <div className={`form-group ${currentPasswordErr}`}>
                    <label htmlFor="currentPassword">Current password</label>
                    <input
                      type="password"
                      className={`form-control`}
                      name="currentPassword"
                      aria-describedby="currentPassword"
                      placeholder="Current password"
                      autoComplete="false"
                      onBlur={this.handleBlur}
                      onChange={this.handleChange}
                      value={currentPassword}
                    />
                    <small className="form-text">{currentPasswordMsg}</small>
                  </div>

                  <div className={`form-group ${newPasswordErr}`}>
                    <label htmlFor="newPassword">New password</label>
                    <input
                      type="password"
                      className={`form-control`}
                      name="newPassword"
                      aria-describedby="newPassword"
                      placeholder="New password"
                      autoComplete="false"
                      disabled={inputState}
                      onChange={this.handleChange}
                    />
                    <small className="form-text">{newPasswordMsg}</small>
                  </div>
                  <div className={`form-group ${confirmPasswordErr}`}>
                    <label htmlFor="confirmPassword">
                      Confirm new password
                    </label>
                    <input
                      type="password"
                      className={`form-control`}
                      name="confirmPassword"
                      aria-describedby="confirmPassword"
                      placeholder="Confirm new password"
                      autoComplete="false"
                      onChange={this.handleChange}
                      disabled={inputState}
                    />
                    <small className="form-text">{confirmPasswordMsg}</small>
                  </div>

                  <div className="action">
                    <Button
                      text="Submit"
                      type="submit"
                      variant="btn-primary"
                      size="btn-lg"
                      className="btn btn-primary"
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
  notificationAction: bindActionCreators(notificationActions, dispatch)
});

export default connect(state => state, mapDispatchToProps)(Security);
