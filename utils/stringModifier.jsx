class stringModifier {
  constructor(props) {}

  removeWord = (e, word) => {
    let arr = [];
    e.map(i => {
      let nameBefore = i.officename;
      let index = nameBefore.search(word);
      let name = nameBefore.slice(0, index);
      let state = i.taluk;
      let district = i.districtname;
      let division = i.divisionname;
      arr.push({
        area: name.trim(),
        division: division,
        district: district,
        state: state
      });
    });
    return arr;
  };

  currencyFormat = (e, size) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      notation: "compact",
      compactDisplay: size
    }).format(e);
  };

  tillFirstCommaString = e => {
    var string = /[^,]*/.exec(e)[0];
    return string;
  };
}

export default stringModifier;
