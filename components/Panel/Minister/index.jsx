import React, { Component, Fragment } from "react";
import Link from "next/link";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import homeActions from "pages/index/action";

import stringModifier from "utils/stringModifier";

import PhotoPanel from "../Photo";

import "./style.scss";

class PanelMinister extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.title,
      type: this.props.type,
      data: ""
    };
  }

  static getDerivedStateFromProps(props, state) {
    const { type } = state;
    const { home } = props;

    switch (type) {
      case "pm":
        return { data: home.pms };
      case "cm":
        return { data: home.cms };
      case "mp":
        return { data: home.mps };
      case "mla":
        return { data: home.mlas };
      case "councillor":
        return { data: home.councillors };
      default:
        return null;
    }
  }

  componentDidMount() {
    const { homeAction } = this.props;
    homeAction.prefetchHomeData();
  }

  loopMinister = () => {
    const { title, data } = this.state;
    const string = new stringModifier();

    return data.map(minister => {
      if (minister.winner == true) {
        let assets = string.currencyFormat(minister.assets, "long");
        let edu = string.tillFirstCommaString(minister.education);
        return (
          <div key={minister.id} className="panel-minister">
            <Link href={`/minister/${minister.userName}`}>
              <a>
                <div className="row">
                  <div className="col-3 col-lg-12">
                    <div className="photo">
                      <PhotoPanel />
                    </div>
                  </div>
                  <div className="col-9 col-lg-12">
                    <div className="heading">
                      <label htmlFor="ministerName">{title}</label>
                      <h3 className="title" name="ministerName">
                        {minister.name}
                      </h3>
                    </div>

                    <div className="details">
                      <ul>
                        <li>
                          <i className="material-icons">flag</i>
                          <label htmlFor="party">
                            <b>{minister.party}</b>
                          </label>
                        </li>
                        <li>
                          <i className="material-icons">money</i>
                          <label htmlFor="assets">{assets}</label>
                        </li>
                        <li>
                          <i className="material-icons">menu_book</i>
                          <label htmlFor="education">{edu}</label>
                        </li>
                        <li>
                          <i className="material-icons">home</i>
                          <label htmlFor="address">
                            {minister.address}, {minister.state}-
                            {minister.pincode}
                          </label>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </a>
            </Link>
          </div>
        );
      }
    });
  };

  render() {
    return this.loopMinister();
  }
}

const mapDispatchToProps = dispatch => ({
  homeAction: bindActionCreators(homeActions, dispatch)
});
export default connect(state => state, mapDispatchToProps)(PanelMinister);
