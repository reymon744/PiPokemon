const { Pokemon, Type } = require("../db");

const getPokemonsDb = async () => {
    try{
      const results = await Pokemon.findAll({  //traigo los pokemons de la Db
          include:{
              model: Type, //que incluya el modelo Type
              attributes: ['name'], //que solo traiga el name del type
              through:{ //que la join table no sea traida
                  attributes: [],
              }
          }
      })
      return results;
  }catch (err){
      console.log(err);
  }
} 

module.exports = getPokemonsDb;