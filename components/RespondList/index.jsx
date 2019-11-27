import React, { Component, Fragment } from "react";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import respondActions from "./action";

import authSession from "utils/authSession";

import RespondItem from "components/RespondItem";

class RespondList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      responds: {}
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    let data = nextProps.responds.responds;
    let len = nextProps.responds.responds.length;
    if (len > 0) {
      return {
        responds: data
      };
    }

    return null;
  }

  componentDidMount() {
    const { respondAction } = this.props;
    const session = new authSession();
    const token = session.getToken();

    respondAction.prefetch(token);
  }

  render() {
    const { responds } = this.state;

    let list = Object.values(responds).map(respond => {
      return <RespondItem key={respond.id} respond={respond} />;
    });

    return list;
  }
}

const mapDispatchToProps = dispatch => ({
  respondAction: bindActionCreators(respondActions, dispatch)
});

export default connect(state => state, mapDispatchToProps)(RespondList);
