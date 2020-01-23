import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ministerActions from "./action";

import { service } from "apiConnect";
import stringModifier from "utils/stringModifier";
import authSession from "utils/authSession";

import Button from "components/Form/Button";
import CandidateList from "components/List/CandidateList";
import CandidateWinner from "components/Panel/CandidateWinner";
import PageLoader from "components/Loader/page";
import Photo from "components/Photo";

import "./style.scss";

class Minister extends Component {
  static async getInitialProps({ query }) {
    let queryName = query.userName;
    return { queryName };
  }

  constructor(props) {
    super(props);
    this.state = {
      view: 0,
      actionView: 0,
      query: props.queryName,
      minister: {},
      ministers: {}
    };
  }

  static getDerivedStateFromProps(props, state) {
    const { minister } = props;

    if (!minister.id) {
      return null;
    } else {
      return {
        view: 1,
        minister: props.minister
      };
    }
  }

  componentDidMount() {
    const { query } = this.state;
    const { ministerAction } = this.props;
    const session = new authSession();
    const profile = session.getProfile();
    const data = {
      ministerUserName: query,
      constituency: profile.constituency,
      district: profile.district,
      state: profile.state
    };
    ministerAction.prefetchMinisterData(data);
  }

  handleBelieve = e => {
    const { minister } = this.state;
    const session = new authSession();
    const profile = session.getProfile();

    const data = {
      createdAt: new Date().toISOString(),
      uid: profile.id,
      mid: minister.id,
      believe: e,
      userName: profile.userName,
      displayName: profile.displayName,
      photoURL: profile.photoURL
    };
    service
      .post("/minister-connection", data)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });

    if (e) this.setState({ actionView: 1 });
    else this.setState({ actionView: 0 });
  };

  renderAction = () => {
    const { actionView } = this.state;
    if (!actionView) {
      return (
        <Button
          text="I believe"
          variant="btn-success"
          action={e => this.handleBelieve(true)}
        />
      );
    } else {
      return (
        <Button
          text="Rethink"
          variant="btn-danger"
          action={e => this.handleBelieve(false)}
        />
      );
    }
  };

  renderMinister = () => {
    const mainClass = "minister";
    const { minister } = this.state;
    const string = new stringModifier();
    let assets = string.currencyFormat(minister.assets);
    let assetsCompact = string.currencyFormatCompact(minister.assets);
    let liabilities = string.currencyFormat(minister.liabilities);
    let liabilitiesCompact = string.currencyFormatCompact(minister.liabilities);
    let edu = string.tillFirstCommaString(minister.education);
    let type = minister.type.toLowerCase();
    let winner = minister.winner ? "Winner" : "Didn't Win";

    return (
      <Fragment>
        <div className={`container ${mainClass}`}>
          <div className="row">
            <div className="col-12 col-md-9">
              {/* Top User Details */}
              <div className={`${mainClass}__top`}>
                <div className="photo">
                  <Photo src={minister.photoUrl} />
                </div>

                <div className="details">
                  <h1>{minister.name}</h1>
                  <div className="type">
                    {type} <span>({winner})</span>
                  </div>

                  <div className="action">{this.renderAction()}</div>
                </div>
              </div>

              <div className={`${mainClass}__pointer`}>
                <ul>
                  <li>
                    <i className="material-icons">map</i>
                    <label htmlFor="party">
                      <b>{minister.constituency} - Constituency</b>
                      <span>{minister.state}</span>
                    </label>
                  </li>
                  <li>
                    <i className="material-icons">access_time</i>
                    <label htmlFor="party">
                      <b>{minister.year} - Election</b>
                      <span>{type}</span>
                    </label>
                  </li>
                  <li>
                    <i className="material-icons">flag</i>
                    <label htmlFor="party">
                      <b>{minister.party}</b>
                      <span>{minister.partyShort}</span>
                    </label>
                  </li>
                  <li>
                    <i className="material-icons">gavel</i>
                    <label htmlFor="assets">
                      <b>{minister.cases}</b> case(s)
                    </label>
                  </li>
                  <li>
                    <i className="material-icons">money</i>
                    <label htmlFor="assets">
                      <b>{assetsCompact} ~ Assets</b>
                      <span>{assets}</span>
                    </label>
                  </li>
                  <li>
                    <i className="material-icons">money</i>
                    <label htmlFor="assets">
                      <b>{liabilitiesCompact} ~ Liabilities</b>
                      <span>{liabilities}</span>
                    </label>
                  </li>

                  <li>
                    <i className="material-icons">portrait</i>
                    <label htmlFor="address">{minister.age} - Age</label>
                  </li>
                  <li>
                    <i className="material-icons">menu_book</i>
                    <label htmlFor="education">
                      <b>{edu} - Education</b>,{" "}
                      <span>{minister.education}</span>
                    </label>
                  </li>
                  <li>
                    <i className="material-icons">home</i>
                    <label htmlFor="address">
                      <b>{minister.pincode} - Address</b>

                      <span>
                        {minister.address}, {minister.state} -{" "}
                        {minister.pincode}
                      </span>
                    </label>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-12 d-none d-md-block col-md-3">
              {/* <div className="panel">
                <h2 className="panel__title">Rate, {minister.name}</h2>
                <div className="panel-container">
                  <CandidateWinner type="cm" data={minister} />
                </div>
              </div> */}

              <CandidateList type={minister.type} data={minister.ministers} />
            </div>
          </div>

          <div className={`container disclaimer ${mainClass}__disclaimer`}>
            <p>
              Disclaimer: This information is an archive of the candidate's
              self-declared affidavit that was filed during the elections. The
              current status of this information may be different. For the
              latest available information, please refer to the affidavit filed
              by the candidate to the Election Commission in the most recent
              election.
            </p>
          </div>
        </div>
      </Fragment>
    );
  };

  render() {
    const { view } = this.state;

    if (view == 0) {
      return <PageLoader />;
    } else {
      return this.renderMinister();
    }
  }
}

const mapDispatchToProps = dispatch => ({
  ministerAction: bindActionCreators(ministerActions, dispatch)
});

export default connect(state => state, mapDispatchToProps)(Minister);
