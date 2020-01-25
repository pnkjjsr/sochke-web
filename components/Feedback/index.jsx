import React, { Component, Fragment } from "react";
import Router from "next/router";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import actionNotifications from "components/Notification/actions";

import { service } from "apiConnect";

import Button from "components/Form/Button";

import validation from "./validation";
import "./style.scss";

class feedback extends Component {
  constructor(props) {
    super(props);
    this.state = {
      path: "",
      type: "",
      typeMsg: "",
      typeErr: "",
      title: "",
      titleMsg: "",
      titleErr: "",
      describe: "",
      describeMsg: "",
      describeErr: ""
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

  handleSubmit = e => {
    e.preventDefault();
    const { path, type, title, describe } = this.state;
    const { actionNotification } = this.props;

    const { valid, errors } = validation({ type, title, describe });

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

    const data = {
      path: path,
      type: type,
      title: title,
      describe: describe
    };

    service
      .post("/post-feedback", data)
      .then(res => {
        this.setState({
          type: "",
          title: "",
          describe: ""
        });
        let obj = {
          message: "Feedback send succesfully",
          type: "success"
        };
        actionNotification.showNotification(obj);
      })
      .catch(err => {
        let obj = {
          message: err.msg,
          type: "danger"
        };
        actionNotification.showNotification(obj);
      });
  };

  componentDidMount() {
    const path = Router.router.pathname;
    this.setState({
      path: path
    });
  }

  render() {
    const mainClass = "feedback_component";
    const {
      type,
      typeMsg,
      typeErr,
      title,
      titleMsg,
      titleErr,
      describe,
      describeMsg,
      describeErr
    } = this.state;
    return (
      <Fragment>
        <div className={mainClass}>
          <form onSubmit={this.handleSubmit} autoComplete="off">
            <div className="form">
              <div className="header">
                <h2 className="heading">Feedback</h2>
                <div className="sub">Please describe your feedback</div>
              </div>

              <div className={`form-group ${typeErr}`}>
                <label htmlFor="type">Type</label>
                <select
                  className="form-control"
                  name="type"
                  aria-label="type"
                  value={type}
                  onChange={this.handleChange}
                >
                  <option value="">select</option>
                  <option value="design">Design</option>
                  <option value="function">Functionality</option>
                  <option value="respond">Respond</option>
                  <option value="contribution">Contribution</option>
                  <option value="Current_feature">Current feature</option>
                  <option value="new_feature">New feature</option>
                  <option value="other">Other</option>
                </select>
                <small className="form-text">{typeMsg}</small>
              </div>

              <div className={`form-group ${titleErr}`}>
                <label htmlFor="title">Title</label>
                <input
                  className="form-control"
                  name="title"
                  type="text"
                  aria-label="title"
                  placeholder="your feedback heading"
                  value={title}
                  onChange={this.handleChange}
                />
                <small className="form-text">{titleMsg}</small>
              </div>

              <div className={`form-group ${describeErr}`}>
                <label htmlFor="describe">Your feedback</label>
                <textarea
                  className="form-control text-area"
                  name="describe"
                  aria-label="describe"
                  placeholder="detail description of your feedback"
                  value={describe}
                  onChange={this.handleChange}
                ></textarea>
                <small className="form-text">{describeMsg}</small>
              </div>

              <div className="form-action mt-4">
                <Button
                  type="submit"
                  text="Submit"
                  variant="btn-primary"
                  action=""
                />
              </div>
            </div>
          </form>
        </div>
      </Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  actionNotification: bindActionCreators(actionNotifications, dispatch)
});

export default connect(state => state, mapDispatchToProps)(feedback);
