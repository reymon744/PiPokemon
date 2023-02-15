const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const pokemonsRoute = require ('./pokemons')
const typesRoute = require ('./types')
const pokemonsIdRoute = require ('./pokemonsId')
const pokemonPostRoute = require ('./pokemonPost')
const deletePokemonRoute = require ('./deletePokemon')
const pokemonUpdateRoute = require ('./pokemonUpdate')

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/pokemons', [
    pokemonsRoute,
    pokemonsIdRoute,
    pokemonPostRoute,
    deletePokemonRoute,
    pokemonUpdateRoute
]); 

router.use('/types', typesRoute);


module.exports = router;
