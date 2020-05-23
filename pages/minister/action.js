import { PREFETCH_MINISTER_DATA, PREFETCH_NETA_DATA } from "./constant";

import { service } from "apiConnect";

const prefetchMinisterData = (e) => {
  return (dispatch) => {
    const data = e;
    service
      .post("/page-minister", data)
      .then((res) => {
        dispatch({
          type: PREFETCH_MINISTER_DATA,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

const prefetchNetaData = (e) => {
  return (dispatch) => {
    service
      .get(`/getNeta?neta=${e}`)
      .then((res) => {
        dispatch({
          type: PREFETCH_NETA_DATA,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export default {
  prefetchMinisterData,
  prefetchNetaData,
};
