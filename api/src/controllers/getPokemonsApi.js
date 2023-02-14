const axios = require("axios");

const getPokemonsApi = async () => { //traigo info de los primeros 40 pokemon
  const resp = await axios
    .get("https://pokeapi.co/api/v2/pokemon?limit=40") 
    .then((data) => {
      return data.data.results; //traigo el array results
    })
    .then((data) => {
      return Promise.all(data.map((res) => axios.get(res.url))); //a cada elemento(pokemon) le un get a la url
    })
    .then((data) => {
      return data.map((res) => res.data); //de cada url traigo lo que hay
    });
  let arrayPoke = resp.map((result) => { // de cada pokemon traigo solo la info y stats necesarias
    return {
      id: result.id,
      name: result.name,
      types: result.types.map((t) => t.type.name), 
      image: result.sprites.other.dream_world.front_default,
      hp: result.stats[0].base_stat,
      attack: result.stats[1].base_stat,
      defense: result.stats[2].base_stat,
      speed: result.stats[5].base_stat,
      height: result.height,
      weight: result.weight,
    };
  });
  return arrayPoke;
};
module.exports = getPokemonsApi;