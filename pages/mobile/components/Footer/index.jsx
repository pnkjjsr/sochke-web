import React, { Component } from "react";
import Link from "next/link";
import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";

import "./style.scss";

export default class Footer extends Component {
  render() {
    const mainClass = "footer";
    return (
      <footer className={mainClass}>
        <div className="copy">© 2019 Sochke</div>
        <div className="social">
          <Link href="https://www.facebook.com/sochkeApp">
            <a className="facebook" target="_blank">
              <FaFacebookF />
            </a>
          </Link>
          <Link href="https://www.twitter.com/sochkeApp">
            <a className="twitter" target="_blank">
              <FaTwitter />
            </a>
          </Link>
          <Link href="https://www.linkedin.com/company/sochke">
            <a className="linkedin" target="_blank">
              <FaLinkedinIn />
            </a>
          </Link>
        </div>
      </footer>
    );
  }
}
