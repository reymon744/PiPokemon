import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deletePokemon, getPokemons } from "../redux/actions/index.js";
import {useHistory} from "react-router-dom"
import NavBar from "./NavBar.jsx";
import "./Delete.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Delete() {
    const dispatch = useDispatch();
    const allPokemons = useSelector((state) => state.pokemons)
    const history = useHistory(); 

    const [name, setName] = useState("") //estado local
      
    const handleInputChange = (e) => {
      e.preventDefault()
      setName(e.target.value);
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      if (allPokemons.some(e => e.name === name)) {
      dispatch(deletePokemon(name))
      // alert("Pokemon has been exterminated");
      toast.success('Pokemon has been exterminated!', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        onClose: () => {
          history.push("/home");
        }
        });
      }
      else {
        // alert("Pokemon not found")
        toast.error('Pokemon not found!', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          });
      }
    }
  
    return (
      <>
      <NavBar />
      <body className="no-scroll2">
      <div className="divLanding2">
        <div>
        <img className="imageDelete2" src="https://townsquare.media/site/295/files/2019/10/Terminator-Orion.jpg?w=980&q=75" alt="" />
        </div>
        <div>
        <input
          className="inputsearch2"
          type="text"
          onChange= {(e) => handleInputChange(e)}
          placeholder="Pokemon's name to exterminate..."
        />
        <button className ="searchButton2" type="submit" onClick= {(e) => handleSubmit(e)}> Delete </button>
        <ToastContainer />
      </div>                 
      </div>
      </body>
      </>         
    );
  }