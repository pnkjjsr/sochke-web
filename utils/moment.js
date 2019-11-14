var moment = require("moment");

export default class Moment {
  constructor() {}

  format = e => {
    let formated = moment(e).format("ddd, DD MMMM");
    return formated;
  };
}
