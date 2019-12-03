import { combineReducers } from "redux";

import layout from "components/Layout/reducer";
import notification from "components/Notification/reducer";
import minister from "components/Panel/Minister/reducer";
import responds from "components/Respond/RespondList/reducer";

import login from "pages/login/reducer";
import register from "pages/register/reducer";
import account from "pages/account/reducer";

const rootReducer = combineReducers({
  login,
  layout,
  notification,
  minister,
  responds,

  register,
  account
});

export default rootReducer;
