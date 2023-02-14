const { Router } = require("express");
const router = Router();
const { Pokemon, Type } = require("../db");


router.post("/", async (req, res, next) => { 
    try {
      let { name, image, hp, attack, defense, speed, height, weight, types} = req.body //usamos info del body
  
      const newPokemon = await Pokemon.create({ //creamos el pokemon con el modelo
        name,
        image,
        hp,
        attack,
        defense,
        speed,
        height,
        weight,
      });
  
      
  
      if(Array.isArray(types) && types.length){ //si viene un array en types:
        let dbTypes = await Promise.all( 
          types.map((e) => { 
            return Type.findOne({where:{ name: e}}) //buscamos y traemos con la forma del Model Types
          })
        )
       await newPokemon.addType(dbTypes) //asociamos el Pokemon con los Types en la Db
  
       return res.send("Pokemon created");
      }
    } catch (err) {
      res.status(400).send("Error in data");
    }
  })

module.exports = router;