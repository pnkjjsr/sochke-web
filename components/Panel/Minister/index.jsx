import React, { Component, Fragment } from "react";
import Link from "next/link";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ministerActions from "./actions";

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
    let i;
    let size = props.minister[type].length;

    for (i = 0; i <= size; i++) {
      let mData = props.minister[type][i];

      if (mData && (mData.winner = true)) {
        return {
          data: mData
        };
      }
    }

    return true;
  }

  componentDidMount() {
    const { type } = this.state;
    const { ministerAction } = this.props;
    ministerAction.prefetchData(type);
  }

  render() {
    const { type, title, data } = this.state;
    const string = new stringModifier();
    let minister = data;
    let assets = string.currencyFormat(minister.assets, "long");
    let edu = string.tillFirstCommaString(minister.education);

    if (!minister) {
      return <div>Loading</div>;
    } else {
      return (
        <Fragment>
          <div className="panel-minister">
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
        </Fragment>
      );
    }
  }
}

const mapDispatchToProps = dispatch => ({
  ministerAction: bindActionCreators(ministerActions, dispatch)
});
export default connect(state => state, mapDispatchToProps)(PanelMinister);
