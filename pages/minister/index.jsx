import React, { Component, Fragment } from "react";
import Router from "next/router";
import Link from "next/link";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ministerActions from "./action";

import { service } from "apiConnect";
import authSession from "utils/authSession";

import Button from "components/Form/Button";
import PageLoader from "components/Loader/page";
import Photo from "components/Photo";

import "./style.scss";

class Minister extends Component {
  static async getInitialProps({ query }) {
    let queryName = query.userName;
    return { queryName };
  }

  constructor(props) {
    super(props);
    this.state = {
      query: props.queryName,
      view: 0
    };
  }

  static getDerivedStateFromProps(props, state) {
    const { ministerPage } = props;

    if (!ministerPage.id) {
      return null;
    } else {
      return {
        view: 1
      };
    }
  }

  componentDidMount() {
    const { query } = this.state;
    const { ministerAction } = this.props;
    ministerAction.prefetchMinisterData(query);
  }

  renderMinister = () => {
    const { query } = this.state;
    const { ministerPage } = this.props;

    return (
      <Fragment>
        <div className="container minister">
          {/* Top User Details */}
          <div className="top">
            <div className="photo">
              <Photo />
            </div>

            <div className="details">
              <h1>Welcome, {ministerPage.name}</h1>
              <div className="action">
                <button className="btn btn-primary">Button</button>
              </div>
              <div className="count">
                <ul>
                  <li>0 responds</li>
                  <li>0 contributions</li>
                  <li>0 Media</li>
                  <li>0 believers</li>
                  <li>0 leaders</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  };

  render() {
    const { view } = this.state;

    if (view == 0) {
      return <PageLoader />;
    } else {
      return this.renderMinister();
    }
  }
}

const mapDispatchToProps = dispatch => ({
  ministerAction: bindActionCreators(ministerActions, dispatch)
});

export default connect(state => state, mapDispatchToProps)(Minister);
