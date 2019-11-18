import React, { Component, Fragment } from 'react'
import Link from 'next/link'
import { connect } from "react-redux";
import authSession from 'utils/authSession'
import Storage from "utils/firestoreStorage"
import './style.scss'

class Nav extends Component {
  constructor(props) {
    super(props)

    this.state = {
      admin: props.user.profile.userType,
      nav: "",
      anime: "",
      imgUsr: ""
    }

    this.handleOpenNav = this.handleOpenNav.bind(this);
    this.handleCloseNav = this.handleCloseNav.bind(this);
  }

  handleOpenNav = () => {
    this.setState({
      nav: "active"
    });
  }
  handleCloseNav = () => {
    this.setState({
      nav: ""
    });
  }
  renderUser(e) {
    const { imgUsr } = this.state;
    let user = !imgUsr ? 'icon' : (<img src={imgUsr} alt="user profile image" />);

    return (
      <div className={`user ${e}`} onClick={this.handleOpenNav}>
        <figure>
          {user}
        </figure>
      </div>
    )
  }
  async componentDidMount() {
    const auth = new authSession;
    const profile = await auth.getProfile()

    this.setState({
      imgUsr: profile.photoURL
    });
  }

  render() {
    const { nav, anime } = this.state;
    const { action } = this.props;

    return (
      <Fragment>
        <div className={`nav ${nav}`}>
          {this.renderUser()}

          <nav onClick={this.handleCloseNav}>
            <ul className={anime}>
              <li>
                {this.renderUser('inside')}
              </li>

              <li>
                <Link href="/account">
                  <a>Account</a>
                </Link>
              </li>
              <li>
                <Link href="/">
                  <a onClick={action}>Logout</a>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </Fragment>
    )
  }
}

export default connect(state => state)(Nav);