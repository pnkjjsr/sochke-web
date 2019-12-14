import React, { Fragment, Component } from "react";
import Link from "next/link";

import DrawerPage from "components/DrawerPage";

import "./style.scss";

class BottomNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contributionDrawer: ""
    };
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

  render() {
    const { contributionDrawer } = this.state;
    return (
      <Fragment>
        <div className="bottomNav" role="main">
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

export default BottomNav;
