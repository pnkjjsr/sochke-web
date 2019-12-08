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
        {/* Delhi Poll */}
        <div className="choice-panel">
          <p>Pollution issue should be primary Agenda to solve.</p>

          <div className="action">
            <Button text="Yes" variant="btn-success" size="btn-sm" />
            <Button text="No" variant="btn-danger" size="btn-sm" />
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(PanelChoice);
