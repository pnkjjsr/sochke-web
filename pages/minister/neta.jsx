import React, { Component, Fragment } from "react";
import { FaInfoCircle } from "react-icons/fa";
import TextField from "@material-ui/core/TextField";
import {
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TwitterIcon,
  TwitterShareButton
} from "react-share";
import publicIp from "public-ip";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ministerActions from "./action";
import layoutActions from "components/Layout/actions";
import actionNotifications from "components/Notification/actions";

import { service } from "apiConnect";
import Moment from "utils/moment";
import authSession from "utils/authSession";
import stringModifier from "utils/stringModifier";

import PageLoader from "components/Loader/page";
import Button from "components/Form/Button";

import validation from "./validation";
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
      like: false,
      likeActive: "",
      likeCount: 0,
      shareCount: 0,
      shareUrl: "https://www.sochke.com/neta/narendra-modi",
      displaySocial: "hide",
      shareActive: "",
      commentActive: "",
      displayComment: "hide",
      displayWriteComment: "hide",
      email: "",
      displayName: "",
      comment: "",
      comments: []
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (state.name != props.minister.name) {
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
        likeCount: props.minister.likeCount,
        shareCount: props.minister.shareCount,
        commentCount: props.minister.commentCount
      };
    }
    return null;
  }

  componentDidMount() {
    const { query } = this.state;
    const { ministerAction, layoutAction } = this.props;
    const session = new authSession();
    let token = session.getToken();
    let liked = sessionStorage.getItem("netaLike");
    let getIP = sessionStorage.getItem("ip");

    if (liked == "true") this.setState({ likeActive: "active" });

    if (!token) {
      if (!getIP) {
        (async () => {
          token = await publicIp.v4();
        })();
      } else {
        token = getIP;
      }
    }
    this.setState({ userIP: token });
    ministerAction.prefetchNetaData(query);

    layoutAction.updateHead({
      title: "Sochke | Vote Your PM | Narendra Modi | Rate Neta",
      desc:ƒ
        "Sochke | SochKeApp, now you can like your PM and share your thoughts with your PM",
      keyword:
        "Sochke,SochkeApp,Prime Minister,Narendra Modi,Rate Neta,Vote Neta,Neta,Society Issues,Leaders,Politics,Political,Politician,Political Networking,Minister,Election,Vote,Citizne,Problem,Issue,Development,India,Growth,Agenda,Propganda",
      ogImage: imgAsk
    });
  }

  handleChange = e => {
    let name = e.target.name;
    let val = e.target.value;
    this.setState({
      [name]: val
    });
  };

  handleDescShow = () => {
    this.setState({
      classDesc: "show"
    });
  };

  handleDescHide = () => {
    this.setState({
      classDesc: "hide"
    });
  };

  handleVote = (id, vote) => {
    const { userIP } = this.state;

    let nData = {
      createdAt: new Date().toISOString(),
      uid: userIP,
      mid: id,
      vote: vote
    };

    service
      .post("/neta", nData)
      .then(res => {
        if (res.data.code == "vote/added") {
          setTimeout(() => {
            this.setState(
              {
                contributeActive: contributeActive + 1,
                notificationDisplay: "d-none"
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
      .catch(err => {
        console.log(err);
      });
  };

  handleShare = e => {
    if (!navigator.share) {
      return this.setState({
        shareActive: "active",
        displaySocial: e
      });
    }

    const shareData = {
      title: "Sochke | Vote Narendra Modi",
      text: "Sochke | share your though for your Prime Minister.",
      url: "https://www.sochke.com/neta/narendra-modi"
    };
    return navigator
      .share(shareData)
      .then(() => console.log("Successful share"))
      .catch(error => console.log("Error sharing", error));
  };

  handleShareCount = e => {
    const { shareCount, userIP, id } = this.state;
    const data = {
      createdAt: new Date().toISOString(),
      mid: id,
      uid: userIP,
      type: e
    };
    service
      .post("/neta-share", data)
      .then(res => {
        this.setState({
          shareCount: shareCount + 1
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  renderSocial = () => {
    const { displaySocial, shareUrl } = this.state;
    const mainClass = "neta";

    return (
      <div className={`${mainClass}__social ${displaySocial}`}>
        <div className="close" onClick={e => this.handleShare("hide")}>
          <span className="material-icons">cancel</span>
        </div>

        <div className="handles">
          <FacebookShareButton
            url={shareUrl}
            onClick={e => this.handleShareCount("facebook")}
          >
            <FacebookIcon size="40" round={true} />
          </FacebookShareButton>

          <LinkedinShareButton
            url={shareUrl}
            onClick={e => this.handleShareCount("linkedin")}
          >
            <LinkedinIcon size="40" round={true} />
          </LinkedinShareButton>

          <TwitterShareButton
            url={shareUrl}
            onClick={e => this.handleShareCount("twitter")}
          >
            <TwitterIcon size="40" round={true} />
          </TwitterShareButton>
        </div>
      </div>
    );
  };

  handleLike = () => {
    const { likeActive, likeCount, userIP, id } = this.state;
    const data = {
      createdAt: new Date().toISOString(),
      mid: id,
      uid: userIP
    };
    if (likeActive == "active") {
      data.like = false;
      service
        .post("/neta-like", data)
        .then(res => {
          console.log(res);
          sessionStorage.setItem("netaLike", false);
        })
        .catch(err => {
          console.log(err);
        });
      return this.setState({
        likeActive: "",
        likeCount: likeCount - 1
      });
    }

    data.like = true;
    service
      .post("/neta-like", data)
      .then(res => {
        console.log(res);

        sessionStorage.setItem("netaLike", true);
      })
      .catch(err => {
        console.log(err);
      });

    this.setState({
      likeActive: "active",
      likeCount: likeCount + 1
    });
  };

  handleComment = e => {
    const { commentActive, id } = this.state;
    let newState = commentActive == "" ? "active" : "";

    if (newState == "active") {
      const data = {
        params: {
          id: id
        }
      };
      service
        .get("/neta-comment", data)
        .then(res => {
          this.setState({
            comments: res.data
          });
        })
        .catch(err => {
          console.log(err);
        });
    }

    this.setState({
      commentActive: newState,
      displayComment: e
    });
  };

  handleCommentSubmit = e => {
    e.preventDefault();
    const {
      email,
      displayName,
      comment,
      userIP,
      id,
      commentCount
    } = this.state;
    const { actionNotification } = this.props;
    const { valid, errors } = validation({ email, comment, displayName });

    if (!valid) {
      return actionNotification.showNotification({
        message: "Please enter the details.",
        type: "danger"
      });
    }

    let data = {
      createdAt: new Date().toISOString(),
      uid: userIP,
      mid: id,
      email: email,
      displayName: displayName,
      comment: comment
    };

    service
      .post("/neta-comment", data)
      .then(res => {
        console.log(res);
        this.setState({
          displayWriteComment: "hide",
          email: "",
          displayName: "",
          comment: "",
          commentCount: commentCount + 1
        });

        actionNotification.showNotification({
          message: "Thank you for your valuable comment.",
          type: "success"
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  handleCommentWrite = e => {
    this.setState({
      displayWriteComment: e
    });
  };

  renderLike = () => {
    const { likeCount, likeActive } = this.state;
    return (
      <div className={likeActive} onClick={this.handleLike}>
        <span className="material-icons">favorite</span>
        <label htmlFor="favorite">{likeCount}</label>
      </div>
    );
  };

  renderComments = () => {
    const { displayComment, comments } = this.state;
    const mainClass = "neta";
    let len = comments.length;

    let renderComment = comments.map(comment => {
      const moment = new Moment();
      const time = moment.format(comment.createdAt);
      return (
        <div key={comment.id} className="comment">
          <div>
            <b>{comment.displayName}</b> {time}
          </div>
          <p>{comment.comment}</p>
        </div>
      );
    });

    return (
      <div className={`${mainClass}__comments ${displayComment}`}>
        <div className="close" onClick={e => this.handleComment("hide")}>
          <span className="material-icons">cancel</span>
        </div>
        <h2>Comments</h2>

        <div>{!len ? <PageLoader /> : renderComment}</div>
      </div>
    );
  };

  renderCommentWrite = () => {
    const { displayWriteComment, name } = this.state;
    const mainClass = "neta";

    return (
      <div className={`${mainClass}__comments ${displayWriteComment}`}>
        <div className="close" onClick={e => this.handleCommentWrite("hide")}>
          <span className="material-icons">cancel</span>
        </div>

        <h2>I want to say {name},</h2>
        <div className="form">
          <form
            className="form"
            autoComplete="off"
            onSubmit={this.handleCommentSubmit}
          >
            <TextField
              name="email"
              label="Email"
              type="email"
              InputLabelProps={{
                htmlFor: "email"
              }}
              inputProps={{
                "aria-label": "email",
                autoComplete: "off"
              }}
              variant="filled"
              onChange={this.handleChange}
            />
            <TextField
              name="displayName"
              label="Name"
              type="text"
              InputLabelProps={{
                htmlFor: "name"
              }}
              inputProps={{
                "aria-label": "name",
                autoComplete: "off"
              }}
              variant="filled"
              onChange={this.handleChange}
            />
            <TextField
              name="comment"
              label="Comment"
              type="text"
              rows="5"
              multiline
              InputLabelProps={{
                htmlFor: "comment"
              }}
              inputProps={{
                "aria-label": "comment",
                maxLength: "175",
                autoComplete: "off"
              }}
              variant="filled"
              onChange={this.handleChange}
            />

            <div className="action">
              <span>
                By clicking
                <br />
                You comment and Subscribe
              </span>
              <Button text="Add Comment" variant="btn-primary" />
            </div>
          </form>
        </div>
      </div>
    );
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
      shareCount,
      shareActive,
      commentCount,
      commentActive
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
                      <i className="material-icons">map</i>
                      <label htmlFor="constituency">
                        {constituency} - constituency
                        <br />
                        <small>{state}</small>
                      </label>
                    </li>
                    <li>
                      <i className="material-icons">access_time</i>
                      <label htmlFor="election">
                        {year} - Election
                        <br />
                        <small>{type}</small>
                      </label>
                    </li>
                    <li>
                      <i className="material-icons">flag</i>
                      <label htmlFor="party">
                        {party}
                        <br />
                        <small>{partyShort}</small>
                      </label>
                    </li>
                    <li>
                      <i className="material-icons">gavel</i>
                      <label htmlFor="cases">{cases} cases(s)</label>
                    </li>
                    <li>
                      <i className="material-icons">money</i>
                      <label htmlFor="assets">
                        {assetsCompact} ~ Assets
                        <br />
                        <small>{assetsFull}</small>
                      </label>
                    </li>
                    <li>
                      <i className="material-icons">money</i>
                      <label htmlFor="liabilities">
                        {liabilitiesCompact} ~ Liabilities
                        <br />
                        <small>{liabilitiesFull}</small>
                      </label>
                    </li>
                    <li>
                      <i className="material-icons">portrait</i>
                      <label htmlFor="age">{age} ~ Age</label>
                    </li>
                    <li>
                      <i className="material-icons">menu_book</i>
                      <label htmlFor="education">
                        {edu} - Education
                        <br />
                        <small>{education}</small>
                      </label>
                    </li>
                    <li>
                      <i className="material-icons">home</i>
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
                    {this.renderLike()}

                    <div
                      className={commentActive}
                      onClick={e => this.handleComment("show")}
                    >
                      <span className="material-icons">comment</span>
                      <label htmlFor="comment">{commentCount}</label>
                    </div>
                    <div
                      className={shareActive}
                      onClick={e => this.handleShare("show")}
                    >
                      <span className="material-icons">share</span>
                      <label htmlFor="share">{shareCount}</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className={`${mainClass}__action`}>
              <Button
                text="I Believe"
                variant="btn-success"
                action={e => this.handleVote(id, "true")}
              />
              <Button
                text="I Won't"
                variant="btn-danger"
                action={e => this.handleVote(id, "false")}
              />
              <Button
                text="Pass"
                variant="btn-outline-primary"
                action={e => this.handleVote(id, "pass")}
              />
            </div>

            <div className={`${mainClass}__bot`}>
              <div className="action">
                <label>
                  <small>I want say</small>
                  <br /> Neta Se
                </label>
                <div
                  className="add"
                  onClick={e => this.handleCommentWrite("show")}
                >
                  <img src={imgAsk} alt="Add Contribute" />
                </div>
              </div>
            </div>

            {this.renderSocial()}
            {this.renderComments()}
            {this.renderCommentWrite()}
          </div>
        </Fragment>
      );
    }
  }
}

const mapDispatchToProps = dispatch => ({
  ministerAction: bindActionCreators(ministerActions, dispatch),
  layoutAction: bindActionCreators(layoutActions, dispatch),
  actionNotification: bindActionCreators(actionNotifications, dispatch)
});

export default connect(state => state, mapDispatchToProps)(Neta);
