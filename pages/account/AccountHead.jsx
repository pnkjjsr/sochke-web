import React, { Component, Fragment } from "react";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import loginActions from "pages/login/actions";

import authSession from "utils/authSession";
import { service } from "apiConnect";

import UploadFile from "components/UploadFile";
import UserImage from "components/UserImage";
import EditText from "components/EditText";

import "./AccountHead.scss";

export class AccountHead extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isMobile: "",
      imgUsr: ""
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
      .post("/add-user-photo", data)
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
    const profile = session.getProfile();

    this.setState({
      imgUsr: profile.photoURL
    });
  }

  render() {
    const { isMobile } = this.state;

    return (
      <Fragment>
        <div className="AccountHead">
          <figure className={`${isMobile}`}>
            <div className="edit">
              <UploadFile
                path="images/users"
                type="user"
                action={e => this.getImageUrl(e)}
              ></UploadFile>

              <i className="material-icons">edit</i>
            </div>

            <UserImage />
          </figure>

          <h2 className="title">
            Welcome, <EditText default={"your name"} />
          </h2>
          <p>
            Manage your info, privacy and security to make {process.env.domain}{" "}
            work better for you
          </p>
        </div>
      </Fragment>
    );
  }
}
const mapDispatchToProps = dispatch => ({
  loginAction: bindActionCreators(loginActions, dispatch)
});

export default connect(state => state, mapDispatchToProps)(AccountHead);
