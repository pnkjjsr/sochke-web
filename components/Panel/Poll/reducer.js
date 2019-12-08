import { PREFETCHPOLL } from "./constant";

const initialState = {
  data: ""
};

const polls = (state = initialState, action) => {
  switch (action.type) {
    case PREFETCHPOLL:
      return Object.assign({}, state, {
        data: action.payload
      });
    default:
      return state;
  }
};

export default polls;
