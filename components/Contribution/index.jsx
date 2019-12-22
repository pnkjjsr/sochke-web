import React, { Component, Fragment } from "react";

import Button from "components/Form/Button";

import "./style.scss";

export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Fragment>
        <div className="contribution">
          <div className="empty">
            <i class="material-icons">group_work</i>
            <h1 className="title">
              Write first "contribution" for your area progress.
              <small>
                "Contribution" is the way to collect right issue/problem/work in
                your area. All the member of your area can see this
                'Contriubtion' agree or disagree for the same. Highest the vote,
                highest the value of your 'Contribution'.
              </small>
            </h1>

            <Button text="Write first 'Contribution'" variant="btn-link" />
          </div>
        </div>
      </Fragment>
    );
  }
}
