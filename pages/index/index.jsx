import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import homeActions from "./action";

import userAuth from "utils/userAuth";

import CandidateList from "components/List/CandidateList";
import CandidateWinner from "components/Panel/CandidateWinner";
import Poll from "components/Panel/Poll";
import Respond from "components/Respond";
import RespondBox from "components/Respond/RespondBox";
import RespondList from "components/Respond/RespondList";

import "./style.scss";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {}
    };
  }
  static getDerivedStateFromProps(props, state) {
    let data = props.home.data;
    let len = Object.keys(data).length;

    if (len) {
      return {
        data: data
      };
    } else {
      return null;
    }
  }

  componentDidMount() {
    const { homeAction } = this.props;
    homeAction.prefetchHomeData();
  }

  loopRespond = () => {
    const { data } = this.state;
    const userData = {
      userName: data.userName,
      displayName: data.displayName,
      photoURL: data.photoURL,
      area: data.area,
      pincode: data.pincode
    };

    if (data.responds) {
      return data.responds.map(respond => {
        return <Respond key={respond.id} respond={respond} user={userData} />;
      });
    }
  };

  render() {
    const { data } = this.state;

    return (
      <Fragment>
        <div className="home">
          <div className="container">
            <div className="row">
              <div className="col-lg-2 col-xl-2 d-none d-xl-block">
                <CandidateList type="councillor" data={data.councillors} />
                <CandidateList type="mla" data={data.mlas} />
                <CandidateList type="mp" data={data.mps} />
                <CandidateList type="cm" data={data.cms} />
                <CandidateList type="pm" data={data.pms} />
              </div>
              <div className="col-lg-9 col-xl-7">
                <RespondBox />
                {this.loopRespond()}
                {/* <RespondList /> */}
              </div>
              <div className="col-lg-3 col-xl-3 d-none d-lg-block">
                <div className="panel">
                  <h2 className="title">Your Counstituency</h2>
                  <div className="panel-container">
                    <CandidateWinner type="mla" data={data.mlas} />
                  </div>
                </div>

                <div className="panel">
                  <h2 className="title">Delhi want change for?</h2>
                  <div className="panel-container">
                    <Poll type="state" data={data.polls} />
                  </div>
                </div>

                <div className="panel">
                  <h2 className="title">Hari Nagar, has?</h2>
                  <div className="panel-container">
                    <Poll type="area" data={data.polls} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <style jsx>{``}</style>
      </Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  homeAction: bindActionCreators(homeActions, dispatch)
});

export default connect(state => state, mapDispatchToProps)(userAuth(Home));
