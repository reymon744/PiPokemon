import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { searchPokemonName } from "../redux/actions/index.js";
import "./SearchBar.css";

export default function SearchBar() {
    const dispatch = useDispatch();
    const [name, setName] = useState("") //estado local
      
    const handleInputChange = (e) => {
      e.preventDefault()
      setName(e.target.value);
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      dispatch(searchPokemonName(name))
    }
  
    return (
      <div>
        <input
          className="inputsearch"
          type="text"
          onChange= {(e) => handleInputChange(e)}
          placeholder="Pokemon's name..."
        />
        <button className ="searchButton" type="submit" onClick= {(e) => handleSubmit(e)}> Search </button>
      </div>
    );
  }