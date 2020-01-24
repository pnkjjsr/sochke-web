import { PREFETCH_HOME_DATA, UPDATE_RESPOND } from "./constant";

const initialState = {
  responds: [],
  respondVoted: [],
  contirubtions: [],
  contributionCount: 0,
  councillors: [],
  mlas: [],
  mps: [],
  cms: [],
  pms: [],
  polls: [],
  pollVoted: []
};

const home = (state = initialState, action) => {
  switch (action.type) {
    case PREFETCH_HOME_DATA:
      return Object.assign({}, state, {
        responds: action.payload.responds,
        respondVoted: action.payload.respondVoted,
        contributions: action.payload.contributions,
        contributionCount: action.payload.contributionCount,
        councillors: action.payload.councillors,
        mlas: action.payload.mlas,
        mps: action.payload.mps,
        cms: action.payload.cms,
        pms: action.payload.pms,
        polls: action.payload.polls,
        pollVoted: action.payload.pollVoted
      });
    case UPDATE_RESPOND:
      return Object.assign({}, state, {
        // responds: [...state.responds, action.payload]
        responds: state.responds.concat(action.payload)
      });
    default:
      return state;
  }
};

export default home;
