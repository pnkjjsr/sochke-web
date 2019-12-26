import React, { Component, Fragment } from "react";

import "./style.scss";

class ViewContribution extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contributions: props.data[0]
    };
  }

  render() {
    const { contributions } = this.state;

    return (
      <Fragment>
        <div className="contribution">
          <div className="photo">
            <img src={contributions.imgUrl} alt="" />
          </div>

          <div className="contribution_box preview">
            <h1 className="title">{contributions.title}</h1>

            <div className="para">{contributions.description}</div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default ViewContribution;
