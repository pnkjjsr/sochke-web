import { combineReducers } from "redux";

import layout from "components/Layout/reducer";
import notification from "components/Notification/reducer";
import responds from "components/Respond/RespondList/reducer";

import login from "pages/login/reducer";
import register from "pages/register/reducer";
import account from "pages/account/reducer";
import home from "pages/index/reducer";
import profile from "pages/profile/reducer";
import minister from "pages/minister/reducer";
import contribution from "pages/contribution/reducer";

const rootReducer = combineReducers({
  layout,
  notification,
  responds,

  login,
  register,
  account,
  home,
  profile,
  minister,
  contribution
});

export default rootReducer;
