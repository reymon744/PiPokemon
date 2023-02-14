const { Router } = require("express");
const getAll = require("../controllers/getAll.js")
const router = Router();

//name y getAll Pokemons
router.get("/", async (req, res, next) => {
  try {
    let name = req.query.name;
    let exactMatch = req.query.exactMatch;
    let pokemonsTotal = await getAll(); //traemos todos los Pokemon
    if (name) { //si me pasan name, comprobamos si esta
      let pokemonName;
      if (exactMatch === "true") { //comprobamos que este escrito exactamente igual
        pokemonName = await pokemonsTotal.filter((el) => 
          el.name.toLowerCase() === name.toLowerCase()
        );
      } else {
        pokemonName = await pokemonsTotal.filter((el) => 
          el.name.toLowerCase().includes(name.toLowerCase())
        );
      }
      pokemonName.length
        ? res.status(200).send(pokemonName) //si esta devolvemos el pokemon
        : res.status(404).send("Pokemon not found");
    } else {
      res.status(200).send(pokemonsTotal); //si no me pasan name devolvemos todos los Pokemon
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;