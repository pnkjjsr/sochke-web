import React, { Component, Fragment } from "react";

import iconVote from "icons/vote.svg";
import iconOpinion from "icons/opinion.svg";
import iconCirculate from "icons/circulate.svg";
import "./style.scss";

class RespondList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Fragment>
        <div className="respond-list">
          <div className="top">
            <figure>
              <img src="" alt="" />
            </figure>
            <div className="detail">
              Pankaj Jasoria
              <span>21 October 2019</span>
            </div>
          </div>

          <div className="respond">
            When will Hari Nagar slums gonna be fix, rebuild and sanitize.
          </div>

          <div className="bottom">
            <ul className="actions">
              <li>
                <i>
                  <img src={iconVote} alt="" />
                </i>
                <span>Vote</span>
              </li>
              <li>
                <i>
                  <img src={iconOpinion} alt="" />
                </i>
                <span>Opinion</span>
              </li>
              <li>
                <i>
                  <img src={iconCirculate} alt="" />
                </i>
                <span>Circulate</span>
              </li>
            </ul>
            <div className="detail">
              Responsibility: Arvind Kejriwal - CM
              <br />
              Constituency: Hari Nagar - 110064
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}
export default RespondList;
