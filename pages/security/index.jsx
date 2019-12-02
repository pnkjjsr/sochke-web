import React, { Component, Fragment } from "react";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import notificationActions from "components/Notification/actions";

import { service } from "apiConnect";
import authSession from "utils/authSession";
import authentication from "utils/authentication";

import AccountNav from "components/Nav/Account";

import "./style.scss";

export class Security extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newPassword: "",
      confirmPassword: ""
    };
  }

  handleChange = e => {
    let elem = e.target.name;

    this.setState({
      [elem]: e.target.value
    });
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
          obj = {
            message: res.data.message,
            type: "info"
          };
          notificationAction.showNotification(obj);
        } else {
          // console.log(res.data.message);
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
    const { newPassword, confirmPassword } = this.state;
    const { notificationAction } = this.props;

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
        .then()
        .catch();
    }
  };

  render() {
    return (
      <Fragment>
        <div className="container personal-info">
          <div className="row">
            <div className="col-lg-3 d-none d-lg-block pt-5">
              <AccountNav />
            </div>
            <div className="col-lg-9">
              <h1>Security</h1>

              <form onSubmit={this.handleSubmit} autoComplete="false">
                <div className="form-group">
                  <label htmlFor="currentPassword">Current password</label>
                  <input
                    type="password"
                    className="form-control"
                    name="currentPassword"
                    aria-describedby="currentPassword"
                    placeholder="Current password"
                    autoComplete="false"
                    onBlur={this.handleBlur}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="newPassword">New password</label>
                  <input
                    type="password"
                    className="form-control"
                    name="newPassword"
                    aria-describedby="newPassword"
                    placeholder="New password"
                    autoComplete="false"
                    onChange={this.handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirm new password</label>
                  <input
                    type="password"
                    className="form-control"
                    name="confirmPassword"
                    aria-describedby="confirmPassword"
                    placeholder="Confirm new password"
                    autoComplete="false"
                    onChange={this.handleChange}
                  />
                </div>

                <div className="action">
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                </div>
              </form>
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
