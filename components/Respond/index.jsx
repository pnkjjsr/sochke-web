import React, { Component, Fragment } from "react";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import respondActions from "components/RespondList/action";

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
    const { respondAction } = this.props;
    let data = {
      uid: uid,
      type: type,
      respond: respond
    };

    service
      .post("/add-respond", data)
      .then(res => {
        console.log(res);
        respondAction.prefetch(data.uid)

        this.setState({
          respond: ""
        });
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
    const { respond } = this.state;
    return (
      <Fragment>
        <div className="respond-box">
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
                    value={respond}
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
              <div className="col-12 col-sm-3 col-md-2 col-lg-3 d-flex justify-content-end align-items-center">
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
  respondAction: bindActionCreators(respondActions, dispatch)
});

export default connect(state => state, mapDispatchToProps)(Respond);
