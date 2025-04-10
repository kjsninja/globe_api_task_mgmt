const trim =  (value) => {
  switch(typeof value){
    case "object":
      const objKeys = Object.keys(value);
      for(let i=0;i < objKeys.length; i++){
        value[objKeys[i]] = trim(value[objKeys[i]]);
      }
      return value;
    case "string":
      return value.trim();
  }
  return value;
}

module.exports = {
  trim
}