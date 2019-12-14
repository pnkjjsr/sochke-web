import React, { Fragment, Component } from "react";
import Link from "next/link";

import "./style.scss";

class BottomNav extends Component {
  render() {
    return (
      <Fragment>
        <div className="bottomNav" role="main">
          <ul className="links">
            <li>
              <Link href="/">
                <a>
                  <i class="material-icons">home</i>
                </a>
              </Link>
            </li>

            <li>
              <Link href="/">
                <a>
                  <i class="material-icons">group_work</i>
                </a>
              </Link>
            </li>
          </ul>
        </div>
      </Fragment>
    );
  }
}

export default BottomNav;
