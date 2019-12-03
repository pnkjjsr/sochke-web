import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import "./style.scss";

export class CandidateList extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <Fragment>
        <div className="candidate-list">
          <h2 className="title">MLA, Candidates</h2>

          <ul>
            <li>
              <a>
                <div className="candidate">
                  <span>AAP</span>
                  <label htmlFor="Jagdeep Singh">Jagdeep Singh</label>
                  {/* <i class="material-icons">arrow_drop_down</i> */}
                </div>
              </a>
            </li>

            <li>
              <a>
                <div className="candidate">
                  <span>BJP</span>
                  <label htmlFor="Jagdeep Singh">Avtar Singh Hit</label>
                  {/* <i class="material-icons">arrow_drop_down</i> */}
                </div>
              </a>
            </li>

            <li>
              <a>
                <div className="candidate">
                  <span>INC</span>
                  <label htmlFor="Jagdeep Singh">Chander Parkash</label>
                  {/* <i class="material-icons">arrow_drop_down</i> */}
                </div>
              </a>
            </li>
          </ul>
        </div>
      </Fragment>
    );
  }
}

const mapDispatchToProps = {};

export default connect(state => state, mapDispatchToProps)(CandidateList);
