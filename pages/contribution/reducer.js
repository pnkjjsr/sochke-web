import { PREFETCH_CONTRIBUTION_DATA } from "./constant";

const initialState = {
  contributions: []
};

const contribution = (state = initialState, action) => {
  switch (action.type) {
    case PREFETCH_CONTRIBUTION_DATA:
      return Object.assign({}, state, {
        contributions: action.payload
      });
    default:
      return state;
  }
};

export default contribution;
