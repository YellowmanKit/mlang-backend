
module.exports.answerOption = (answers, options) =>{
  //console.log(answers);
  //console.log(options);
  var data = {
    //qid: [{ value: 3, option: A },]
  }
  for(var qid in options){
    if(!data[qid]){ data[qid] = []; }
    for(var i=0;i<options[qid].length;i++){
      data[qid].push({ value: 0, option: options[qid][i] });
    }
    //console.log(data);
    for(var j=0;j<answers.length;j++){
      if(''+ answers[j].question === ''+ qid){
        for(var k=0;k<data[qid].length;k++){
          if(data[qid][k].option === answers[j].value){
            data[qid][k] = { value: data[qid][k].value + 1, option: data[qid][k].option };
          }
        }
      }
    }
  }
  //console.log(data);
  return data;
}

module.exports.loginDate = (logs) =>{
  var data = [
    //{ value: 3, date: new Date(2019, 7, 1) },
  ]
  var temp = {};
  for(var i=0;i<logs.length;i++){
    const createdAt = new Date(logs[i].createdAt);
    const date = dateToString(createdAt);

    if(!temp[date]){ temp[date] = 1; }
    else{ temp[date]++; };
  }
  for(var key in temp){
    data.push({ value: temp[key], date: stringToDate(key) });
  }
  return data;
}

module.exports.cardDate = (cards) =>{
  var data = [
    //{ value: 3, date: new Date(2019, 7, 1) },
  ];
  var temp = {};
  for(var i=0;i<cards.length;i++){
    const createdAt = new Date(cards[i].createdAt);
    const date = dateToString(createdAt);

    if(!temp[date]){ temp[date] = 1; }
    else{ temp[date]++; };
  }
  for(var key in temp){
    data.push({ value: temp[key], date: stringToDate(key) });
  }
  return data;
}

module.exports.cardMonth = (cards) =>{
  var data = [
    //{ value: 3, month: 7 },
  ];
  var temp = {};
  for(var i=0;i<cards.length;i++){
    const createdAt = new Date(cards[i].createdAt);
    const createdAtMonth = new Date(createdAt.getFullYear(), createdAt.getMonth(), 2);
    //console.log(createdAtMonth);
    if(!temp[createdAtMonth]){ temp[createdAtMonth] = 1; }
    else{ temp[createdAtMonth]++; };
  }
  for(var key in temp){
    data.push({ value: temp[key], month: key });
  }
  return data;
}

module.exports.cardStudent = (cards, teacher) =>{
  var data = [
    //{ value: 3, month: 7 },
  ];
  var temp = {};
  for(var i=0;i<cards.length;i++){
    if(!temp[cards[i].author]){ temp[cards[i].author] = 1; }
    else{ temp[cards[i].author]++; };
  }
  for(var key in temp){
    if(key != teacher){ data.push({ value: temp[key], student: key }); }
  }
  return data;
}

var stringToDate = (date) =>{
  const splited = date.split('-');
  return new Date(splited[0],splited[1],splited[2]);
}

var dateToString = (date) =>{
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  var dateString = year + '-' + month + '-' + day;
  return dateString;
}
