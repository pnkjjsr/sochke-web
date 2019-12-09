import { PREFETCHPOLL } from "./constant";

import { service } from "apiConnect";
import authSession from "utils/authSession";

const prefetchPollData = e => {
  return dispatch => {
    const session = new authSession();
    const token = session.getToken();

    let data = {
      uid: token,
      type: e
    };

    service
      .post("/poll", data)
      .then(res => {
        let pollData = res.data;
        dispatch({
          type: PREFETCHPOLL,
          payload: pollData
        });
      })
      .catch(err => {
        console.log(err);
      });
  };
};

export default {
  prefetchPollData
};
