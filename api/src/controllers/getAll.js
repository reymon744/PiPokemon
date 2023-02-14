const getPokemonsApi = require("./getPokemonsApi.js");
const getPokemonsDb = require("./getPokemonsDb.js")

const getAll = async () => { //traigo y concateno los pokemon de la Api y Db
    const apiInfo = await getPokemonsApi(); 
    const dbInfo = await getPokemonsDb();  
    const infoTotal = apiInfo.concat(dbInfo); 
    return infoTotal;
  };

  module.exports = getAll;