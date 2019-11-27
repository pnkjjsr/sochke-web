import React, { Component, Fragment } from "react";
import Link from "next/link";

import Router from "next/router";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import actionNotifications from "components/Notification/actions";

import authentication from "utils/authentication";
import Button from "components/Form/Button";

import { service } from "apiConnect";

import validation from "./validation";
import "./style.scss";

class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uid: "",
      email: "",
      emailErr: "",
      emailMsg: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  static async getInitialProps({ pathname }) {
    const path = pathname;
    return { path };
  }

  handleSubmit(e) {
    e.preventDefault();
    const { email } = this.state;
    const { actionNotification } = this.props;

    const auth = new authentication();

    const { valid, errors } = validation({ email });
    if (!valid) {
      actionNotification.showNotification({
        open: "",
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

    let data = {
      email: email
    };
    service.post("/registered-email", data).then(res => {
      if (res.data.code == "email/not-register") {
        actionNotification.showNotification({
          open: "",
          code: res.data.code,
          message: res.data.message,
          type: "danger"
        });

        this.setState({
          emailErr: "error",
          emailMsg: res.data.message
        });
      } else if (res.data.code == "email/register") {
        auth
          .sendPasswordResetEmail(data.email)
          .then(res => {
            console.log(res);
          })
          .catch(err => {
            console.log(err);
          });
      }
    });
  }

  handleChange(e) {
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
  }

  render() {
    const { emailErr, emailMsg } = this.state;
    return (
      <Fragment>
        <div className="login">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-12 col-sm-8 col-md-6 col-lg-4">
                <form onSubmit={this.handleSubmit} autoComplete="on">
                  <div className="form">
                    <div className="header">
                      <h1 className="heading">Forgot Password</h1>
                      <div className="sub">Recover your password !!</div>
                    </div>

                    <div className={`form-group ${emailErr}`}>
                      <label htmlFor="email">
                        Enter registered email address
                      </label>
                      <input
                        className="form-control"
                        name="email"
                        type="text"
                        aria-label="email"
                        placeholder="Email address"
                        onChange={this.handleChange}
                      />
                      <small className="form-text">{emailMsg}</small>
                    </div>

                    <div className="form-action">
                      <Button
                        text="Submit"
                        variant="btn-primary"
                        size="btn-lg"
                        type="submit"
                      />
                    </div>
                  </div>

                  <div className="form-link">
                    New to {`${process.env.domain} `}
                    <Link href="/">
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-primary"
                      >
                        Join Now
                      </button>
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <style jsx>{``}</style>
      </Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  actionNotification: bindActionCreators(actionNotifications, dispatch)
});

export default connect(state => state, mapDispatchToProps)(ForgotPassword);
