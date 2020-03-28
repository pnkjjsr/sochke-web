import React, { Component } from "react";
import Link from "next/link";

import Header from "../components/Header";
import Footer from "../components/Footer";
import RegisterComponent from "../components/Register";

import "./style.scss";

class Register extends Component {
  render() {
    const mainClass = "register";
    return (
      <div className={mainClass}>
        <div className={`${mainClass}__skip`}>
          <Link href="/register">
            <a>Skip</a>
          </Link>
        </div>
        <Header sub="Create your citizen account. Let’s build our nation 'Together'!" />

        <RegisterComponent />

        <Footer />
      </div>
    );
  }
}

export default Register;
