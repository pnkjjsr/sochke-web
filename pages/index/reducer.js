import { PREFETCH_HOME_DATA } from "./constant";

const initialState = {
  data: {}
};

const home = (state = initialState, action) => {
  switch (action.type) {
    case PREFETCH_HOME_DATA:
      return Object.assign({}, state, {
        data: action.payload
      });
    default:
      return state;
  }
};

export default home;
