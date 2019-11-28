import { PREFETCH } from "./constant";

import { service } from "apiConnect";

const prefetch = function(token) {
  const uid = token;
  const data = {
    uid: uid,
    type: "all"
  };
  return function(dispatch) {
    service
      .post("respond", data)
      .then(res => {
        dispatch({
          type: PREFETCH,
          payload: res.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  };
};

export default {
  prefetch
};
