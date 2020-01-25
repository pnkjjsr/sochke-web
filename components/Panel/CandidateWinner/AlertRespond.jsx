import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import { service } from "apiConnect";
import authSession from "utils/authSession";

import Button from "components/Form/Button";

import "./style.scss";

export class AlertRespond extends Component {
  constructor(props) {
    super(props);
    this.state = {
      minister: {}
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.ministerDetails) {
      return {
        minister: props.ministerDetails
      };
    }
    return null;
  }

  handleCirculate = () => {
    const { minister } = this.state;
    const { actionCirculate } = this.props;
    const session = new authSession();
    const token = session.getToken();
    const profile = session.getProfile();
    let data = {
      createdAt: new Date().toISOString(),
      uid: token,
      type: "text",
      respond: `I support ${minister.name}, ${minister.type} from ${minister.constituency}`,
      voteCount: 0,
      opinionCount: 0,
      userName: profile.userName,
      displayName: profile.displayName,
      photoURL: profile.photoURL,
      constituency: profile.constituency,
      pincode: profile.pincode
    };

    service
      .post("/add-respond", data)
      .then(res => {
        actionCirculate();
      })
      .catch(err => {
        console.log(err);
      });
  };

  handleCirculateCancel = () => {
    const { actionCancel } = this.props;
    actionCancel();
  };

  render() {
    return (
      <Fragment>
        <p>Circulate, on my page</p>
        <div className="action">
          <Button
            text="Circulate"
            variant="btn-primary"
            size="btn-sm"
            action={this.handleCirculate}
          />
          <Button
            text="Cancel"
            variant="btn-light"
            size="btn-sm"
            action={this.handleCirculateCancel}
          />
        </div>
      </Fragment>
    );
  }
}

export default connect(state => state)(AlertRespond);
