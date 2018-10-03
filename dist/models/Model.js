"use strict";

module.exports.outDated = function (date) {
  var today = new Date();
  var endDate = new Date(date);
  return date < today;
};
//# sourceMappingURL=Model.js.map