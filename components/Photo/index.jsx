import React, { Component } from "react";
import PropTypes from "prop-types";

class Photo extends Component {
  static propTypes = {
    src: PropTypes.string
  };
  constructor(props) {
    super(props);
    this.state = {
      imgURL: props.src
    };
  }

  render() {
    const { imgURL } = this.state;
    let photo = imgURL ? (
      <img src={imgURL} alt="User Image" />
    ) : (
      <i className="material-icons">account_circle</i>
    );

    return <figure>{photo}</figure>;
  }
}

export default Photo;
