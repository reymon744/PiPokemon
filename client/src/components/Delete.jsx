import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { deletePokemon } from "../redux/actions/index.js";
import {useHistory} from "react-router-dom"
import NavBar from "./NavBar.jsx";
import "./SearchBar.css";

export default function Delete() {
    const dispatch = useDispatch();
    const history = useHistory(); 
    const [name, setName] = useState("") //estado local
      
    const handleInputChange = (e) => {
      e.preventDefault()
      setName(e.target.value);
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      dispatch(deletePokemon(name))
      alert("Pokemon has been exterminated");
      history.push("/home");
    }
  
    return (
      <>
      <NavBar />
      <body className="no-scroll">
      <div className="divLanding">
        <div>
        <img className="imageDelete" src="https://townsquare.media/site/295/files/2019/10/Terminator-Orion.jpg?w=980&q=75" alt="" />
        </div>
        <div>
        <input
          className="inputsearch"
          type="text"
          onChange= {(e) => handleInputChange(e)}
          placeholder="Pokemon's name to exterminate..."
        />
        <button className ="searchButton" type="submit" onClick= {(e) => handleSubmit(e)}> Delete </button>
      </div>                 
      </div>
      </body>
      </>         
    );
  }