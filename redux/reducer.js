import { combineReducers } from "redux";

import layout from "components/Layout/reducer";
import notification from "components/Notification/reducer";
import minister from "components/Panel/Minister/reducer";
import responds from "components/Respond/RespondList/reducer";
import candidates from "components/List/CandidateList/reducer";

import login from "pages/login/reducer";
import register from "pages/register/reducer";
import account from "pages/account/reducer";

const rootReducer = combineReducers({
  layout,
  notification,
  minister,
  responds,
  candidates,

  login,
  register,
  account
});

export default rootReducer;
