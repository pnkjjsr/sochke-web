import React, { Component, Fragment } from "react";

class TabContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Fragment>
        <div className="tab-container">
          <div className={`context-empty `}>
            <h2>
              You haven’t Responed yet
              <small>When you write a Respond, it’ll show up here.</small>
            </h2>
            <p>
              Respond is general thought of your about your area, problems,
              issue, good things and society. It can be positive or negative.
              Respond just show other people true face of the situation.
            </p>
            <div className="action">
              <button className="btn btn-lg btn-primary">Respond Now</button>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default TabContainer;
