import { combineReducers } from "redux";

import authReducer from "./authReducer";
import user from "components/User/reducer";
import layout from "components/Layout/reducer";
import notification from "components/Notification/reducer";
import minister from "components/Panel/Minister/reducer";
import responds from "components/RespondList/reducer";

import register from "pages/register/reducer";
import account from "pages/account/reducer";

const rootReducer = combineReducers({
  authReducer,
  user,
  layout,
  notification,
  minister,
  responds,

  register,
  account
});

export default rootReducer;
