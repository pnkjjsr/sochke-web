import React, { Component } from "react";
import Link from "next/link";
import "./style.scss";

export default class Header extends Component {
  render() {
    const mainClass = "header";
    return (
      <header className={mainClass}>
        <div className="logo">
          <Link href="/">
            <a>{process.env.domain}</a>
          </Link>
          <span>Alpha</span>
        </div>
        <small>{this.props.sub}</small>
      </header>
    );
  }
}
