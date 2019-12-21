import { PREFETCH_MINISTER_DATA } from "./constant";

const initialState = {
  year: "",
  age: "",
  cases: "",
  userName: "",
  type: "",
  education: "",
  party: "",
  constituency: "",
  partyShort: "",
  liabilities: "",
  address: "",
  state: "",
  photoUrl: "",
  name: "",
  assets: "",
  winner: true,
  pincode: "",
  id: "",
  createdAt: "",
  constituencyArea: []
};

const minister = (state = initialState, action) => {
  switch (action.type) {
    case PREFETCH_MINISTER_DATA:
      return Object.assign({}, state, {
        year: action.payload.year,
        age: action.payload.age,
        cases: action.payload.cases,
        userName: action.payload.userName,
        type: action.payload.type,
        education: action.payload.education,
        party: action.payload.party,
        constituency: action.payload.constituency,
        partyShort: action.payload.partyShort,
        liabilities: action.payload.liabilities,
        address: action.payload.address,
        state: action.payload.state,
        photoUrl: action.payload.photoUrl,
        name: action.payload.name,
        assets: action.payload.assets,
        winner: action.payload.winner,
        pincode: action.payload.pincode,
        id: action.payload.id,
        createdAt: action.payload.createdAt,
        constituencyArea: action.payload.constituencyArea
      });
    default:
      return state;
  }
};

export default minister;
