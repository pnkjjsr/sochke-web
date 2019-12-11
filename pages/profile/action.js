import { PREFETCH_PROFILE_DATA } from "./constant";

import { service } from "apiConnect";

const prefetchProfileData = e => {
  return dispatch => {
    const data = {
      userName: e
    };
    service
      .post("/page-profile", data)
      .then(res => {
        console.log();
        dispatch({
          type: PREFETCH_PROFILE_DATA,
          payload: res.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  };
};

export default {
  prefetchProfileData
};
