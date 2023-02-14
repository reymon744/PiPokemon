import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getPokemons,
  filterPokemonsByType,
  filterCreated,
  Sort,
  filterByAttack,
} from "../redux/actions/index.js";
import Card from "./Card";
import Pagination from "./Pagination";
import NavBar from "./NavBar";
import SearchBar from "./SearchBar";
import "./Home.css";

export default function Home() {
  const dispatch = useDispatch();
  const allPokemons = useSelector((state) => state.pokemons) //Traigo el pokemons de redux (updates)
  const [currentPage, setCurrentPage] = useState(1); //estado local pagina actual
  const [pokemonsPerPage] = useState(12); //estado local pokemons por pagina
  const indexOfLastPokemon = currentPage * pokemonsPerPage; 
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
  const currentPokemons = allPokemons.slice( //calculamos los pokemons(traidos de redux) a mostrar segun la pagina
    indexOfFirstPokemon,
    indexOfLastPokemon
  );
    console.log(currentPokemons)
  const pagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
//hacemos getPokemons al inicio
  useEffect(() => {
    dispatch(getPokemons());
  }, [dispatch]); //si usamos dispatch ponerlo aca tambien

  function handleFilterType(e) {
    dispatch(filterPokemonsByType(e.target.value));
  }

  function handleFilterCreated(e) {
    dispatch(filterCreated(e.target.value));
  }

  function handleFilterAttack(e) {
    dispatch(filterByAttack(e.target.value));
  }

  function onSelectsChange(e) {
    dispatch(Sort(e.target.value));
  }

  return (
    <>
      <NavBar />
      <SearchBar/>
      <div className="home">
        <div className="leftAndRight">
            <div className="filters">
              <h2 className="titleFilters">FILTERS:</h2>
              <label>Alphabetical:</label>
              <select name="select" onChange={onSelectsChange} className="a-z">
                <option value="Filter"> </option>
                <option value="Ascendant">A-Z</option>
                <option value="Descendant">Z-A</option>
              </select>
              <label>By Attack:</label>
              <select
                name="selects"
                onChange={handleFilterAttack}
                className="attack"
              >
                <option value="Attack"> </option>
                <option value="Most Attack">Most Attack</option>
                <option value="Less Attack">Less Attack</option>
              </select>
              <label>By Type:</label>
              <select onChange={handleFilterType}>
                <option value="type"> </option>
                <option value="normal"> Normal </option>
                <option value="fighting"> Fighting </option>
                <option value="flying"> Flying </option>
                <option value="poison"> Poison </option>
                <option value="ground"> Ground </option>
                <option value="rock"> Rock </option>
                <option value="bug"> Bug </option>
                <option value="ghost"> Ghost </option>
                <option value="steel"> Steel </option>
                <option value="fire"> Fire </option>
                <option value="water"> Water </option>
                <option value="grass"> Grass </option>
                <option value="electric"> Electric </option>
                <option value="psychic"> Psychic </option>
                <option value="ice"> Ice </option>
                <option value="dragon"> Dragon </option>
                <option value="dark"> Dark </option>    
                <option value="fairy"> Fairy </option>
                <option value="unknown"> Unknown </option>
                <option value="shadow"> Shadow </option>
              </select>
              <label>By Origin:</label>
              <select onChange={handleFilterCreated}>
                <option value="All"> All </option>
                <option value="Created"> Created </option>
                <option value="DataBase"> Data Base </option>
              </select>
            </div>
          <div className="divCurrentPokemons">
            {currentPokemons?.map((e) => {
                return (
                  <fragment>
                    <Link to={"/home/" + e.id}>
                      <Card
                        name={e.name}
                        image={e.image}
                        types={e.types}
                      />
                    </Link>
                  </fragment>
                );
              })} 
          </div>
          
        </div>
        <Pagination
            pokemonsPerPage={pokemonsPerPage}
            allPokemons={allPokemons.length}
            pagination={pagination}
          />
      </div>
    </>
  );
}

