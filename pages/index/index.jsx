import React, { Component, Fragment } from "react";

import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
// import accountActions from "./actions";

import userAuth from 'utils/userAuth'

import Respond from 'components/Respond'

import "./style.scss";

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() { }

  render() {
    return (
      <Fragment>
        <div className="home">
          <div className="container">
            <div className="row">
              <div className="col-md-2 d-none d-md-block">
                Low Level Details
              </div>
              <div className="col-md-7">
                <Respond />
              </div>
              <div className="col-md-3 d-none d-md-block">
                High Level Details
              </div>
            </div>
          </div>
        </div>

        <style jsx>{``}</style>
      </Fragment>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  // accountAction: bindActionCreators(accountActions, dispatch)
})

export default connect(state => state, mapDispatchToProps)(userAuth(Home));