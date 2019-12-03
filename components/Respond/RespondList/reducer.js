import { PREFETCH } from "./constant";

const initialState = {
  responds: []
};

const responds = (state = initialState, action) => {
  switch (action.type) {
    case PREFETCH:
      return Object.assign({}, state, {
        responds: action.payload
      });
    default:
      return state;
  }
};

export default responds;
