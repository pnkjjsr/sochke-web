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
      user: false,
      authtoken: props.authtoken
    };
  }

  componentDidMount() {
    const session = new authSession();
    let user = session.getProfile();
    this.setState({
      user: user.userType
    });
  }

  render() {
    return (
      <Fragment>
        <Head title={this.props.pageTitle} />
        <Header />
        <div className="main">{this.props.children}</div>
        <BottomNav />
        <Footer />
      </Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  layoutAction: bindActionCreators(layoutActions, dispatch)
});

export default connect(state => state, mapDispatchToProps)(Layout);
