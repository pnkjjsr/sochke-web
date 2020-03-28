import React, { Component, Fragment } from "react";

import Link from "next/link";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

import "./style.scss";

export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "*******",
      showPassword: false
    };
  }

  handleClickShowPassword = () => {
    this.setState({ showPassword: true });
  };

  handleMouseDownPassword = event => {
    this.setState({ showPassword: false });
  };

  handleChange = e => {
    let val = e.target.value;
    this.setState({
      password: val
    });
  };

  render() {
    const mainClass = "component_register";
    const { password, showPassword } = this.state;
    return (
      <Fragment>
        <div className={mainClass}>
          <form className="form" noValidate autoComplete="off">
            <TextField label="Email" type="email" variant="filled" />

            <TextField
              variant="filled"
              autoComplete="off"
              type="tel"
              maxLength="10"
              label="Mobile"
            />

            <div className="row">
              <div className="col pr-2">
                <TextField
                  variant="filled"
                  autoComplete="off"
                  type="number"
                  maxLength="6"
                  label="Pincode"
                />
              </div>
              <div className="col pl-2">
                <Select variant="filled" value={0}>
                  <MenuItem value={0}>Area</MenuItem>
                  <MenuItem value={1}>1</MenuItem>
                  <MenuItem value={2}>2</MenuItem>
                </Select>
              </div>
            </div>

            <Input
              variant="filled"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={e => this.handleChange(e)}
              endAdornment={
                <InputAdornment position="end" autoComplete="off">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={this.handleClickShowPassword}
                    onMouseDown={this.handleMouseDownPassword}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />

            <div className={`${mainClass}__action`}>
              <button className="btn btn-success btn-lg">
                <small>I want to contribute to society</small>
                <div>Create My Account</div>
              </button>

              <div className="link">
                Already a member?{" "}
                <Link href="/login">
                  <a>Login</a>
                </Link>
              </div>
            </div>
          </form>
        </div>
      </Fragment>
    );
  }
}
