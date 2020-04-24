import React, { Fragment, Component } from "react";
import Link from "next/link";
import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";

import "./style.scss";

export default class Footer extends Component {
  render() {
    return (
      <Fragment>
        <div className="footer" role="main">
          <div className="container p-0">
            <div className="row">
              <div className="col">
                <ul className="links">
                  <li>
                    <Link href="/about">
                      <a>About</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/terms">
                      <a>Terms</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/privacy-policy">
                      <a>Privacy policy</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/cookies">
                      <a>Cookies</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/feedback">
                      <a>Feedback</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/covid">
                      <a>Covid-19</a>
                    </Link>
                  </li>
                </ul>

                <div className="copyright">© 2020 {process.env.domain}</div>
              </div>

              <div className="col">
                <div className="social">
                  <Link href="https://www.facebook.com/sochkeApp">
                    <a
                      className="facebook"
                      target="_blank"
                      aria-label="Sochke Facebook"
                    >
                      <FaFacebookF />
                    </a>
                  </Link>
                  <Link href="https://www.twitter.com/sochkeApp">
                    <a
                      className="twitter"
                      target="_blank"
                      aria-label="Sochke Twitter"
                    >
                      <FaTwitter />
                    </a>
                  </Link>
                  <Link href="https://www.linkedin.com/company/sochke">
                    <a
                      className="linkedin"
                      target="_blank"
                      aria-label="Sochke LinkedIn"
                    >
                      <FaLinkedinIn />
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}
