import { PREFETCHCANDIDATE } from "./constant";

const initialState = {
  ministers: {}
};

const candidate = (state = initialState, action) => {
  switch (action.type) {
    case PREFETCHCANDIDATE:
      return Object.assign({}, state, {
        ministers: action.payload
      });
    default:
      return state;
  }
};

export default candidate;
