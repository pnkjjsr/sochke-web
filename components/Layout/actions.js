import {
  UPDATE,
  UPDATE_PATH,
  HIDE_SEARCH,
  SHOW_SEARCH,
  GET_SEARCH_DATA,
  UPDATE_HEAD,
} from "./constant";
import { service } from "apiConnect";

const update = () => {
  return {
    type: UPDATE,
  };
};
const update_path = (e) => {
  return {
    type: UPDATE_PATH,
    payload: e,
  };
};

const hideSearch = () => {
  return {
    type: HIDE_SEARCH,
  };
};

const showSearch = () => {
  return {
    type: SHOW_SEARCH,
  };
};

const getSearchData = (e) => {
  const data = {
    keyword: e,
  };
  return (dispatch) => {
    service
      .post("/search", data)
      .then((res) => {
        let usersLen = res.data.users.length;
        let ministersLen = res.data.ministers.length;
        if (!usersLen && !ministersLen) return;

        dispatch({
          type: GET_SEARCH_DATA,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

const updateHead = (e) => {
  return {
    type: UPDATE_HEAD,
    payload: e,
  };
};

export default {
  update,
  update_path,
  hideSearch,
  showSearch,
  getSearchData,
  updateHead,
};
