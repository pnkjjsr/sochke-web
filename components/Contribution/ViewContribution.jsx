import React, { Component, Fragment } from "react";

import authSession from "utils/authSession";
import { service } from "apiConnect";

import Button from "components/Form/Button";

import "./style.scss";

class ViewContribution extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contributions: props.data,

      contributeView: 0
    };
  }

  handleVote = (cid, vote) => {
    const { contributeView } = this.state;
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
          contributeView: contributeView + 1
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  handleAdd = () => {
    const { actionWriteView } = this.props;
    actionWriteView();
  };

  render() {
    const { contributions, contributeView } = this.state;
    const { actionAllDone } = this.props;

    return contributions.map((contribute, i) => {
      let activeClass = i == contributeView ? "active" : "";
      console.log(i == contributeView);

      if (i < contributeView) {
        actionAllDone();
      }

      return (
        <div key={i} className={`contribution ${activeClass}`}>
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
    });
  }
}

export default ViewContribution;
