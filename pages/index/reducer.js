import { PREFETCH_HOME_DATA, UPDATE_RESPOND } from "./constant";

const initialState = {
  responds: [],
  councillors: [],
  mlas: [],
  mps: [],
  cms: [],
  pms: [],
  polls: [],
  userName: "",
  displayName: "",
  photoURL: "",
  area: "",
  pincode: ""
};

const home = (state = initialState, action) => {
  switch (action.type) {
    case PREFETCH_HOME_DATA:
      return Object.assign({}, state, {
        responds: action.payload.responds,
        councillors: action.payload.councillors,
        mlas: action.payload.mlas,
        mps: action.payload.mps,
        cms: action.payload.cms,
        pms: action.payload.pms,
        polls: action.payload.polls,
        userName: action.payload.userName,
        displayName: action.payload.displayName,
        photoURL: action.payload.photoURL,
        area: action.payload.area,
        pincode: action.payload.pincode
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
