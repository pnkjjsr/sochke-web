import React, { Component, Fragment } from 'react'
import { connect } from "react-redux"
import Link from 'next/link'

import './style.scss'

class AccountNav extends Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  render() {
    return (
      <Fragment>
        <nav className="nav-account">
          <ul>
            <li>
              <Link href="/constituency">
                <a>
                  <i>icon</i>
                  <label htmlFor="Constituency">Constituency</label>
                </a>
              </Link>
            </li>
            <li>
              <Link href="/account">
                <a>
                  <i>
                    icon
                  </i>
                  <label htmlFor="Account">Account</label>
                </a>
              </Link>
            </li>
            <li>
              <Link href="/personal-info">
                <a>
                  <i>icon</i>
                  <label htmlFor="Personal info">Personal info</label>
                </a>
              </Link>
            </li>
            <li>
              <Link href="data-personalisation">
                <a>
                  <i>icon</i>
                  <label htmlFor="Data &amp; personalisation">Data &amp; personalisation</label>
                </a>
              </Link>
            </li>
            <li>
              <Link href="">
                <a>
                  <i>icon</i>
                  <label htmlFor="Security">Security</label>
                </a>
              </Link>
            </li>
          </ul>
        </nav>

      </Fragment>
    )
  }
}

export default connect(state => state)(AccountNav);