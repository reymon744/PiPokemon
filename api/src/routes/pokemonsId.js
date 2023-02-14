const { Router } = require("express");
const getAll = require("../controllers/getAll.js")
const router = Router();

router.get("/:id", async (req, res, next) => { 
    try {
      const id = req.params.id;
      const pokemonsTotal = await getAll();//traemos todos los Pokemon
      if (id) { 
        let pokemonId = pokemonsTotal.filter((el) => el.id == id); //filtro por id y devuelvo el Pokemon
        pokemonId.length
          ? res.status(200).json(pokemonId)
          : res.status(404).send("Not found");
      }
    } catch (error) {
      next(error);
    }
  });

module.exports = router;