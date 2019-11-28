import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import { service } from "apiConnect";

import Button from "components/Form/Button";
import OpinionItem from "components/Opinion/OpinionItem";

import "./style.scss";

export class OpinionBox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      opinion: "",
      opinionErr: "",
      opinionMsg: "",
      btnClass: "btn-light",
      btnAction: this.handleBlankRespond
    };
  }

  handleChange = e => {
    let len = e.target.value;
    let elem = e.target.name;
    let err = elem + "Err";
    let msg = elem + "Msg";

    this.setState({
      [elem]: e.target.value,
      [err]: "",
      [msg]: ""
    });

    if (!len.length) {
      this.setState({
        btnClass: "btn-light",
        btnAction: this.handleBlankRespond
      });
    } else {
      this.setState({
        btnClass: "btn-primary",
        btnAction: this.handleRespond
      });
    }
  };

  handleRespond = () => {
    const { opinion } = this.state;
    const { respond } = this.props;
    let data = {
      rid: respond.id,
      uid: respond.uid,
      opinion: opinion
    };

    service
      .post("/add-opinion", data)
      .then(res => {
        this.setState({
          opinion: ""
        });

        let odata = {
          rid: data.rid
        };
        service
          .post("/opinion", odata)
          .then(res => {
            console.log(res.data);
          })
          .catch(err => {
            console.log(res);
          });
      })
      .catch(err => {
        console.log(err);
      });
  };

  handleBlankRespond = () => {
    this.setState({
      opinionErr: "error",
      opinionMsg: "write your opinion."
    });
  };

  render() {
    const { opinionErr, opinionMsg, btnClass, btnAction } = this.state;
    return (
      <Fragment>
        <div className="opinion-box">
          <div className="box form">
            {/* <figure>
              <UserImage />
            </figure> */}

            <div className={`form-group ${opinionErr}`}>
              <textarea
                className="form-control"
                name="opinion"
                aria-label="email"
                placeholder="Write your opinion"
                onChange={this.handleChange}
              ></textarea>
            </div>
          </div>
          <div className="action">
            <Button text="Respond" variant={btnClass} action={btnAction} />
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapDispatchToProps = {};

export default connect(state => state, mapDispatchToProps)(OpinionBox);
