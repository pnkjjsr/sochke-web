import React, { Fragment, Component } from "react";
import { connect } from "react-redux";
import Link from "next/link";

import authSession from "utils/authSession";

import DrawerPage from "components/DrawerPage";
import Contribution from "components/Contribution";

import "./style.scss";

class BottomNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 0,
      contributionDrawer: "open",
      pollDrawer: "",
      constituencyDrawer: ""
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.login.user.uid) {
      if (screen.width < 992) {
        return {
          view: 1
        };
      }
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
      if (profile.uid) {
        this.setState({
          view: 1
        });
      }
    }
  }

  render() {
    const {
      view,
      contributionDrawer,
      pollDrawer,
      constituencyDrawer
    } = this.state;
    let viewClass = !view ? "d-none" : "d-block";

    return (
      <Fragment>
        <div className={`bottomNav ${viewClass}`} role="main">
          <ul className="links">
            <li>
              <Link href="/">
                <a>
                  <i className="material-icons">home</i>
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
                <a>
                  <i
                    className="material-icons"
                    onClick={e => this.handleOpen("poll")}
                  >
                    poll
                  </i>
                </a>
              </Link>

              <DrawerPage
                side="left"
                open={pollDrawer}
                action={e => this.handleClose("poll")}
              >
                Poll Page
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
                </a>
              </Link>

              <DrawerPage
                side="right"
                open={constituencyDrawer}
                action={e => this.handleClose("constituency")}
              >
                Constituency Page
              </DrawerPage>
            </li>
          </ul>
        </div>
      </Fragment>
    );
  }
}

export default connect(state => state)(BottomNav);
