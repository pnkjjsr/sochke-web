import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import Link from "next/link";

import "./style.scss";
const logoImg = "/static/graphics/icon-57.png";

class MobileNav extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <Fragment>
        <nav className="nav-mobile">
          <ul>
            <li className="nav-logo">
              <Link href="/mobile/welcome">
                <a>
                  <figure>
                    <img src={logoImg} alt="Sochke Logo" />
                  </figure>
                  <figcaption>Sochke</figcaption>
                </a>
              </Link>
            </li>
            {/* <li>
              <Link href="/mobile/neta">
                <a>
                  <label htmlFor="Rate your neta">Rate your neta</label>
                </a>
              </Link>
            </li> */}
            <li>
              <Link href="/covid">
                <a>
                  <label htmlFor="Covid-19">Covid-19</label>
                </a>
              </Link>
            </li>
            <li>
              <Link href="/mobile/contribute">
                <a>
                  <label htmlFor="Validate contribution">
                    Validate contribution
                  </label>
                </a>
              </Link>
            </li>

            <li className="heading">
              <label htmlFor="Covid-19">About Us</label>
            </li>
            <li>
              <Link href="/about">
                <a>
                  <label htmlFor="Covid-19">About Us</label>
                </a>
              </Link>
            </li>
            <li>
              <Link href="/terms">
                <a>
                  <label htmlFor="Covid-19">Terms</label>
                </a>
              </Link>
            </li>
            <li>
              <Link href="/privacy-policy">
                <a>
                  <label htmlFor="Covid-19">Privacy policy</label>
                </a>
              </Link>
            </li>
            <li>
              <Link href="/cookies">
                <a>
                  <label htmlFor="Covid-19">Cookies</label>
                </a>
              </Link>
            </li>
            <li>
              <Link href="/feedback">
                <a>
                  <label htmlFor="Covid-19">Feedback</label>
                </a>
              </Link>
            </li>
          </ul>
        </nav>
      </Fragment>
    );
  }
}

export default connect((state) => state)(MobileNav);
