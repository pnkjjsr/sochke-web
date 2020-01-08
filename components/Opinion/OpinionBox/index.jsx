import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import { service } from "apiConnect";
import authSession from "utils/authSession";

import Button from "components/Form/Button";
import UserImage from "components/UserImage";

import "./style.scss";

export class OpinionBox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      uid: "",
      opinion: "",
      opinionErr: "",
      opinionMsg: "",
      btnClass: "",
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
    const { uid, opinion } = this.state;
    const { respond, action } = this.props;
    let data = {
      rid: respond.id,
      uid: uid,
      opinion: opinion
    };

    action();

    service
      .post("/add-opinion", data)
      .then(res => {
        if (res.data.code == "opinion/added") {
          this.setState({
            opinion: ""
          });
        }

        let odata = {
          rid: data.rid
        };
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
  componentDidMount() {
    const session = new authSession();
    const token = session.getToken();
    this.setState({
      uid: token
    });
  }

  render() {
    const { opinion, opinionErr, opinionMsg, btnClass, btnAction } = this.state;
    return (
      <Fragment>
        <div className="opinion-box">
          <div className="photo">
            <UserImage />
          </div>

          <div className={`form-group ${opinionErr}`}>
            <div className="input-group">
              <textarea
                className="form-control"
                name="opinion"
                aria-label="email"
                aria-describedby="button-addon2"
                placeholder="Write your opinion"
                onChange={this.handleChange}
                value={opinion}
              ></textarea>
              <div className="input-group-append">
                <Button text="Respond" variant={btnClass} action={btnAction} />
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapDispatchToProps = {};

export default connect(state => state, mapDispatchToProps)(OpinionBox);
