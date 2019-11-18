import React, { Component, Fragment } from "react";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import accountActions from "pages/account/actions";

import Storage from "utils/firestoreStorage";

import "./style.scss";

class UploadFile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      path: props.path,
      type: props.type,
      action: props.action
    };
  }

  handleUpload = e => {
    const { path, action } = this.state;
    const storage = new Storage();
    let file = e.target.files[0];

    storage
      .uploadImage(path, file)
      .then(res => {
        action(res);
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <Fragment>
        <div className="upload-file">
          <input type="file" onChange={this.handleUpload} />
        </div>
        {this.props.children}
      </Fragment>
    );
  }
}
const mapDispatchToProps = dispatch => ({
  accountAction: bindActionCreators(accountActions, dispatch)
});

export default connect(state => state, mapDispatchToProps)(UploadFile);
