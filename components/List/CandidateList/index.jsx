import React, { Component, Fragment } from "react";
import Link from "next/link";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import candidateActions from "./action";

import stringModifier from "utils/stringModifier";

import "./style.scss";

class CandidateList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: props.type,
      ministers: []
    };
  }

  static getDerivedStateFromProps(props, state) {
    const { candidates } = props;
    let data = candidates.ministers;

    if (data.length) {
      return { ministers: data };
    }
    return null;
  }

  componentDidMount() {
    const { type } = this.state;
    const { candidateAction } = this.props;
    candidateAction.prefetchMinister(type);
  }

  loopMinister = () => {
    const { type, ministers } = this.state;
    let typeUpperCase = type.toUpperCase();
    const string = new stringModifier();

    return ministers.map(minister => {
      if (minister.type == typeUpperCase) {
        let link = string.hyphenatedName(minister.name);
        return (
          <li key={minister.uid}>
            <Link href={`minister/${link}`}>
              <a>
                <div className="candidate">
                  <span>{minister.partyShort}</span>
                  <label htmlFor="Jagdeep Singh">{minister.name}</label>
                  {/* <i className="material-icons">arrow_drop_down</i> */}
                </div>
              </a>
            </Link>
          </li>
        );
      }
    });
  };

  render() {
    const { type } = this.state;

    return (
      <Fragment>
        <div className="candidate-list">
          <h2 className="title">
            <span>{type}</span>
          </h2>

          <ul>{this.loopMinister()}</ul>
        </div>
      </Fragment>
    );
  }
}
const mapDispatchToProps = dispatch => ({
  candidateAction: bindActionCreators(candidateActions, dispatch)
});

export default connect(state => state, mapDispatchToProps)(CandidateList);
