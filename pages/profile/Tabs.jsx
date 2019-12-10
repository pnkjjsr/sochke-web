import React, { Component, Fragment } from "react";

class TabsProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Fragment>
        <div className="tabs">
          <ul>
            <li>Responds</li>
            <li>Contributions</li>
            <li>Media</li>
            <li>Belivers</li>
            <li>Leaders</li>
          </ul>
        </div>
      </Fragment>
    );
  }
}

export default TabsProfile;
