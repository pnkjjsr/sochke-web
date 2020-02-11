import React, { Component, Fragment } from "react";
import Link from "next/link";

import { service } from "apiConnect";
import authSession from "utils/authSession";

import Photo from "components/Photo";
import Button from "components/Form/Button";

import "./style.scss";

class ComponentCongratMinister extends Component {
  constructor(props) {
    super(props);
    this.state = {
      actionView: 0,
      minister: props.data
    };
  }

  handleBelieve = e => {
    const { minister } = this.state;
    const session = new authSession();
    const profile = session.getProfile();

    const data = {
      createdAt: new Date().toISOString(),
      uid: profile.id,
      mid: minister.id,
      believe: e,
      userName: profile.userName,
      displayName: profile.displayName,
      photoURL: profile.photoURL
    };

    service
      .post("/minister-connection", data)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });

    if (e) this.setState({ actionView: 1 });
    else this.setState({ actionView: 0 });
  };
  renderAction = () => {
    const { actionView } = this.state;
    if (!actionView) {
      return (
        <Button
          text="I believe"
          variant="btn-success"
          size="btn-sm"
          action={e => this.handleBelieve(true)}
        />
      );
    } else {
      return (
        <Button
          text="Rethink"
          variant="btn-danger"
          size="btn-sm"
          action={e => this.handleBelieve(false)}
        />
      );
    }
  };

  render() {
    const mainClass = "congratMinister";
    const { minister } = this.state;
    return (
      <Fragment>
        <div className={mainClass}>
          <h6 className={`${mainClass}__heading`}>Your New MLA</h6>

          <Photo src={minister.photoUrl} />

          <div className={`${mainClass}__name`}>
            <Link href={`/minister/${minister.userName}`}>
              <a>{minister.name}</a>
            </Link>
          </div>
          <div className={`${mainClass}__party`}>{minister.party}</div>
          {/* <div className={`${mainClass}__party`}>{this.renderAction()}</div> */}
        </div>
      </Fragment>
    );
  }
}

export default ComponentCongratMinister;
