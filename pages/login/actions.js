import { AUTHENTICATE, DEAUTHENTICATE } from "./constant";

const authenticate = el => {
  console.log(el);

  return {
    type: AUTHENTICATE,
    payload: el
  };
};
const deauthenticate = el => {
  return {
    type: DEAUTHENTICATE
  };
};

export default {
  authenticate,
  deauthenticate
};
