import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import Button from "components/Form/Button";

import "./style.scss";

export class PanelChoice extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <Fragment>
        <div className="panel-choice">
          <h2 className="title">Your Counstituency</h2>

          <div className="photo">
            <figure>
              <i class="material-icons">account_circle</i>
              {/* <img src="" alt="" /> */}
            </figure>
            <figcaption>Defending Minister</figcaption>
          </div>

          <div className="party">
            <i class="material-icons">flag</i>
            <label htmlFor="party">Aam Aadmi Party</label>
          </div>

          <div className="name">Jageep Singh</div>

          <div className="tenure">Last 5 Year</div>

          <div className="action">
            <Button text="Good" variant="btn-danger" />
            <Button text="Bad" variant="btn-success" />
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(PanelChoice);
