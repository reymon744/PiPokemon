import { 
    GET_POKEMONS,
    GET_TYPES,
    GET_DETAILS,
    SEARCH_POKEMON_BY_NAME,
    FILTER_BY_TYPE,
    SORT,
    FILTER_CREATED,
    FILTER_BY_ATTACK,
    REMOVE_SELECTED_POKEMON,
} from "../actions/index.js";

const initialState = {
  pokemons: [], //lo que muestro
  allPokemons: [], //todos los pokemons
  detail: [], 
  types: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_POKEMONS:
      return {
        ...state,
        pokemons: action.payload,
        allPokemons: action.payload,
      };
    case FILTER_BY_TYPE:
      const allPokemons = state.allPokemons;
      const typeFiltered =
        action.payload === "type"
          ? allPokemons
          : allPokemons.filter((e) => e.types.includes(action.payload) || e.types.some(obj => obj.name === action.payload) );
      return {
        ...state,
        pokemons: typeFiltered,
      };
    case FILTER_CREATED:
      const createdFilter =
        action.payload === "Created"
          ? state.allPokemons.filter((e) => e.id.length > 2)
          : state.allPokemons.filter((e) => e.id <= 40); //osea Data Base
      return {
        ...state,
        pokemons:
          action.payload === "All" ? state.allPokemons : createdFilter,
      };
      case FILTER_BY_ATTACK:
        let attackFilter = [...state.pokemons];
        attackFilter = attackFilter.sort((a, b) => {
          if (action.payload === "Most Attack") {
            if (a.attack > b.attack) {
              return -1;
            }
            if (a.attack < b.attack) {
              return 1;
            }
            return 0; 
          }
          if (action.payload === "Less Attack") {
            if (a.attack > b.attack) {
              return 1;
            }
            if (a.attack < b.attack) {
              return -1;
            }
            return 0; 
          }
        });
        return {
          ...state,
          pokemons:
            action.payload === "Attack" ? state.allPokemons : attackFilter
        };
    case SORT:
      let orderedCharacters = [...state.pokemons];
      orderedCharacters = orderedCharacters.sort((a, b) => {
        if (action.payload === "Ascendant") {
        if (a.name > b.name) {
          return 1;
        }
        if (a.name < b.name) {
          return -1;
        }
        return 0; 
      }
      if (action.payload === "Descendant") {
        if (a.name > b.name) {
          return -1;
        }
        if (a.name < b.name) {
          return 1;
        }
        return 0; 
      }
    });

      return {
        ...state,
        pokemons:
          action.payload === "Filter" ? state.allPokemons : orderedCharacters
      };
    case SEARCH_POKEMON_BY_NAME:
      return {
        ...state,
        pokemons: action.payload 
      };
    case GET_DETAILS:
      return {
        ...state,
        detail: action.payload,
      };

    case GET_TYPES:
      return {
        ...state,
        types: action.payload,
      };

    case REMOVE_SELECTED_POKEMON:
      return {
        ...state,
        detail: [],
      };

    default:
      return state;
  }
}

export default rootReducer;