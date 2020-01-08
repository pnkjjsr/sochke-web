import React, { Fragment, Component } from "react";
import Link from "next/link";

import Buttons from "./Buttons";

import "./style.scss";

const images = {
  logo:
    "https://firebasestorage.googleapis.com/v0/b/sochke-dev.appspot.com/o/cdn%2Fglobal%2Flogo.svg?alt=media&token=c15ffc04-2485-4047-a3f0-16f6509bda70"
};

class HeaderOpen extends Component {
  render() {
    return (
      <Fragment>
        <div className="header" role="main">
          <div className="container">
            <div className="row">
              <div className="col-5 col-sm-6 pl-0 pr-0">
                <div className="logo">
                  <Link href="/">
                    <a>
                      <img src={images.logo} alt="sochke" />
                    </a>
                  </Link>
                </div>
              </div>
              <div className="col-7 col-sm-6 pr-0 text-right">
                <Buttons />
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default HeaderOpen;
