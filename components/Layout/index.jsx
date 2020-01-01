import React, { Fragment, Component } from "react";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import layoutActions from "./actions";

import authSession from "utils/authSession";

import Head from "./head";
import Header from "./Header";
import BottomNav from "./BottomNav";
import Footer from "./Footer";

import "./style.scss";

class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      isMobile: false,
      user: false,
      authtoken: props.authtoken
    };
  }

  componentDidMount() {
    const session = new authSession();
    let user = session.getProfile();
    this.setState({
      user: user.userType,
      loggedIn: user.uid ? true : false,
      isMobile: screen.width <= 768 ? true : false
    });
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

  render() {
    const { loggedIn, isMobile } = this.state;

    return (
      <Fragment>
        <Head title={this.props.pageTitle} />
        <Header />
        <div className="main">{this.props.children}</div>
        {!isMobile ? <Footer /> : loggedIn ? <BottomNav /> : ""}
      </Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  layoutAction: bindActionCreators(layoutActions, dispatch)
});

export default connect(state => state, mapDispatchToProps)(Layout);
