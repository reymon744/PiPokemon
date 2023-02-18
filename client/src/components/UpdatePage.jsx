import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { updatePokemon, getTypes, getPokemons } from '../redux/actions/index';
import NavBar from './NavBar';
import "./UpdatePage.css";

const validateForm = ({ name, image, hp, attack, defense, speed, height, weight }) => {
    const errors = {};
    const urlRegex = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
    const onlyLetters = /[\^$.¡*+?=¿%&!:|\\/()[\]{}1234567890¬"'#;-@¨]/;  
    const onlyNumbers = /[\^$.¡*+?=¿%&!:|\\/()[\]{}¬"'#;-@¨]/;
   
    if (
      typeof name !== "string" || name.length <= 2 || name.length >= 25 || onlyLetters.test(name) 
    ){
      errors.name = "Please write between 2-25 lowercases";    
    }
      
    else if (!urlRegex.test(image))
      errors.image = "Please provide a valid URL for the image";
    else if (isNaN(hp) || onlyNumbers.test(hp) || hp < 1 || hp > 500)
      errors.hp = "Hp must be between 1-500";
    else if (isNaN(attack) || onlyNumbers.test(attack) || attack < 1|| attack > 150)
      errors.attack = "Attack must be between 1-150";
    else if (isNaN(defense) || onlyNumbers.test(defense) || defense < 1|| defense > 150)
      errors.defense = "Defense must be between 1-150";  
    else if (isNaN(speed) || onlyNumbers.test(speed) || speed < 1|| speed > 300)
      errors.speed = "Speed must be between 1-300";
    else if (isNaN(height) || onlyNumbers.test(height) || height < 1 || height > 50)
      errors.height = "Height must be between 1-50";
    else if (isNaN(weight) || onlyNumbers.test(weight) || weight < 0|| weight > 2000)
      errors.weight = "Weight must be between 0-2000";  
    return errors;
  };
  
export default function UpdatePage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const types = useSelector((state) => state.types);
  const allPokemons = useSelector((state) => state.pokemons)
  const { id } = useParams();
  const oldname = allPokemons.find(e => e.id === id).name

  console.log(id)
  const [pokemon, setPokemon] = useState({ // set the initial state using the existing pokemon
    name: "",
    types: [],
    image: "",
    hp: 0,
    attack: 0,
    defense: 0,
    speed: 0,
    height: 0,
    weight: 0,
  });

  const [errors, setErrors] = useState({}); // store any validation errors

  useEffect(() => { //traigo types del back
    dispatch(getTypes())
  }, []);

  useEffect(() => {
    setErrors(validateForm(pokemon));
  }, [pokemon]);

  function handleSelect(e) {
    setPokemon({
      ...pokemon,
      types: [...pokemon.types, e.target.value],
    });
  }

  function onInputChange(e) {
    e.preventDefault();
    setPokemon({
      ...pokemon,
      [e.target.name]: e.target.value,
    });
  }

  function onSubmit(e) {
    e.preventDefault();
    if (Object.keys(errors).length > 0) {
      alert('Please correct the errors in the form');
      return;
    }
    dispatch(updatePokemon(id, pokemon)); // send the updated pokemon to the API via the updatePokemon action
    alert(`${oldname.charAt(0).toUpperCase() + oldname.slice(1)} has evolved into ${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}!`);
    history.push('/home');
  }

  return (
    <>
    <NavBar />
    <div>  
      <form onSubmit={onSubmit}>
        
        <div className="form-group2">
          <label htmlFor="name"> Name: </label>
          <input
            onChange={onInputChange}
            id="name"
            name="name"
            type="text"
            value={pokemon.name}
            className="input"
          />
        </div>
        {errors.name && <p className="error2"> {errors.name}</p>}
        <div className="form-group2">
          <label htmlFor="image">Image: </label>
          <input
            onChange={onInputChange}
            id="image"
            name="image"
            type="text"
            value={pokemon.image}
            className="input"
          />
        </div>
        {errors.image && <p className="error2"> {errors.image}</p>}
        <div className="form-group2">
          <label htmlFor="hp">Hp: </label>
          <input
            onChange={onInputChange}
            id="hp"
            name="hp"
            type="number"
            value={pokemon.hp}
            className="input"
          />
        </div>
        {errors.hp && <p className="error2"> {errors.hp}</p>}
        <div className="form-group2">
          <label htmlFor="attack">Attack: </label>
          <input
            onChange={onInputChange}
            id="attack"
            name="attack"
            type="number"
            value={pokemon.attack}
            className="input"
          />
        </div>
        {errors.attack && <p className="error2"> {errors.attack}</p>}
     <div className="form-group2">
        <label >Defense: </label>
        <input
          onChange={onInputChange}
          name="defense"
          type="number"
          value={pokemon.defense}
          className="input"
        />{" "}
      </div>
     {errors.defense && <p className="error2"> {errors.defense}</p>}
     
     <div className="form-group2">
        <label >Speed: </label>
        <input
          onChange={onInputChange}
          name="speed"
          type="number"
          value={pokemon.speed}
          className="input"
        />{" "}
      </div>
      {errors.speed && <p className="error2"> {errors.speed}</p>}
     
      <div className="form-group2">
        {" "}
        <label >Height: </label>
        <input
          onChange={onInputChange}
          name="height"
          type="number"
          value={pokemon.height}
          className="input"
        />{" "}
      </div>
      {errors.height && <p className="error2"> {errors.height}</p>}
     
      <div className="form-group2">
        <label >Weight: </label>
        <input
          onChange={onInputChange}
          name="weight"
          type="number"
          value={pokemon.weight}
          className="input"
        />{" "}
      </div>
      {errors.weight && <p className="error2"> {errors.weight}</p>}
      
        {" "}
      <div className="form-group2">
        <label >Types: </label>
        <p className="types">
        <select onChange={handleSelect}>
        <option value="" disabled selected hidden>Type 1</option>
          {types.map((e) => (
            <option  value={e.name}>{e.name}</option>
          ))}{" "}
        </select>
        </p>
        <p className="types2">
        <select onChange={handleSelect}>
        <option value="" disabled selected hidden>Type 2</option>
          {types.map((e) => (
            <option  value={e.name}>{e.name}</option>
          ))}{" "}
        </select>
        </p>
      </div>        
      <button type="submit" className="submit2">Evolve Pokemon</button>
    </form>
    </div>
    </>
  );
}