module.exports.outDated = (date) =>{
  const today = new Date();
  const endDate = new Date(date);
  return date < today;
}
