import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ministerActions from "./actions";

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

  static getDerivedStateFromProps(props) {
    // console.log(props.minister);

    if (props.minister) {
      return {
        data: props.minister
      };
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
    let minister = data[type];

    if (!minister) {
      return <div>Loading</div>;
    } else {
      return (
        <Fragment>
          <div className="panel-minister">
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
                      <label htmlFor="assets">Rs {minister.assets}</label>
                    </li>
                    <li>
                      <i className="material-icons">menu_book</i>
                      <label htmlFor="education">
                        {minister.education} Pass
                      </label>
                    </li>
                    <li>
                      <i className="material-icons">home</i>
                      <label htmlFor="address">
                        {minister.address}, {minister.state}-{minister.pincode}
                      </label>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
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
