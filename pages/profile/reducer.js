import { PREFETCH_PROFILE_DATA, ADD_LEADER, REMOVE_LEADER } from "./constant";

const initialState = {
  responds: [],
  believers: [],
  leaders: [],
  uid: "",
  userName: "",
  displayName: "",
  photoURL: "",
  area: "",
  pincode: "",
  respondCount: 0,
  contributionCount: 0,
  believerCount: 0,
  mediaCount: 0,
  leaderCount: 0,
  believe: false
};

const profile = (state = initialState, action) => {
  switch (action.type) {
    case PREFETCH_PROFILE_DATA:
      return Object.assign({}, state, {
        responds: action.payload.responds,
        believers: action.payload.believers,
        leaders: action.payload.leaders,
        uid: action.payload.uid,
        userName: action.payload.userName,
        displayName: action.payload.displayName,
        photoURL: action.payload.photoURL,
        area: action.payload.area,
        pincode: action.payload.pincode,
        respondCount: action.payload.respondCount,
        contributionCount: action.payload.contributionCount,
        mediaCount: action.payload.mediaCount,
        leaderCount: action.payload.leaderCount,
        believerCount: action.payload.believerCount,
        believe: action.payload.believe
      });
    case ADD_LEADER:
      return Object.assign({}, state, {
        believe: true,
        believerCount: state.believerCount + 1
      });
    case REMOVE_LEADER:
      return Object.assign({}, state, {
        believe: false,
        believerCount: state.believerCount - 1
      });
    default:
      return state;
  }
};

export default profile;
