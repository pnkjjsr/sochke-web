import React from "react";
import App from "next/app";

import { Provider } from 'react-redux';
import withRedux from "next-redux-wrapper";
import { initStore } from "../redux/store";

import Layout from "components/Layout";
import Notification from "components/Notification"
import authSession from "utils/authSession"

class MyApp extends App {
  constructor(props) {
    super(props)
    this.state = {
      key: false
    }
  }

  render() {
    const { key } = this.state;
    const { Component, ctx, router, pageProps, store } = this.props;

    if (router.query.key == process.env.secretKey || key == true || process.env.NODE_ENV == "development") {
      return (
        <Provider store={store}>
          <Layout pageTitle="">
            <Notification />
            <Component {...pageProps} />
          </Layout>
        </Provider>
      );
    }
    else {
      return false
    }
  }
  componentDidMount() {
    const { router } = this.props;
    const session = new authSession()
    const secretKey = session.getSecretKey();

    if (router.query.key == process.env.secretKey || secretKey) {
      session.setSecretKey(true)
      this.setState({
        key: true
      });
    }

  }
}

export default withRedux(initStore, { debug: false })(MyApp);
