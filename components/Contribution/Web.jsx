import React, { Component, Fragment } from "react";

import "./style.scss";

class ContributionWeb extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: props.contribution
    };
  }

  render() {
    const { data } = this.state;
    const main = "contribution";

    let voteTotal = data.voteTrueCount + data.voteFalseCount;
    let voteTrue = data.voteTrueCount;
    let happy, sad;

    if (voteTotal == 0 && voteTrue == 0) {
      happy = 0;
      sad = 0;
    } else {
      let good = (voteTrue * 100) / voteTotal;
      let bad = 100 - good;

      happy = good.toFixed(1);
      sad = bad.toFixed(1);
    }

    return (
      <Fragment>
        <div key={data.id} className={`${main}__web`}>
          <div className="details">
            <div className="top">
              <h2 className="title">{data.title}</h2>
              <p className="desc">{data.description}</p>
            </div>

            <div className="bottom">
              <b className="good">{happy}%</b> people seen as problem
              <br />
              <b className="bad">{sad}%</b> people not think same
            </div>
          </div>

          <figure>
            <img src={data.imgUrl} alt="contribution image" />
          </figure>
        </div>
      </Fragment>
    );
  }
}

export default ContributionWeb;
