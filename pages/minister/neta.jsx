import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ministerActions from "./action";
import { service } from "apiConnect";

import PageLoader from "components/Loader/page";

import "./style.scss";

class Neta extends Component {
  static async getInitialProps({ query }) {
    let queryName = await query.userName;
    return { queryName };
  }

  constructor(props) {
    super(props);

    this.state = {
      query: props.queryName,
      name: "",
      testing: "",
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.minister.name) {
      return {
        year: props.minister.year,
        age: props.minister.age,
        cases: props.minister.cases,
        userName: props.minister.userName,
        type: props.minister.type,
        education: props.minister.education,
        party: props.minister.party,
        constituency: props.minister.constituency,
        partyShort: props.minister.partyShort,
        liabilities: props.minister.liabilities,
        address: props.minister.address,
        state: props.minister.state,
        photoUrl: props.minister.photoUrl,
        name: props.minister.name,
        assets: props.minister.assets,
        winner: props.minister.winner,
        pincode: props.minister.pincode,
        id: props.minister.id,
        createdAt: props.minister.createdAt,
      };
    }

    return null;
  }

  componentDidMount() {
    const { query } = this.state;
    const { ministerAction } = this.props;
    ministerAction.prefetchNetaData(query);
  }

  render() {
    const mainClass = "neta";
    const { name } = this.state;

    if (!name) {
      return <PageLoader />;
    } else {
      return (
        <Fragment>
          <div className={mainClass}>
            <div className="pj">{name}</div>
          </div>
        </Fragment>
      );
    }
  }
}

const mapDispatchToProps = (dispatch) => ({
  ministerAction: bindActionCreators(ministerActions, dispatch),
});

export default connect((state) => state, mapDispatchToProps)(Neta);
