import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import "./style.scss";

export class CalendarSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: "",
      month: "",
      year: "",
      monthArr: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ]
    };
  }

  handleChange = e => {
    const { action } = this.props;
    let elem = e.target.name;
    this.setState(
      {
        [elem]: e.target.value
      },
      () => {
        let data = {
          date: this.state.date,
          month: this.state.month,
          year: this.state.year
        };
        action(data);
      }
    );
  };

  dataLoop = e => {
    let digiCount = e.toString().length;
    let i;
    let count;

    if (digiCount == 4) {
      i = e - 100;
      count = e;
    } else {
      i = 1;
      count = e;
    }

    let arr = [];
    for (i; i <= count; i++) {
      arr.push(i);
    }
    return arr;
  };

  renderDate = e => {
    const { monthArr } = this.state;
    let dataArr = [];

    if (e == "date") {
      dataArr = this.dataLoop(31);
    }
    if (e == "month") {
      dataArr = monthArr;
    }
    if (e == "year") {
      let currentYear = new Date().getFullYear();
      dataArr = this.dataLoop(currentYear).reverse();
    }

    let options = dataArr.map((item, key) => {
      return (
        <option key={key} value={item}>
          {item}
        </option>
      );
    });

    return options;
  };

  render() {
    return (
      <Fragment>
        <div className="row calendar-select">
          <div className="col">
            <div className="form-group">
              <label htmlFor="date">Date</label>
              <select
                className="form-control"
                name="date"
                aria-label="date"
                onChange={this.handleChange}
              >
                <option value="">Select</option>
                {this.renderDate("date")}
              </select>
            </div>
          </div>

          <div className="col">
            <div className="form-group">
              <label htmlFor="month">Month</label>
              <select
                className="form-control"
                name="month"
                aria-label="month"
                onChange={this.handleChange}
              >
                <option value="">Select</option>
                {this.renderDate("month")}
              </select>
            </div>
          </div>

          <div className="col">
            <div className="form-group">
              <label htmlFor="year">Year</label>
              <select
                className="form-control"
                name="year"
                aria-label="year"
                onChange={this.handleChange}
              >
                <option value="">Select</option>
                {this.renderDate("year")}
              </select>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default connect(state => state)(CalendarSelect);
