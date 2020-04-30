import React, { Fragment, Component } from "react";
import publicIp from "public-ip";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import layoutActions from "./actions";

import { service } from "apiConnect";
import authSession from "utils/authSession";

import Head from "./head";
import Header from "./Header";
import BottomNav from "./BottomNav";
import FeedbackLink from "./FeedbackLink";
import GlobalNotification from "./GlobalNotification";
import Footer from "./Footer";

import "./style.scss";

class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      isMobile: false,
      userIP: "",
      user: false,
      authtoken: props.authtoken,
    };
  }

  componentDidMount() {
    const { login } = this.props;
    const session = new authSession();
    let user = session.getProfile();
    let token = session.getToken();
    let ip = session.getIP();
    session.setIP();

    this.setState({
      userIP: ip,
      user: user.userType,
      loggedIn: user.uid ? true : false,
      isMobile: screen.width <= 992 ? true : false,
    });

    if (!ip) {
      (async () => {
        let ip = await publicIp.v4();
        let data = {
          ip: ip,
        };
        service
          .post("/userCounter-add", data)
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
      })();
    }

    // Counter

    if (login.token || token) this.setState({ loggedIn: true });
    else this.setState({ loggedIn: false });
  }

  componentDidUpdate(prevProps, prevState) {
    const { login } = this.props;
    const session = new authSession();
    let token = session.getToken();

    if (prevProps.login.token != login.token) {
      if (login.token || token) this.setState({ loggedIn: true });
      else this.setState({ loggedIn: false });
    }
  }
  handleGlobalSearch = () => {
    const { layoutAction } = this.props;

    layoutAction.hideSearch();
  };

  render() {
    const { loggedIn, isMobile } = this.state;
    const { pageTitle } = this.props;
    let mobile = false;
    if (
      pageTitle == "/mobile/welcome" ||
      pageTitle == "/mobile/contribute" ||
      pageTitle == "/mobile/register" ||
      pageTitle == "/mobile/completed"
    )
      mobile = true;

    return (
      <Fragment>
        <Head pageTitle={this.props.pageTitle} />
        {mobile ? "" : <Header />}

        <div onClick={this.handleGlobalSearch}>
          <div className="main">{this.props.children}</div>
          <FeedbackLink />

          {loggedIn ? <GlobalNotification /> : ""}

          {!isMobile ? <Footer /> : loggedIn ? <BottomNav /> : ""}
        </div>
      </Fragment>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  layoutAction: bindActionCreators(layoutActions, dispatch),
});

export default connect((state) => state, mapDispatchToProps)(Layout);
