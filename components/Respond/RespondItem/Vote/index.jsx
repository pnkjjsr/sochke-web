import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import { service } from "apiConnect";
import authSession from "utils/authSession";

import "./style.scss";
import action from "../../../../pages/index/action";

export class VoteRespond extends Component {
  constructor(props) {
    super(props);

    this.state = {
      vote: props.voted,
      rid: "",
      uid: ""
    };
  }

  handleClick = () => {
    const { vote } = this.state;
    const { rid, action } = this.props;
    const session = new authSession();
    const token = session.getToken();

    let data = {
      rid: rid,
      uid: token
    };
    if (vote == true) {
      this.setState({
        vote: false
      });
      action(false);
    } else {
      this.setState({
        vote: true
      });
      action(true);
    }

    service
      .post("vote-respond", data)
      .then(res => {
        // console.log(res);
      })
      .catch(err => {
        // console.log(err);
      });
  };

  render() {
    const { vote } = this.state;
    let vClass = !vote || vote == "false" ? "" : "active";
    let vText = !vote || (vote == "false") == true ? "" : "d";

    return (
      <Fragment>
        <div className={`vote-respond ${vClass}`} onClick={this.handleClick}>
          <i className="material-icons">add</i>
          <span>{`Vote${vText}`}</span>
        </div>
      </Fragment>
    );
  }
}

const mapDispatchToProps = {};

export default connect(state => state, mapDispatchToProps)(VoteRespond);
