import React, { Component, Fragment } from "react";
import TextField from "@material-ui/core/TextField";
import Router from "next/router";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import actionNotifications from "components/Notification/actions";

import authSession from "utils/authSession";
import { service } from "apiConnect";

import Button from "components/Form/Button";
import MapComponent from "components/Map";
import SubscribeComponent from "components/Subscribe";

import validation from "./validation";
import "./style.scss";

class Covid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displaySubscribe: "",
      displayLocation: "",
      displayOverlay: "hide",
      email: "",
      location: "",
    };
  }

  componentDidMount() {
    let subscribe = sessionStorage.getItem("subscribed");
    if (subscribe) {
      this.setState({
        displaySubscribe: "d-none",
      });
    }
  }

  handleSupport = () => {
    this.setState({
      displayOverlay: "show",
    });
  };

  handleClose = () => {
    this.setState({
      displayOverlay: "hide",
      email: "",
      location: "",
    });
  };

  handleChange = (e) => {
    let name = e.target.name;
    let val = e.target.value;
    this.setState({
      [name]: val,
    });
  };

  handleSubmitSupport = (e) => {
    e.preventDefault();
    const { email, location } = this.state;
    const { actionNotification } = this.props;
    const { valid, errors } = validation({ email, location });
    if (!valid) {
      actionNotification.showNotification({
        message: "Please enter the details.",
        type: "danger",
      });
      return;
    }

    let session = new authSession();
    let getIP = session.getIP();
    let data = {
      email: email,
      location: location,
      ip: getIP,
    };

    service
      .post("/covidLocation-add", data)
      .then((res) => {
        this.setState({
          displayOverlay: "hide",
          email: "",
          location: "",
        });

        actionNotification.showNotification({
          message: "Thank you for sharing Covid-19 location.",
          type: "success",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    const mainClass = "covid";
    const { displaySubscribe, displayLocation, displayOverlay } = this.state;
    return (
      <Fragment>
        <div className={mainClass}>
          {/* Map Component */}
          <MapComponent />

          {/* Page Content */}
          <div className={`${mainClass}__content`}>
            <div className="container">
              {/* Subscription Box */}
              <div className={`${mainClass}__subscribe ${displaySubscribe}`}>
                <SubscribeComponent />
              </div>
            </div>
          </div>

          {/* Support Covid */}
          <div className={`${mainClass}__overlay ${displayOverlay}`}>
            <div className="close" onClick={this.handleClose}>
              <span className="material-icons">cancel</span>
            </div>

            <h2>I know a Covid-19 location.</h2>
            <form
              className="form"
              autoComplete="off"
              onSubmit={this.handleSubmitSupport}
            >
              <TextField
                name="email"
                label="Email"
                type="email"
                InputLabelProps={{
                  htmlFor: "email",
                }}
                inputProps={{
                  "aria-label": "email",
                }}
                variant="filled"
                onChange={this.handleChange}
              />
              <TextField
                name="location"
                label="Full Address"
                type="text"
                InputLabelProps={{
                  htmlFor: "location",
                }}
                inputProps={{
                  "aria-label": "location",
                }}
                variant="filled"
                onChange={this.handleChange}
              />

              <div className="action">
                <span>
                  By clicking
                  <br />
                  You update and Subscribe
                </span>
                <Button text="Submit" variant="btn-primary" />
              </div>
            </form>
          </div>

          <footer className={`${mainClass}__footer`}>
            <div className="bot">
              <label>
                <small>I want to add Covid-19</small>
                <br />
                Location
              </label>
              <div className="add" onClick={this.handleSupport}>
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/sochke-web.appspot.com/o/cdn%2Fcovid%2Fsupport.gif?alt=media"
                  alt="Add Contribute"
                />
              </div>
            </div>
          </footer>
        </div>
      </Fragment>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  actionNotification: bindActionCreators(actionNotifications, dispatch),
});

export default connect((state) => state, mapDispatchToProps)(Covid);
