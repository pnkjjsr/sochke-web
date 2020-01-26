import { UPDATE, UPDATE_PATH } from "./constant";

const initialState = {
  title: "Sochke",
  desc:
    "Sochke | SochkeApp | Social platform that enables users to connect with different people around them. And it's a digital platform that empowers users to contribute to their constituencies to make it a better place.",
  path: ""
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE:
      return Object.assign({}, state, {
        home: action.payload
      });
    case UPDATE_PATH:
      return Object.assign({}, state, {
        path: action.payload
      });
    default:
      return state;
  }
};

export default auth;
