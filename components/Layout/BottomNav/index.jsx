import React, { Fragment, Component } from "react";
import { connect } from "react-redux";
import Link from "next/link";

import authSession from "utils/authSession";

import DrawerPage from "components/DrawerPage";

import "./style.scss";

class BottomNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 0,
      contributionDrawer: ""
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

    if (profile.uid) {
      this.setState({
        view: 1
      });
    }
  }

  render() {
    const { view, contributionDrawer } = this.state;
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
                PJ
              </DrawerPage>
            </li>
          </ul>
        </div>
      </Fragment>
    );
  }
}

export default connect(state => state)(BottomNav);
