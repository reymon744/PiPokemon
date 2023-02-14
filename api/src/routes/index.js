const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const pokemonsRoute = require ('./pokemons')
const typesRoute = require ('./types')
const pokemonsIdRoute = require ('./pokemonsId')
const pokemonPostRoute = require ('./pokemonPost')

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/pokemons', [
    pokemonsRoute,
    pokemonsIdRoute,
    pokemonPostRoute
]); 
router.use('/types', typesRoute);


module.exports = router;
