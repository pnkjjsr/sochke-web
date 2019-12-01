import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import Button from "components/Form/Button";

import "./style.scss";

export class PanelChoice extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <Fragment>
        <div className="panel-choice">
          <h2 className="title">Your Counstituency</h2>

          <div className="photo">
            <figure>
              <i className="material-icons">account_circle</i>
              {/* <img src="" alt="" /> */}
            </figure>
            <figcaption>Defending Minister</figcaption>
          </div>

          <div className="party">
            <i className="material-icons">flag</i>
            <label htmlFor="party">Aam Aadmi Party</label>
          </div>

          <div className="name">Jageep Singh</div>

          <div className="tenure">Last 5 Year</div>

          <div className="action">
            <Button text="Good" variant="btn-danger" />
            <Button text="Bad" variant="btn-success" />
          </div>
        </div>

        {/* Action Penal */}
        <div className="panel-choice">
          <h2 className="title">Circulate, on my page</h2>
          <div className="action">
            <Button text="Circulate" variant="btn-primary" size="btn-sm" />
            <Button text="Cancel" variant="btn-light" size="btn-sm" />
          </div>
        </div>

        {/* Result */}
        <div className="panel-choice">
          <div className="result">
            <div className="top">
              <figure>
                <i class="material-icons">account_circle</i>
              </figure>

              <div className="details">
                Jagdeep Singh
                <span>
                  <i class="material-icons">flag</i>
                  Aam Aadmi Party
                </span>
              </div>
            </div>

            <div className="bottom">
              <small>Hari Nagar, Voice</small>
              <br />
              <b className="success">95%,</b> people found him amazing.
              <br />
              <b className="error">5%,</b> people not found him good.
            </div>
          </div>
        </div>

        {/* Opinion panel */}
        <div className="panel-choice">
          <h2 className="title">Your opinion?</h2>

          <ul className="minister-list">
            <li>
              <div className="minister-item">
                <a className="hover" href="">
                  <ul>
                    <li>
                      <div className="feature">
                        <i></i>
                        <span>
                          <b>03</b>
                          <br />
                          Cases
                        </span>
                      </div>
                    </li>
                    <li>
                      <div className="feature">
                        <i></i>
                        <span>
                          <b>1.85 crore</b>
                          <br />
                          Assets
                        </span>
                      </div>
                    </li>
                  </ul>
                  <div className="link">Click to select</div>
                </a>

                <figure>
                  <i class="material-icons">account_circle</i>
                </figure>
                <div className="details">
                  Jagdeep Singh
                  <span>
                    <i class="material-icons">flag</i>
                    Aam Aadmi Party
                  </span>
                </div>
              </div>
            </li>
            <li>
              <div className="minister-item">
                <a className="hover" href="">
                  <ul>
                    <li>
                      <div className="feature">
                        <i></i>
                        <span>
                          <b>03</b>
                          <br />
                          Cases
                        </span>
                      </div>
                    </li>
                    <li>
                      <div className="feature">
                        <i></i>
                        <span>
                          <b>1.85 crore</b>
                          <br />
                          Assets
                        </span>
                      </div>
                    </li>
                  </ul>
                  <div className="link">Click to select</div>
                </a>

                <figure>
                  <i class="material-icons">account_circle</i>
                </figure>
                <div className="details">
                  Jagdeep Singh
                  <span>
                    <i class="material-icons">flag</i>
                    Aam Aadmi Party
                  </span>
                </div>
              </div>
            </li>
            <li>
              <div className="minister-item">
                <a className="hover" href="">
                  <ul>
                    <li>
                      <div className="feature">
                        <i></i>
                        <span>
                          <b>03</b>
                          <br />
                          Cases
                        </span>
                      </div>
                    </li>
                    <li>
                      <div className="feature">
                        <i></i>
                        <span>
                          <b>1.85 crore</b>
                          <br />
                          Assets
                        </span>
                      </div>
                    </li>
                  </ul>
                  <div className="link">Click to select</div>
                </a>

                <figure>
                  <i class="material-icons">account_circle</i>
                </figure>
                <div className="details">
                  Jagdeep Singh
                  <span>
                    <i class="material-icons">flag</i>
                    Aam Aadmi Party
                  </span>
                </div>
              </div>
            </li>
          </ul>
        </div>

        {/* Delhi Poll */}
        <div className="panel-choice poll">
          <h2 className="title">Delhi want change?</h2>

          <p>Pollution issue should be primary Agenda to solve.</p>

          <div className="action">
            <Button text="Yes" variant="btn-primary" size="btn-sm" />
            <Button text="No" variant="btn-danger" size="btn-sm" />
          </div>
        </div>

        {/* Area Poll */}
        <div className="panel-choice poll">
          <h2 className="title">Hari Nagar, has?</h2>

          <p>Road on near my house is in best condition?</p>

          <div className="action">
            <Button text="Yes" variant="btn-primary" size="btn-sm" />
            <Button text="No" variant="btn-danger" size="btn-sm" />
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(PanelChoice);
