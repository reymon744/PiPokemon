const { Router } = require("express");
const router = Router();
const { Pokemon, Type } = require("../db");

router.put("/:id", async (req, res, next) => {
    const id = req.params.id;
    const { name, image, hp, attack, defense, speed, height, weight, types } = req.body;
    
    try {
      const pokemon = await Pokemon.findByPk(id); // busco el pokemon en la base de datos
      if (!pokemon) {
        return res.status(404).send("Pokemon not found");
      }
      // actualizo las propiedades del pokemon con los valores recibidos en el body de la solicitud
      pokemon.name = name;
      pokemon.image = image;
      pokemon.hp = hp;
      pokemon.attack = attack;
      pokemon.defense = defense;
      pokemon.speed = speed;
      pokemon.height = height;
      pokemon.weight = weight;
      await pokemon.save(); // guardo los cambios en la base de datos
      
      if (Array.isArray(types) && types.length) {
        let dbTypes = await Promise.all(
          types.map((e) => {
            return Type.findOne({ where: { name: e } }); // busco los types asociados
          })
        );
        await pokemon.setTypes(dbTypes); // asociamos el Pokemon con los Types en la Db
      }
  
      return res.send("Pokemon updated"); 
    } catch (err) {
      res.status(400).send("Error in data");
    }
  });
  
  module.exports = router;