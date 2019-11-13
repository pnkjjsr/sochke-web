import React, { Component, Fragment } from "react";

import AuthSession from 'utils/authSession'
import { service } from 'apiConnect'

import Button from "components/Form/Button";

import "./style.scss";

class Respond extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uid: "",
      type: "",
      respond: "",
      image: "",
    };
  }

  handleChange = (e) => {
    const { image } = this.state;

    let elm = e.target.name;
    if (!image) {
      this.setState({
        [elm]: e.target.value,
        type: 'text'
      });
    } else {
      this.setState({
        [elm]: e.target.value,
        type: 'image'
      });
    }


  }

  handleSubmit = () => {
    const { uid, type, respond } = this.state;
    let data = {
      uid: uid,
      type: type,
      respond: respond
    }
    console.log(data);

    service.post('/add-respond', data).then((res) => {
      console.log(res);
    }).catch((err) => {
      console.log(err);
    });
  }
  componentDidMount() {
    const session = new AuthSession;
    let token = session.getToken();
    this.setState({
      uid: token
    });
  }

  render() {


    return (
      <Fragment>
        <div className="respond">
          <form>
            <div className="row">
              <div className="col-12">
                <div className="border-bottom mb-2">
                  <figure className="user d-none d-md-block">
                    <img src="" alt="" />
                  </figure>
                  <textarea
                    className="flex-fill"
                    name="respond"
                    placeholder="Let burst your thoughts"
                    onChange={this.handleChange}
                  ></textarea>
                </div>
                <div className="d-flex flex-column">Add Image</div>
              </div>
              <div className="col-12 d-flex align-items-center justify-content-end">
                <div className="actions text-right">
                  <Button text="Respond" variant="btn-light" type="button" action={this.handleSubmit} />
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
