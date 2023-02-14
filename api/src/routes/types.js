const axios = require("axios");
const { Router } = require("express");
const { Type } = require("../db.js");

const router = Router();

//traemos los types de la api a la DB
router.get("/", async (req, res, next) => {
  try {
    const api = await axios.get("https://pokeapi.co/api/v2/type"); //traemos los types de la api
    const types = await api.data //.data por axios
    for (const e of types.results) {  //para cada elemento de .results hacemos:
      const find = await Type.findOne({ where: {name: e.name}}); //chequeamos si existe el type en la base
      if (!find)  { 
        await Type.create({ name: e.name });  //si no existe creamos en base al model
      } else {
        return res.json(await Type.findAll()) //si existe devolvemos todos los types
      }
    }
    res.json(await Type.findAll()); //devolvemos todos los types
  } catch (error) {
    next(error);
  }
});


module.exports = router;