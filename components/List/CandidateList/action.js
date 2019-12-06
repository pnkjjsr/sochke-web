import { PREFETCHCANDIDATE } from "./constant";

import { service } from "apiConnect";
import authSession from "utils/authSession";

const prefetchMinister = type => {
  return dispatch => {
    const session = new authSession();
    const profile = session.getProfile();

    let e = {};
    let data = {
      type: type,
      pincode: profile.pincode,
      district: profile.district
    };

    service
      .post("/constituency-minister", data)
      .then(res => {
        e = res.data;
        dispatch({
          type: PREFETCHCANDIDATE,
          payload: e
        });
      })
      .catch(err => {
        console.log(err);
      });
  };
};

export default {
  prefetchMinister
};
