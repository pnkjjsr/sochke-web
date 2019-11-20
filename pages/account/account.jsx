import React, { Component, Fragment } from "react";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import accountActions from "./actions";
import notifictionActions from "components/Notification/actions";
import loginActions from "pages/login/actions";

import authSession from "utils/authSession";
import { service } from "apiConnect";

import UploadFile from "components/UploadFile";
import UserImage from "components/UserImage";
import EditText from "components/EditText";
import AccountNav from "components/Nav/Account/index";

import "./style.scss";

class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMobile: "",
      imgUsr: "",
      state: "",
      pincode: "",
      area: ""
    };
  }

  static getDerivedStateFromProps(props) {
    if (props.account.imgUser) {
      return {
        imgUsr: props.account.imgUser
      };
    }
    return true;
  }

  handleIsMobile = () => {
    if (screen.width < 768) {
      this.setState({
        isMobile: "mobile"
      });
    }
  };

  getImageUrl = e => {
    const { loginAction } = this.props;
    const session = new authSession();
    let token = session.getToken();

    this.setState({
      imgUsr: e.imgUrl
    });

    const data = {
      uid: token,
      photoURL: e.imgUrl
    };
    service
      .post("/update-user", data)
      .then(res => {
        service
          .post("/user", { uid: token })
          .then(res => {
            loginAction.authenticate(res.data);
            session.setProfile(res.data);
          })
          .catch(err => {
            console.log(err);
          });
      })
      .catch(err => {
        console.log(err);
      });
  };

  componentDidMount() {
    this.handleIsMobile();
    const session = new authSession();
    const user = session.getProfile();

    this.setState({
      state: user.state,
      pincode: user.pincode,
      area: user.area,
      imgUsr: user.photoURL
    });
  }

  render() {
    const { isMobile, imgUsr } = this.state;
    return (
      <Fragment>
        <div className="container account">
          <div className="row">
            <div className="col-lg-3 d-none d-lg-block">
              <AccountNav />
            </div>
            <div className="col-lg-9">
              <div className="user">
                <figure className={`${isMobile}`}>
                  <div className="edit">
                    <UploadFile
                      path="images/users"
                      type="user"
                      action={e => this.getImageUrl(e)}
                    ></UploadFile>
                  </div>

                  <UserImage />

                  {/* {!imgUsr ? "Icon" : <img src={imgUsr} alt="User Image" />} */}
                </figure>
                <h2 className="title">
                  Welcome, <EditText default="Name" />
                </h2>
                <p>
                  Manage your info, privacy and security to make{" "}
                  {process.env.domain} work better for you
                </p>
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
  accountAction: bindActionCreators(accountActions, dispatch),
  notificationAction: bindActionCreators(notifictionActions, dispatch),
  loginAction: bindActionCreators(loginActions, dispatch)
});

export default connect(state => state, mapDispatchToProps)(Account);
