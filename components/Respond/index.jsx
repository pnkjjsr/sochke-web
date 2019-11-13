import React, { Component, Fragment } from "react";

import AuthSession from "utils/authSession";
import { service } from "apiConnect";

import Button from "components/Form/Button";

import iconPhoto from "icons/photo.svg";

import "./style.scss";

class Respond extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uid: "",
      type: "",
      respond: "",
      image: ""
    };
  }

  handleChange = e => {
    const { image } = this.state;

    let elm = e.target.name;
    if (!image) {
      this.setState({
        [elm]: e.target.value,
        type: "text"
      });
    } else {
      this.setState({
        [elm]: e.target.value,
        type: "image"
      });
    }
  };

  handleSubmit = () => {
    const { uid, type, respond } = this.state;
    let data = {
      uid: uid,
      type: type,
      respond: respond
    };
    console.log(data);

    service
      .post("/add-respond", data)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  };
  componentDidMount() {
    const session = new AuthSession();
    let token = session.getToken();
    this.setState({
      uid: token
    });
  }

  render() {
    return (
      <Fragment>
        <div className="respond">
          <form>
            <div className="row">
              <div className="col-12 col-sm-9 col-md-10 col-lg-9">
                <div className="top">
                  <figure className="user d-none d-sm-block">
                    <img src="" alt="" />
                  </figure>
                  <textarea
                    className="line-height"
                    name="respond"
                    placeholder="Let burst your thoughts"
                    onChange={this.handleChange}
                  ></textarea>
                </div>
                <div className="bottom">
                  <figure>
                    <img src={iconPhoto} alt="Upload Photo" />
                  </figure>
                  <span>Add Image</span>
                </div>
              </div>
              <div className="col-12 col-sm-3 col-md-2 col-lg-3 d-flex align-items-center justify-content-end">
                <div className="actions">
                  <Button
                    text="Respond"
                    variant="btn-light"
                    type="button"
                    action={this.handleSubmit}
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </Fragment>
    );
  }
}
export default Respond;
