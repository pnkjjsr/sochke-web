import React, { Component, Fragment } from "react";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import accountActions from "pages/account/actions";

import Storage from "utils/firestoreStorage";
import ImageModifier from "utils/imageModifier";

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
    const modifier = new ImageModifier();
    let file = e.target.files[0];

    if (
      file.type == "image/jpeg" ||
      file.type == "image/gif" ||
      file.type == "image/png"
    ) {
      modifier
        .resize(file, 200)
        .then(async res => {
          storage
            .uploadImage(path, res)
            .then(res => {
              action(res);
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(err => {
          console.log(err);
        });
    }
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
