import React, { Component, Fragment } from "react";

import authSession from "utils/authSession";
import { service } from "apiConnect";

import Button from "components/Form/Button";

import "./style.scss";

class ViewContribution extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contributions: props.data.contributions,
      contributionVoted: props.data.contributionVoted,

      isUpdate: 0
    };
  }

  handleVote = (cid, vote) => {
    const { isUpdate } = this.state;
    const session = new authSession();
    const token = session.getToken();
    let data = {
      createdAt: new Date().toISOString(),
      uid: token,
      cid: cid,
      vote: vote
    };

    service
      .post("/vote-contribution", data)
      .then(() => {
        this.setState({
          isUpdate: isUpdate + 1
        });
      })
      .catch();
  };

  handleAdd = () => {
    const { actionWriteView } = this.props;
    actionWriteView();
  };

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
                <Button
                  text="&#10004;"
                  variant="btn-success"
                  action={() => this.handleVote(contribute.id, true)}
                />
                <Button
                  text="&#10010;"
                  variant="btn-light"
                  action={this.handleAdd}
                />
                <Button
                  text="&#10008;"
                  variant="btn-danger"
                  action={() => this.handleVote(contribute.id, false)}
                />
              </div>
            </div>
          </div>
        );
      }
    });
  };

  render() {
    const { isUpdate } = this.state;
    // console.log(isUpdate);

    return this.loopContribution();
  }
}

export default ViewContribution;
