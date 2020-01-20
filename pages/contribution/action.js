import { PREFETCH_CONTRIBUTION_DATA } from "./constant";

import { service } from "apiConnect";
import authSession from "utils/authSession";

const prefetchContributionData = () => {
  const session = new authSession();
  const profile = session.getProfile();
  const data = {
    uid: profile.id,
    constituency: profile.constituency,
    district: profile.district
  };

  return dispatch => {
    service
      .post("/contribution", data)
      .then(res => {
        if (res.data.code == "contribution/empty") {
          return console.log(res.data.message);
        }

        return dispatch({
          type: PREFETCH_CONTRIBUTION_DATA,
          payload: res.data.contributions
        });
      })
      .catch(err => {
        console.log(err);
      });
  };
};

export default {
  prefetchContributionData
};
