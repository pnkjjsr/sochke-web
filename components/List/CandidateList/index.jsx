import React, { Component, Fragment } from "react";
import Link from "next/link";

import stringModifier from "utils/stringModifier";

import LoaderList from "./LoaderList";

import "./style.scss";

class CandidateList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: props.type,
      title: props.title,
      ministers: [],
      view: 0
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.data) {
      return {
        ministers: props.data,
        view: props.data.length ? 1 : 0
      };
    }
    return null;
  }

  loopMinister = () => {
    const mainClass = "candidate-list";
    const { view, type, ministers } = this.state;
    const string = new stringModifier();
    let typeUpperCase = type.toUpperCase();

    if (!view) return <LoaderList />;
    else
      return ministers.map(minister => {
        if (minister.type == typeUpperCase) {
          return (
            <li key={minister.id}>
              <Link href={`/minister/${minister.userName}`}>
                <a>
                  <div className={`${mainClass}__candidate`}>
                    <span>{minister.partyShort}</span>
                    <label htmlFor="Jagdeep Singh">{minister.name}</label>
                    {/* <i className="material-icons">arrow_drop_down</i> */}
                  </div>
                </a>
              </Link>
            </li>
          );
        }
      });
  };

  render() {
    const mainClass = "candidate-list";
    const { title } = this.state;

    return (
      <Fragment>
        <div className={mainClass}>
          <h2 className={`${mainClass}__title`}>
            {title}
            <span> (s)</span>
          </h2>

          <ul>{this.loopMinister()}</ul>
        </div>
      </Fragment>
    );
  }
}

export default CandidateList;
