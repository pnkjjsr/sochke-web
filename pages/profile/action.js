import { PREFETCH_PROFILE_DATA, ADD_LEADER, REMOVE_LEADER } from "./constant";

import { service } from "apiConnect";
import authSession from "utils/authSession";

const prefetchProfileData = e => {
  const session = new authSession();
  const token = session.getToken();
  return dispatch => {
    const data = {
      uid: token,
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

const addLeader = () => {
  return {
    type: ADD_LEADER
  };
};

const removeLeader = () => {
  return {
    type: REMOVE_LEADER
  };
};

export default {
  prefetchProfileData,
  addLeader,
  removeLeader
};
