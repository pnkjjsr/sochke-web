import React, { Component, Fragment } from "react";
import Router from "next/router";
import Link from "next/link";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ministerActions from "./action";

import { service } from "apiConnect";
import authSession from "utils/authSession";
import stringModifier from "utils/stringModifier";

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
      view: 0,
      query: props.queryName,
      minister: {}
    };
  }

  static getDerivedStateFromProps(props, state) {
    const { minister } = props;

    if (!minister.id) {
      return null;
    } else {
      return {
        view: 1,
        minister: minister
      };
    }
  }

  componentDidMount() {
    const { query } = this.state;
    const { ministerAction } = this.props;
    ministerAction.prefetchMinisterData(query);
  }

  renderMinister = () => {
    const { minister } = this.state;
    const string = new stringModifier();
    let assets = string.currencyFormat(minister.assets);
    let assetsCompact = string.currencyFormatCompact(minister.assets);
    let edu = string.tillFirstCommaString(minister.education);
    let type = minister.type.toLowerCase();
    let winner = minister.winner ? "Winner" : "Didn't Win";

    return (
      <Fragment>
        <div className="container minister">
          {/* Top User Details */}
          <div className="top">
            <div className="photo">
              <Photo />
            </div>

            <div className="details">
              <h1>{minister.name}</h1>
              <div className="type">
                {type} ({winner})
              </div>
              <div className="action">
                {/* <button className="btn btn-primary">Button</button> */}
              </div>
              <div className="pointer">
                <ul>
                  <li>
                    <i className="material-icons">map</i>
                    <label htmlFor="party">
                      <b>{minister.constituency} - Constituency</b>
                    </label>
                  </li>
                  <li>
                    <i className="material-icons">access_time</i>
                    <label htmlFor="party">
                      <b>{minister.year} - Election</b>
                    </label>
                  </li>
                  <li>
                    <i className="material-icons">flag</i>
                    <label htmlFor="party">
                      <b>{minister.party}</b>
                    </label>
                  </li>
                  <li>
                    <i className="material-icons">gavel</i>
                    <label htmlFor="assets">
                      <b>{minister.cases}</b> case(s)
                    </label>
                  </li>
                  <li>
                    <i className="material-icons">money</i>
                    <label htmlFor="assets">
                      <b>{assetsCompact} ~ Assets</b>
                      <br />
                      <span>{assets}</span>
                    </label>
                  </li>
                  <li>
                    <i className="material-icons">portrait</i>
                    <label htmlFor="address">{minister.age} - Age</label>
                  </li>
                  <li>
                    <i className="material-icons">menu_book</i>
                    <label htmlFor="education">
                      <b>{edu} - Education</b>,
                      <br />
                      <span>{minister.education}</span>
                    </label>
                  </li>
                  <li>
                    <i className="material-icons">home</i>
                    <label htmlFor="address">
                      <b>{minister.pincode} - Address</b>
                      <br />
                      <span>
                        {minister.address}, {minister.state} -{" "}
                        {minister.pincode}
                      </span>
                    </label>
                  </li>
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
