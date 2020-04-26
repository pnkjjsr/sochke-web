import React, { Component } from "react";

import "./style.scss";

export default class index extends Component {
  render() {
    const mainClass = "subscribe_component";

    return (
      <div className={mainClass}>
        <label htmlFor="title">
          <b>Subscribe for more details</b>
        </label>
        <div className="input-group">
          <input
            name="email_subscribe"
            type="text"
            className="form-control"
            placeholder="email: abc@xyz.com"
            aria-label="email_subscribe"
            aria-describedby="email_subscribe"
          />
          <div className="input-group-append">
            <button
              id="email_subscribe"
              className="btn btn-primary"
              type="button"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    );
  }
}
