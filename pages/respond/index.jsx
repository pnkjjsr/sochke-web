import React, { Component, Fragment } from "react";
import Router from "next/router";
import { connect } from "react-redux";

import userAuth from "utils/userAuth";

import Loader from "components/Loader/page";
import RespondItem from "components/RespondItem";

import "./style.scss";

class Respond extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 0
    };
  }

  static getDerivedStateFromProps(props, state) {
    let respond = Router.query;
    if (!respond.id) {
      Router.push("/");
      return null;
    }

    return {
      view: 1
    };
  }

  renderRespond = () => {
    const { view } = this.state;
    const respond = Router.query;

    if (view == 0) {
      return <Loader />;
    } else {
      return <RespondItem respond={respond} />;
    }
  };

  render() {
    return (
      <Fragment>
        <div className="container respond">
          <div className="row">
            <div className="col-lg-2 col-xl-2 d-none d-xl-block">Left</div>
            <div className="col-lg-9 col-xl-7">{this.renderRespond()}</div>
            <div className="col-lg-3 col-xl-3 d-none d-lg-block">Right</div>
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(userAuth(Respond));
