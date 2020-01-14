import React, { Fragment, Component } from "react";
import Link from "next/link";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import homeActions from "pages/index/action";

import authSession from "utils/authSession";

import DrawerPage from "components/DrawerPage";
import Contribution from "components/Contribution";
import Poll from "components/Panel/Poll";
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
    const {
      view,
      contributionDrawer,
      pollDrawer,
      constituencyDrawer
    } = this.state;
    const { homeAction } = this.props;
    let viewClass = !view ? "d-none" : "d-block";

    return (
      <Fragment>
        <div className={`bottomNav ${viewClass}`} role="main">
          <ul className="links">
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
                <Poll type="state" />
              </DrawerPage>
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
                <div className="p-3">
                  <PanelMinister title="MCD Councillor" type="councillor" />
                  <PanelMinister title="MLA" type="mla" />
                  <PanelMinister title="MP" type="mp" />
                  <PanelMinister title="CM" type="cm" />
                  <PanelMinister title="PM" type="pm" />
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
