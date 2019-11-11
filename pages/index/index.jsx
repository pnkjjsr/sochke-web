import React, { Component, Fragment } from "react";

import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
// import accountActions from "./actions";

import userAuth from 'utils/userAuth'

import Button from 'components/Form/Button'

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
                <form action="">
                  <div className="form-group">
                    <label for="thoughts">Let burst your thoughts</label>
                    <textarea className="form-control" rows="3" name="thoughts"></textarea>
                  </div>

                  <div className="actions text-right">
                    <Button text="I want" variant="btn-primary" action="" />
                  </div>
                </form>
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