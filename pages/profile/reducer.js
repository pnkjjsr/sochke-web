import { PREFETCH_PROFILE_DATA } from "./constant";

const initialState = {
  data: {}
};

const profile = (state = initialState, action) => {
  switch (action.type) {
    case PREFETCH_PROFILE_DATA:
      return Object.assign({}, state, {
        data: action.payload
      });
    default:
      return state;
  }
};

export default profile;
