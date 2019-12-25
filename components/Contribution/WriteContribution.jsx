import React, { Component, Fragment } from "react";
import UploadFile from "components/UploadFile";

import "./style.scss";

export default class WriteContribution extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      discription: "",
      photo: ""
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
    console.log(e);
  };

  render() {
    const { title, description } = this.state;
    return (
      <Fragment>
        <div className="contribution">
          <div className="photo">
            {/* <img src="/static/images/default-image.jpg" alt="" /> */}
          </div>

          <div className="contribution-box">
            <h1 className="title">
              <input
                className="form-control"
                type="text"
                name={title}
                placeholder="Title of your contribution"
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

            <p className="para">
              <textarea
                className="form-control"
                name={description}
                placeholder="Describe your contribution."
                value=""
              ></textarea>

              <small className="note">
                Contribution, is a valuable feature. And people in your area can
                vote on your contri. User can contribute 1 contribution per day.
                Use this feature wisely to raise the real problems in you area.
              </small>
            </p>

            <div className="action">
              <button className="btn btn-primary">Contribute</button>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}
