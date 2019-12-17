import { combineReducers } from "redux";

import layout from "components/Layout/reducer";
import notification from "components/Notification/reducer";
import minister from "components/Panel/Minister/reducer";
import responds from "components/Respond/RespondList/reducer";

import polls from "components/Panel/Poll/reducer";

import login from "pages/login/reducer";
import register from "pages/register/reducer";
import account from "pages/account/reducer";
import profile from "pages/profile/reducer";
import home from "pages/index/reducer";

const rootReducer = combineReducers({
  layout,
  notification,
  minister,
  responds,
  polls,

  home,
  login,
  register,
  account,
  profile
});

export default rootReducer;
