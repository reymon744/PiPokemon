import axios from "axios";


export const GET_TYPES = "GET_TYPES";
export const GET_POKEMONS = "GET_POKEMONS";
export const GET_DETAILS = "GET_DETAILS";
export const SEARCH_POKEMON_BY_NAME = "SEARCH_POKEMON_BY_NAME";
export const FILTER_BY_TYPE = "FILTER_BY_TYPE";
export const SORT = "SORT";
export const FILTER_CREATED = "FILTER_CREATED";
export const FILTER_BY_ATTACK = "FILTER_BY_ATTACK";
export const POST_POKEMON = "POST_POKEMON"
export const REMOVE_SELECTED_POKEMON = "REMOVE_SELECTED_POKEMON"
export const DELETE_POKEMON = "DELETE_POKEMON"
export const UPDATE_POKEMON = "UPDATE_POKEMON"


//traemos los Pokemon del back
export const getPokemons = () => async (dispatch) => {
    const resolve = await fetch("http://localhost:3001/pokemons");
    const data = await resolve.json();
    return dispatch({ type: GET_POKEMONS, payload: data });
  };

//traemos los Types del back
export const getTypes = () => async (dispatch) => {
    const resolve = await fetch("http://localhost:3001/types");
    const data = await resolve.json();
    return dispatch({ type: GET_TYPES, payload: data });
  };

//traemos los details del pokemon segun su id
export const getDetails = (id) => async (dispatch) => {
    const resolve = await fetch(`http://localhost:3001/pokemons/${id}`);
    const data = await resolve.json();
    return dispatch({ type: GET_DETAILS, payload: data });
  };

//buscamos un Pokemon segun el nombre
export const searchPokemonName = (name) => async (dispatch) => {
    try {
      const resolve = await fetch(`http://localhost:3001/pokemons?name=${name}&exactMatch=true`);
      const data = await resolve.json();
      return dispatch({ type: SEARCH_POKEMON_BY_NAME, payload: data });
    } catch {
      return alert("Pokemon not found");
    }
  };

//filtramos por Type
export const filterPokemonsByType = (payload) => ({
  type: FILTER_BY_TYPE,
  payload,
});

//Creamos un Pokemon
export const postPokemon = (payload) => async (dispatch) => {  
    await axios.post("http://localhost:3001/pokemons", payload);
    return dispatch({ type: POST_POKEMON });
};

//Ordenamos Alphabet
export const Sort = (order) => ({
  type: SORT,
  payload: order,
});

//Filtramos por Origen
export const filterCreated = (payload) => ({
  type: FILTER_CREATED,
  payload
});

//Filtramos por Ataque
export const filterByAttack = (payload) => ({
  type: FILTER_BY_ATTACK,
  payload
});

//Sacamos del Estado el pokemon que vimos en details
export const removeSelectedPokemon = () => ({
  type: REMOVE_SELECTED_POKEMON
});

export const deletePokemon = (name) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`http://localhost:3001/pokemons?delete&name=${name}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Something went wrong');
      }

    dispatch({ type: DELETE_POKEMON });
    } catch (err) {
      console.log(err);
    }
  };
};


export const updatePokemon = (id, payload) => async (dispatch) => {
  try {
    await axios.put(`http://localhost:3001/pokemons/${id}`, payload); 
    return dispatch({ type: UPDATE_POKEMON }); 
  } catch (err) {
    console.log(err);
  }
};