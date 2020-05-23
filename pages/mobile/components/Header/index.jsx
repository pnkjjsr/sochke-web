import React, { Component } from "react";
import Link from "next/link";
import Router from "next/router";

import Button from "components/Form/Button";
import Drawer from "components/Drawer";
import MobileNav from "components/Nav/Mobile";

import "./style.scss";

export default class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      openDrawer: "",
    };
  }

  handleOpen = (e) => {
    let name = `${e}Drawer`;
    this.setState({
      [name]: "open",
    });
  };

  handleClose = (e) => {
    let name = `${e}Drawer`;
    this.setState({
      [name]: "",
    });
  };

  handleNeta = () => {
    Router.push("/neta/narendra-modi");
  };

  render() {
    const mainClass = "component_header";
    const { openDrawer } = this.state;
    return (
      <header className={mainClass}>
        <div className={`${mainClass}__top`}>
          <div className="navigation">
            <i
              className="material-icons"
              onClick={(e) => this.handleOpen("open")}
            >
              menu
            </i>
            <Drawer
              side="left"
              open={openDrawer}
              action={(e) => this.handleClose("open")}
            >
              <MobileNav />
            </Drawer>
          </div>

          <div className="action">
            <Button
              text="Vote Neta"
              variant="btn-sm btn-outline-primary"
              action={this.handleNeta}
            />
          </div>
        </div>

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
