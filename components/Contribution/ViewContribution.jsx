import React, { Component, Fragment } from "react";

import Button from "components/Form/Button";

import "./style.scss";

class ViewContribution extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contributions: props.data.contributions,
      contributionVoted: props.data.contributionVoted
    };
  }

  loopContribution = () => {
    const { contributions, contributionVoted } = this.state;
    return contributions.map(contribute => {
      let isArrContain = contributionVoted.includes(contribute.id);

      if (!isArrContain) {
        return (
          <div key={contribute.id} className="contribution">
            <div className="photo">
              <img src={contribute.imgUrl} alt="" />
            </div>

            <div className="contribution_box preview">
              <h1 className="title">{contribute.title}</h1>

              <div className="para">{contribute.description}</div>
              <div className="action">
                <Button text="&#10004;" variant="btn-success" />
                <Button text="&#10010;" variant="btn-light" />
                <Button text="&#10008;" variant="btn-danger" />
              </div>
            </div>
          </div>
        );
      }
    });
  };

  render() {
    return this.loopContribution();
  }
}

export default ViewContribution;
