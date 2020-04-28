import React, { Component, Fragment } from "react";
import Router from "next/router";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import actionNotifications from "components/Notification/actions";

import { service } from "apiConnect";
import Button from "components/Form/Button";

import "./style.scss";

class subscribeComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 0,
      email_subscribe: "",
    };
  }

  handleChange = (e) => {
    e.preventDefault();
    let name = e.target.name;
    this.setState({
      [name]: e.target.value,
    });
  };

  handleSubmit = () => {
    const { email_subscribe } = this.state;

    let data = {
      email: email_subscribe,
      type: "covid",
    };
    service
      .post("/subscriber-add", data)
      .then((res) => {
        const { actionNotification } = this.props;
        sessionStorage.setItem("subscribed", "true");

        if (res.data.code == "subscriber/added") {
          return actionNotification.showNotification({
            message: "Email already subscribed.",
            type: "success",
          });
        }

        this.setState({
          view: 1,
          email_subscribe: "",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  renderForm = () => {
    const mainClass = "subscribe_component";
    const { email_subscribe } = this.state;
    return (
      <Fragment>
        <div className={mainClass}>
          <label htmlFor="title">
            <b>Subscribe for more details</b>
          </label>
          <div className="input-group">
            <input
              name="email_subscribe"
              type="email"
              className="form-control"
              value={email_subscribe}
              placeholder="email: abc@xyz.com"
              aria-label="email_subscribe"
              aria-describedby="email_subscribe"
              onChange={this.handleChange}
            />
            <div className="input-group-append">
              <Button
                text="Submit"
                type="button"
                variant="btn-primary"
                action={this.handleSubmit}
              />
            </div>
          </div>
        </div>
      </Fragment>
    );
  };

  renderThank = () => {
    const mainClass = "subscribe_component";
    return (
      <Fragment>
        <p className={`${mainClass}__thank`}>
          <b>Thank You!</b>
          <br />
          Now you'll get regular update.
        </p>
      </Fragment>
    );
  };

  render() {
    const { view } = this.state;
    return !view ? this.renderForm() : this.renderThank();
  }
}

const mapDispatchToProps = (dispatch) => ({
  actionNotification: bindActionCreators(actionNotifications, dispatch),
});

export default connect(
  (state) => state,
  mapDispatchToProps
)(subscribeComponent);
