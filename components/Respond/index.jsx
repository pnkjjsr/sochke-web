import React, { Component, Fragment } from "react";

import Button from "components/Form/Button";

import "./style.scss";

class Respond extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Fragment>
        <div className="respond">
          <form>
            <div className="row">
              <div className="col-10">
                <figure className="user">
                  <img src="" alt="" />
                </figure>
                <textarea
                  className="flex-fill"
                  name="thoughts"
                  placeholder="Let burst your thoughts"
                ></textarea>
                <div className="d-flex flex-column">Add Image</div>
              </div>
              <div className="col-2 d-flex align-items-center">
                <div className="actions text-right">
                  <Button text="OutCry" variant="btn-light" type="button" />
                </div>
              </div>
            </div>
          </form>
        </div>
      </Fragment>
    );
  }
}
export default Respond;
