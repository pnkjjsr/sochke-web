import React, { Component, Fragment } from "react";
import { FaInfoCircle } from "react-icons/fa";
import publicIp from "public-ip";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ministerActions from "./action";

import { service } from "apiConnect";
import authSession from "utils/authSession";
import stringModifier from "utils/stringModifier";
import PageLoader from "components/Loader/page";
import Button from "components/Form/Button";

import "./style.scss";
const imgAsk =
  "https://firebasestorage.googleapis.com/v0/b/sochke-test.appspot.com/o/cdn%2Fneta%2Fask.png?alt=media";

class Neta extends Component {
  static async getInitialProps({ query }) {
    let queryName = await query.userName;
    return { queryName };
  }

  constructor(props) {
    super(props);

    this.state = {
      query: props.queryName,
      classDesc: "",
      userIP: "",
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
    const session = new authSession();
    let token = session.getToken();

    if (!token) {
      (async () => {
        token = await publicIp.v4();
        this.setState({
          userIP: token,
        });
      })();
    }
    this.setState({ userIP: token });
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

  handleVote = (id, vote) => {
    const { userIP } = this.state;

    let nData = {
      createdAt: new Date().toISOString(),
      uid: userIP,
      mid: id,
      vote: vote,
    };
    service
      .post("/neta", nData)
      .then((res) => {
        if (res.data.code == "vote/added") {
          setTimeout(() => {
            this.setState(
              {
                contributeActive: contributeActive + 1,
                notificationDisplay: "d-none",
              },
              () => {
                let len = data.length;
                if (len == this.state.contributeActive) {
                  sessionStorage.setItem("contributionTry", "all-done");
                  Router.push("/mobile/completed");
                }

                if (contributeActive == 2) {
                  Router.push("/mobile/register");
                  sessionStorage.setItem("contributionTry", "done");
                  return true;
                }
              }
            );
          }, 2000);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    const mainClass = "neta";
    const {
      name,
      photoDisplay,
      constituency,
      state,
      year,
      party,
      partyShort,
      cases,
      type,
      assets,
      liabilities,
      age,
      education,
      pincode,
      address,
      id,
      classDesc,
    } = this.state;
    let typeFull;
    if (type === "PM") typeFull = "Prime Minister";
    if (type === "CM") typeFull = "Chief Minister";

    const string = new stringModifier();
    let assetsFull = string.currencyFormat(assets);
    let assetsCompact = string.currencyFormatCompact(assets);
    let liabilitiesFull = string.currencyFormat(liabilities);
    let liabilitiesCompact = string.currencyFormatCompact(liabilities);
    let edu = string.tillFirstCommaString(education);

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

                <div className="details">
                  <h1 className="heading">
                    {name}
                    <br />
                    <small>{typeFull}</small>
                  </h1>

                  <ul className="list">
                    <li>
                      <i class="material-icons">map</i>
                      <label htmlFor="constituency">
                        {constituency} - constituency
                        <br />
                        <small>{state}</small>
                      </label>
                    </li>
                    <li>
                      <i class="material-icons">access_time</i>
                      <label htmlFor="election">
                        {year} - Election
                        <br />
                        <small>{type}</small>
                      </label>
                    </li>
                    <li>
                      <i class="material-icons">flag</i>
                      <label htmlFor="party">
                        {party}
                        <br />
                        <small>{partyShort}</small>
                      </label>
                    </li>
                    <li>
                      <i class="material-icons">gavel</i>
                      <label htmlFor="cases">{cases} cases(s)</label>
                    </li>
                    <li>
                      <i class="material-icons">money</i>
                      <label htmlFor="assets">
                        {assetsCompact} ~ Assets
                        <br />
                        <small>{assetsFull}</small>
                      </label>
                    </li>
                    <li>
                      <i class="material-icons">money</i>
                      <label htmlFor="liabilities">
                        {liabilitiesCompact} ~ Liabilities
                        <br />
                        <small>{liabilitiesFull}</small>
                      </label>
                    </li>
                    <li>
                      <i class="material-icons">portrait</i>
                      <label htmlFor="age">{age} ~ Age</label>
                    </li>
                    <li>
                      <i class="material-icons">menu_book</i>
                      <label htmlFor="education">
                        {edu} - Education
                        <br />
                        <small>{education}</small>
                      </label>
                    </li>
                    <li>
                      <i class="material-icons">home</i>
                      <label htmlFor="address">
                        {pincode} - Address
                        <br />
                        <small>
                          {address}, {state} - {pincode}
                        </small>
                      </label>
                    </li>
                    <li>
                      <div className={`disclaimer`}>
                        <p>
                          Disclaimer: This information is an archive of the
                          candidate's self-declared affidavit that was filed
                          during the elections. The current status of this
                          information may be different. For the latest available
                          information, please refer to the affidavit filed by
                          the candidate to the Election Commission in the most
                          recent election.
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bot">
                <FaInfoCircle className="info" onClick={this.handleDescShow} />

                <div className="detail">
                  <p>{name}</p>

                  <div className="feature">
                    <div>
                      <span className="material-icons">favorite</span>
                      <label htmlFor="favorite">10</label>
                    </div>
                    <div>
                      <span className="material-icons">comment</span>
                      <label htmlFor="comment">100</label>
                    </div>
                    <div>
                      <span className="material-icons">share</span>
                      <label htmlFor="share">1000</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className={`${mainClass}__action`}>
              <Button
                text="I Believe"
                variant="btn-success"
                action={(e) => this.handleVote(id, "true")}
              />
              <Button
                text="I Won't"
                variant="btn-danger"
                action={(e) => this.handleVote(id, "false")}
              />
              <Button
                text="Pass"
                variant="btn-outline-primary"
                action={(e) => this.handleVote(id, "pass")}
              />
            </div>

            <div className={`${mainClass}__bot`}>
              <div className="action">
                <label>
                  <small>I want say</small>
                  <br /> Neta Se
                </label>
                <div className="add" onClick={this.handleRegister}>
                  <img src={imgAsk} alt="Add Contribute" />
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
