import React, { Component, Fragment } from "react";
import { FaInfoCircle } from "react-icons/fa";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ministerActions from "./action";

import PageLoader from "components/Loader/page";
import Button from "components/Form/Button";

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
        photoDisplay: props.minister.photoDisplay,
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

  handleDescShow = () => {
    this.setState({
      classDesc: "show",
    });
  };

  handleDescHide = () => {
    this.setState({
      classDesc: "hide",
    });
  };

  render() {
    const mainClass = "neta";
    const { name, photoDisplay, party, type, classDesc } = this.state;

    if (!name) {
      return <PageLoader />;
    } else {
      return (
        <Fragment>
          <div className={mainClass}>
            <div className={`${mainClass}__item`}>
              <figure className="image">
                <img src={photoDisplay} alt="" />
              </figure>

              <div className={`desc ${classDesc}`}>
                <div className="hide" onClick={this.handleDescHide}>
                  <span className="material-icons">cancel</span>
                </div>
                PJ
              </div>

              <div className="bot">
                <FaInfoCircle className="info" onClick={this.handleDescShow} />

                <div className="detail">
                  <p>{name}</p>
                </div>
              </div>
            </div>

            <div className={`${mainClass}__action`}>
              <Button
                text="I Believe"
                variant="btn-success"
                // action={(e) => this.handleVote(contribute.id, "agree")}
              />
              <Button
                text="I Won't"
                variant="btn-danger"
                // action={(e) => this.handleVote(contribute.id, "disagree")}
              />
              <Button
                text="Pass"
                variant="btn-outline-primary"
                // action={(e) => this.handleVote(contribute.id, "pass")}
              />
            </div>

            <div className={`${mainClass}__bot`}>
              <div className="action">
                <label>
                  <small>I want say</small>
                  <br /> Neta Se
                </label>
                <div className="add" onClick={this.handleRegister}>
                  <img
                    src="https://firebasestorage.googleapis.com/v0/b/sochke-web.appspot.com/o/cdn%2Fintro%2Fadd.gif?alt=media"
                    alt="Add Contribute"
                  />
                </div>
              </div>
            </div>
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
