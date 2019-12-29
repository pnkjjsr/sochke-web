import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import notificationActions from "components/Notification/actions";

import { service } from "apiConnect";
import authSession from "utils/authSession";

import UploadFile from "components/UploadFile";
import Button from "components/Form/Button";

import "./style.scss";

class WriteContribution extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      imgUrl: "",
      displayAdded: ""
    };
  }

  handleChange = e => {
    let elem = e.target.name;
    let val = e.target.value;
    this.setState({
      [elem]: val
    });
  };

  getImageUrl = e => {
    this.setState({
      imgUrl: e.imgUrl,
      displayAdded: "added"
    });
  };

  handleSubmit = () => {
    const { title, description, imgUrl } = this.state;
    const { notificationAction, actionPreviewView } = this.props;
    const session = new authSession();
    const profile = session.getProfile();

    const data = {
      createdAt: new Date().toISOString(),
      uid: profile.uid,
      constituency: profile.area,
      district: profile.district,
      state: profile.state,
      title: title,
      description: description,
      imgUrl: imgUrl
    };

    actionPreviewView();

    service
      .post("/add-contribution", data)
      .then(res => {
        this.setState({
          title: "",
          description: "",
          imgUrl: "",
          displayAdded: ""
        });

        notificationAction.showNotification({
          message: "Your contribution added.",
          type: "success"
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    const { title, description, imgUrl, displayAdded } = this.state;

    return (
      <Fragment>
        <div className="contribution">
          <div className="photo">
            <img src={imgUrl} alt="" />
          </div>

          <div className={`contribution_box ${displayAdded}`}>
            <h1 className="title">
              <input
                className="form-control"
                type="text"
                name="title"
                placeholder="Title of your contribution"
                value={title}
                onChange={this.handleChange}
              />
            </h1>

            <div className="middle">
              <UploadFile
                path="images/contributions"
                type="user"
                action={e => this.getImageUrl(e)}
              />
              <div className="icon">+</div>
              <span>add contribution's photo</span>
            </div>

            <div className="para">
              <textarea
                className="form-control"
                name="description"
                placeholder="Describe your contribution."
                value={description}
                onChange={this.handleChange}
              ></textarea>

              <small className="note">
                Contribution, is a valuable feature. And people in your area can
                vote on your contri. User can contribute 1 contribution per day.
                Use this feature wisely to raise the real problems in you area.
              </small>
            </div>

            <div className="action">
              <Button
                text="Contribute"
                variant="btn-primary"
                action={this.handleSubmit}
              />
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

export default connect(state => state, mapDispatchToProps)(WriteContribution);
