import React, { Component, Fragment } from "react";
import Link from "next/link";
import { connect } from "react-redux";

import stringModifier from "utils/stringModifier";

import Photo from "components/Photo";

import "./style.scss";

class PanelMinister extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.title,
      type: this.props.type,
      minister: this.props.data
    };
  }

  loopMinister = () => {
    const { title, minister } = this.state;
    const string = new stringModifier();

    let assets = string.currencyFormat(minister.assets, "long");
    let edu = string.tillFirstCommaString(minister.education);
    return (
      <div key={minister.id} className="panel-minister">
        <Link href={`/minister/${minister.userName}`}>
          <a>
            <div className="row">
              <div className="col-3 col-lg-12">
                <div className="photo">
                  <Photo src={minister.photoUrl} />
                </div>
              </div>
              <div className="col-9 col-lg-12">
                <div className="heading">
                  <label htmlFor="ministerName">{minister.type}</label>
                  <h3 className="title" name="ministerName">
                    {minister.name}
                  </h3>
                </div>

                <div className="details">
                  <ul>
                    <li>
                      <i className="material-icons">flag</i>
                      <label htmlFor="party">
                        <small>{minister.partyShort}</small> -{" "}
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
                        {minister.address}, {minister.state}-{minister.pincode}
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
  };

  render() {
    return this.loopMinister();
  }
}

export default connect(state => state)(PanelMinister);
