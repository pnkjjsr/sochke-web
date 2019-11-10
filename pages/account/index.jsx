import React, { Component, Fragment, } from "react";

import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import accountActions from "./actions"

import userAuth from 'utils/userAuth'

import Main from './account'

import "./style.scss";

class Account extends Component {
  constructor(props) {
    super(props)
    this.state = {
      view: 0
    }
  }

  render() {
    return <Main />
  }
}

const mapDispatchToProps = dispatch => ({
  accountAction: bindActionCreators(accountActions, dispatch)
})

export default connect(state => state, mapDispatchToProps)(userAuth(Account));