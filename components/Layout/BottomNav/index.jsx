import React, { Fragment, Component } from "react";
import Link from "next/link";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import homeActions from "pages/index/action";

import authSession from "utils/authSession";

import DrawerPage from "components/DrawerPage";
import Contribution from "components/Contribution";
import Poll from "components/Panel/Poll";
import CandidateWinner from "components/Panel/CandidateWinner";
import PanelMinister from "components/Panel/Minister";

import "./style.scss";

class BottomNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 0,
      contributionDrawer: "",
      pollDrawer: "",
      constituencyDrawer: ""
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.login.user.uid) {
      return {
        view: 1
      };
    }

    return null;
  }

  handleOpen = e => {
    let name = `${e}Drawer`;
    this.setState({
      [name]: "open"
    });
  };

  handleClose = e => {
    let name = `${e}Drawer`;
    this.setState({
      [name]: ""
    });
  };

  componentDidMount() {
    const session = new authSession();
    const profile = session.getProfile();

    if (screen.width < 992) {
      if (profile.id) {
        this.setState({
          view: 1
        });
      }
    }
  }

  componentWillUnmount() {
    this.setState({
      view: 0
    });
  }

  render() {
    const mainClass = "bottomNav";
    const {
      view,
      contributionDrawer,
      pollDrawer,
      constituencyDrawer
    } = this.state;
    const { homeAction, home } = this.props;
    let viewClass = !view ? "d-none" : "d-block";

    return (
      <Fragment>
        <div className={`${mainClass} ${viewClass}`} role="main">
          <ul className={`${mainClass}__links`}>
            <li>
              <Link href="/">
                <a className="active">
                  <i className="material-icons">home</i>
                  <span>Home</span>
                </a>
              </Link>
            </li>

            <li>
              <Link href="/">
                <a>
                  <i
                    className="material-icons"
                    onClick={e => this.handleOpen("constituency")}
                  >
                    map
                  </i>
                  <span>Constituency</span>
                </a>
              </Link>

              <DrawerPage
                side="right"
                open={constituencyDrawer}
                action={e => this.handleClose("constituency")}
              >
                <div className={`${mainClass}__panel p-3`}>
                  <h3 className={`${mainClass}__title`}>Current MLA</h3>
                  <CandidateWinner type="mla" data={home.mlas} />
                </div>

                <h3 className={`${mainClass}__title`}>
                  Your constituency full profile
                </h3>
                <div className={`${mainClass}__panel-minister`}>
                  <PanelMinister title="MLA" type="mla" />
                  <PanelMinister title="MP" type="mp" />
                  <PanelMinister title="CM" type="cm" />
                  <PanelMinister title="PM" type="pm" />
                </div>
              </DrawerPage>
            </li>

            <li>
              <Link href="/">
                <a>
                  <i
                    className="material-icons"
                    onClick={e => this.handleOpen("contribution")}
                  >
                    group_work
                  </i>
                  <span>Contribution</span>
                </a>
              </Link>

              <DrawerPage
                side="right"
                open={contributionDrawer}
                action={e => this.handleClose("contribution")}
              >
                <Contribution />
              </DrawerPage>
            </li>

            <li>
              <Link href="/">
                <a onClick={homeAction.prefetchHomeData}>
                  <i
                    className="material-icons"
                    onClick={e => this.handleOpen("poll")}
                  >
                    poll
                  </i>
                  <span>Poll</span>
                </a>
              </Link>

              <DrawerPage
                side="left"
                open={pollDrawer}
                action={e => this.handleClose("poll")}
              >
                <div className={`${mainClass}__panel mt-5`}>
                  <Poll type="state" />

                  <div className="wave">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 1440 320"
                    >
                      <path
                        fill="#000088"
                        fillOpacity="1"
                        d="M0,288L60,266.7C120,245,240,203,360,186.7C480,171,600,181,720,154.7C840,128,960,64,1080,48C1200,32,1320,64,1380,80L1440,96L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
                      ></path>
                    </svg>
                  </div>
                </div>
              </DrawerPage>
            </li>
          </ul>
        </div>
      </Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  homeAction: bindActionCreators(homeActions, dispatch)
});

export default connect(state => state, mapDispatchToProps)(BottomNav);
