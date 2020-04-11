// utils/withAuth.js - a HOC for protected pages
import React, { Component } from "react";
import Router from "next/router";

import authSession from "./authSession";

import PageLoader from "components/Loader/page";

export default function withAuth(AuthComponent) {
  const Auth = new authSession();
  return class Authenticated extends Component {
    constructor(props) {
      super(props);
      this.state = {
        isLoading: true
      };
    }

    componentDidMount() {
      let path = Router.pathname;

      if (!Auth.loggedIn()) {
        if (screen.width <= 768) {
          if (path == "/register") {
            return Router.push("/register");
          }
          return Router.push("/mobile/welcome");
        }
        Router.push("/register");
      } else {
        this.setState({ isLoading: false });
      }
    }

    render() {
      return (
        <div>
          {this.state.isLoading ? (
            <PageLoader />
          ) : (
            <AuthComponent {...this.props} auth={Auth} />
          )}
        </div>
      );
    }
  };
}
