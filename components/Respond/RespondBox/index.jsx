import React, { Component, Fragment } from "react";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import respondActions from "../RespondList/action";
import homeActions from "pages/index/action";

import { service } from "apiConnect";
import AuthSession from "utils/authSession";

import Button from "components/Form/Button";
import UploadFile from "components/UploadFile";
import UserImage from "components/UserImage";

import "./style.scss";

class RespondBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imgUsr: "",
      uid: "",
      type: "",
      respond: "",
      imgResp: ""
    };
  }

  handleChange = e => {
    let elm = e.target.name;
    this.setState({
      [elm]: e.target.value
    });
  };

  handleSubmit = () => {
    const { uid, respond, imgResp } = this.state;
    const { respondAction, homeAction } = this.props;
    const respType = imgResp ? "media" : "text";

    let data = {
      createdAt: new Date().toISOString(),
      uid: uid,
      type: respType,
      respond: respond,
      imageUrl: imgResp,
      voteCount: 0,
      opinionCount: 0
    };
    homeAction.updateRespond(data);

    this.setState({
      respond: "",
      imgResp: ""
    });

    service
      .post("/add-respond", data)
      .then(res => {
        console.log(res);
        homeAction.prefetchHomeData();
      })
      .catch(err => {
        console.log(err);
      });
  };

  getImageUrl = e => {
    const data = e.imgUrl;
    this.setState({
      imgResp: data
    });
  };

  renderAddImage = () => {
    const { imgResp } = this.state;
    let display = imgResp ? "" : "d-none";
    return (
      <Fragment>
        <div className="bottom">
          <UploadFile
            path="images/responds"
            type="respond"
            action={e => this.getImageUrl(e)}
          >
            <div className="upload">
              <figure>
                <i className="material-icons">insert_photo</i>
              </figure>
              <span>Add Image</span>
            </div>
          </UploadFile>
          <div className={`preview ${display}`}>
            <figure>
              <img src={imgResp} alt="Preview Image" />
            </figure>
          </div>
        </div>
      </Fragment>
    );
  };

  componentDidMount() {
    const session = new AuthSession();
    let profile = session.getProfile();
    this.setState({
      uid: profile.id,
      imgUsr: profile.photoURL
    });
  }

  render() {
    const { respond, imgUsr } = this.state;
    return (
      <Fragment>
        <div className="respond-box">
          <form>
            <div className="row">
              <div className="col-12 col-sm-9 col-md-10 col-lg-9">
                <div className="top">
                  <div className="user d-none d-sm-block">
                    <UserImage />
                  </div>
                  <textarea
                    name="respond"
                    placeholder="Let burst your thoughts"
                    value={respond}
                    onChange={this.handleChange}
                  ></textarea>
                </div>
                <div className="d-none d-sm-block">{this.renderAddImage()}</div>
              </div>

              <div className="col-12 col-sm-3 col-md-2 col-lg-3 d-flex flex-row justify-content-between justify-content-md-end align-items-center">
                <div className="d-sm-none">{this.renderAddImage()}</div>

                <div className="actions">
                  <Button
                    text="Respond"
                    variant="btn-primary"
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

const mapDispatchToProps = dispatch => ({
  respondAction: bindActionCreators(respondActions, dispatch),
  homeAction: bindActionCreators(homeActions, dispatch)
});

export default connect(state => state, mapDispatchToProps)(RespondBox);
