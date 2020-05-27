import { PREFETCH_MINISTER_DATA, PREFETCH_NETA_DATA } from "./constant";

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
  photoDisplay: "",
  photoUrl: "",
  name: "",
  assets: "",
  winner: true,
  pincode: "",
  id: "",
  createdAt: "",
  constituencyArea: [],
  ministers: [],
  likeCount: "",
  shareCount: "",
};

const minister = (state = initialState, action) => {
  switch (action.type) {
    case PREFETCH_MINISTER_DATA:
      return Object.assign({}, state, {
        year: action.payload.winnerMinister.year,
        age: action.payload.winnerMinister.age,
        cases: action.payload.winnerMinister.cases,
        userName: action.payload.winnerMinister.userName,
        type: action.payload.winnerMinister.type,
        education: action.payload.winnerMinister.education,
        party: action.payload.winnerMinister.party,
        constituency: action.payload.winnerMinister.constituency,
        partyShort: action.payload.winnerMinister.partyShort,
        liabilities: action.payload.winnerMinister.liabilities,
        address: action.payload.winnerMinister.address,
        state: action.payload.winnerMinister.state,
        photoUrl: action.payload.winnerMinister.photoUrl,
        name: action.payload.winnerMinister.name,
        assets: action.payload.winnerMinister.assets,
        winner: action.payload.winnerMinister.winner,
        pincode: action.payload.winnerMinister.pincode,
        id: action.payload.winnerMinister.id,
        createdAt: action.payload.winnerMinister.createdAt,
        constituencyArea: action.payload.winnerMinister.constituencyArea,
        ministers: action.payload.ministers,
      });
    case PREFETCH_NETA_DATA:
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
        photoDisplay: action.payload.photoDisplay,
        photoUrl: action.payload.photoUrl,
        name: action.payload.name,
        assets: action.payload.assets,
        winner: action.payload.winner,
        pincode: action.payload.pincode,
        id: action.payload.id,
        createdAt: action.payload.createdAt,
        likeCount: action.payload.likeCount,
        shareCount: action.payload.shareCount,
      });
    default:
      return state;
  }
};

export default minister;
