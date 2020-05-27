import {
  UPDATE,
  UPDATE_PATH,
  HIDE_SEARCH,
  SHOW_SEARCH,
  GET_SEARCH_DATA,
  UPDATE_HEAD,
} from "./constant";

const initialState = {
  title: "Sochke | Political Networking | Society | Politics | Societal Issues",
  desc:
    "Sochke | SochKeApp, a political networking platform to enable citizens contribute societal issues, connect political leaders digitally & build a healthy democracy.",
  keyword:
    "Sochke,SochkeApp,Neta,Society Issues,Leaders,Politics,Political,Politician,Political Networking,Minister,Election,Vote,Citizne,Problem,Issue,Development,India,Growth,Agenda,Propganda",
  path: "",
  ogImage: "",
  searchView: false,
  searchMinisters: [],
  searchUsers: [],
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE:
      return Object.assign({}, state, {
        home: action.payload,
      });
    case UPDATE_PATH:
      return Object.assign({}, state, {
        path: action.payload,
      });
    case SHOW_SEARCH:
      return Object.assign({}, state, {
        searchView: true,
      });
    case HIDE_SEARCH:
      return Object.assign({}, state, {
        searchView: false,
        searchMinisters: [],
        searchUsers: [],
      });
    case GET_SEARCH_DATA:
      return Object.assign({}, state, {
        searchMinisters: action.payload.ministers,
        searchUsers: action.payload.users,
      });
    case UPDATE_HEAD:
      return Object.assign({}, state, {
        title: action.payload.title,
        desc: action.payload.desc,
        keyword: action.payload.keyword,
        ogImage: action.payload.ogImage,
      });

    default:
      return state;
  }
};

export default auth;
