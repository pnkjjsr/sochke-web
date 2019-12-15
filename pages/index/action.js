import { PREFETCH_HOME_DATA } from "./constant";

import { service } from "apiConnect";
import authSession from "utils/authSession";

const prefetchHomeData = e => {
  const session = new authSession();
  const token = session.getToken();

  return dispatch => {
    const data = {
      uid: token
    };
    service
      .post("/page-home", data)
      .then(res => {
        dispatch({
          type: PREFETCH_HOME_DATA,
          payload: res.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  };
};

export default {
  prefetchHomeData
};
