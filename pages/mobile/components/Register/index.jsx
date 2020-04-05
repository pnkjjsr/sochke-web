import React, { Component, Fragment } from "react";
import Link from "next/link";
import Router from "next/router";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

import base64 from "base-64";
import utf8 from "utf8";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import loginActions from "pages/login/actions";
import registerActions from "pages/register/action";
import notification from "components/Notification/actions";
import layoutActions from "components/Layout/actions";

import { service } from "apiConnect";
import authentication from "utils/authentication";
import authSession from "utils/authSession";
import validation from "pages/register/validation";

import "./style.scss";

class ComponentRegister extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      mobile: "",
      pincode: "",
      area: "",
      password: "",
      areaMsg: "",
      areaErr: "",
      pincodeMsg: "",
      pincodeErr: "",
      emailMsg: "",
      emailErr: "",
      mobileMsg: "",
      mobileErr: "",
      passwordMsg: "",
      passwordErr: "",
      showPassword: false,
    };
  }

  componentDidMount() {}

  handleClickShowPassword = () => {
    this.setState({ showPassword: true });
  };

  handleMouseDownPassword = () => {
    this.setState({ showPassword: false });
  };

  handleChange = (e) => {
    let name = e.target.name;
    let val = e.target.value;

    if (e.target.name == "pincode" && e.target.value.length == 6) {
      this.props.registerAction.get_area(e.target.value);
    }

    this.setState({
      [name]: val,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { mobile, email, pincode, area, password } = this.state;
    const { notification, loginAction } = this.props;
    const { valid, errors } = validation({
      email,
      mobile,
      pincode,
      area,
      password,
    });

    if (!valid) {
      notification.showNotification({
        code: "",
        message: "Please enter the details.",
        type: "danger",
      });
      Object.keys(errors).map((e) => {
        var err = e + "Err";
        var msg = e + "Msg";
        this.setState({
          [err]: "error",
          [msg]: errors[e],
        });
      });
      return;
    }

    const auth = new authentication();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        if (res.code) {
          notification.showNotification({
            code: res.code,
            message: res.message,
            type: "danger",
          });

          if (res.code == "auth/email-already-in-use") {
            this.setState({
              emailErr: "error",
              emailMsg: res.message,
            });
          } else if (res.code == "auth/weak-password") {
            this.setState({
              passwordErr: "error",
              passwordMsg: res.message,
            });
          }
        } else {
          const { register } = this.props;

          const session = new authSession();
          let locations = register.area;
          let token = res.user.uid;

          let data = {
            id: token,
            email: email,
            mobile: mobile,
            area: area,
            district: locations[0].district,
            division: locations[0].division,
            state: locations[0].state,
            pincode: pincode,
            country: "India",
          };

          let bytesPassword = utf8.encode(password);
          let encodedPassword = base64.encode(bytesPassword);

          let apiData = {
            uid: token,
            userType: "normal",
            email: email,
            mobile: mobile,
            password: encodedPassword,
            area: area,
            district: locations[0].district,
            division: locations[0].division,
            state: locations[0].state,
            pincode: pincode,
            country: "India",
          };
          service
            .post("/signup", apiData)
            .then((res) => {
              session.setToken(token);
              session.setProfile(res.data);
              loginAction.authenticate(data);
              auth.sendEmailVerification();
              Router.push("/constituency");
            })
            .catch(async (error) => {
              console.log(error);

              let data = error.response.data;
              let msg = data[Object.keys(data)[0]];
              let obj = {
                message: msg,
                type: "danger",
              };
              notification.showNotification(obj);
            });
        }
      })
      .catch((error) => {
        let obj = {
          message: error,
          type: "danger",
        };
        notification.showNotification(obj);
      });
  };

  render() {
    const mainClass = "component_register";
    const { password, showPassword, area } = this.state;
    const { register } = this.props;
    let locations = register.area;
    let selectOptions;
    if (locations.length > 0) {
      selectOptions = locations.map((location, key) => (
        <MenuItem key={key} value={location.area}>
          {location.area}
        </MenuItem>
      ));
    }
    return (
      <Fragment>
        <div className={mainClass}>
          <form
            className="form"
            noValidate
            autoComplete="on"
            onSubmit={this.handleSubmit}
          >
            <TextField
              name="email"
              label="Email"
              type="email"
              InputLabelProps={{
                htmlFor: "email",
              }}
              inputProps={{
                "aria-label": "email",
              }}
              variant="filled"
              onChange={this.handleChange}
            />

            <TextField
              name="mobile"
              label="Mobile"
              type="tel"
              InputLabelProps={{
                htmlFor: "mobile",
              }}
              inputProps={{
                "aria-label": "mobile",
                maxLength: "10",
              }}
              variant="filled"
              autoComplete="off"
              onChange={this.handleChange}
            />

            <div className="row">
              <div className="col pr-2">
                <TextField
                  name="pincode"
                  label="Pincode"
                  type="number"
                  InputLabelProps={{
                    htmlFor: "pincode",
                  }}
                  inputProps={{
                    "aria-label": "pincode",
                  }}
                  variant="filled"
                  autoComplete="off"
                  onChange={this.handleChange}
                />
              </div>
              <div className="col pl-2">
                <FormControl variant="filled">
                  <InputLabel htmlFor="area">Area</InputLabel>
                  <Select
                    name="area"
                    variant="filled"
                    value={area}
                    onChange={this.handleChange}
                  >
                    <MenuItem value="Area">Select Area</MenuItem>
                    {selectOptions}
                  </Select>
                </FormControl>
              </div>
            </div>

            <FormControl variant="filled">
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input
                name="password"
                type={showPassword ? "text" : "password"}
                inputProps={{
                  "aria-label": "password",
                  autoComplete: "on",
                }}
                value={password}
                onChange={this.handleChange}
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
            </FormControl>

            <div className={`${mainClass}__action`}>
              <button className="btn btn-success btn-lg" type="submit">
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

const mapDispatchToProps = (dispatch) => ({
  registerAction: bindActionCreators(registerActions, dispatch),
  loginAction: bindActionCreators(loginActions, dispatch),
  notification: bindActionCreators(notification, dispatch),
});

export default connect((state) => state, mapDispatchToProps)(ComponentRegister);
