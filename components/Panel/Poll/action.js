import { PREFETCHPOLL } from "./constant";

import { service } from "apiConnect";
import authSession from "utils/authSession";

const prefetchPollData = e => {
  const session = new authSession();
  const profile = session.getProfile();
  let type = `profile.${e}`;

  let data = {
    [e]: e
  };

  service
    .post("/poll", data)
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      //   console.log(err);
    });
  return {
    type: PREFETCHPOLL,
    payload: e
  };
};

export default {
  prefetchPollData
};
