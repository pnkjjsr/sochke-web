import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import { service } from "apiConnect";

import OpinionItem from "../OpinionItem";

import "./style.scss";

export class OpinionList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      opinionObj: {}
    };
  }

  componentDidMount() {
    const { respond } = this.props;
    if (respond.id) {
      let data = {
        rid: respond.id
      };

      service
        .post("/opinion", data)
        .then(res => {
          this.setState({
            opinionObj: res.data
          });
        })
        .catch(err => {
          console.log(err);
        });
    }
  }

  render() {
    const { opinionObj } = this.state;
    let item = Object.values(opinionObj).map(opinion => {
      return <OpinionItem key={opinion.id} data={opinion} />;
    });

    return (
      <Fragment>
        <div className="opinion-list">{item}</div>
      </Fragment>
    );
  }
}

const mapDispatchToProps = {};

export default connect(state => state, mapDispatchToProps)(OpinionList);
