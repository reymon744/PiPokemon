import React from "react";
import "./Card.css";

export default function CardPokemon({ name, types, image }) {
  return (
    <div className="card">
      <h3 className="name"> 
      {name.charAt(0).toUpperCase() + name.slice(1)}
      </h3>
      <img src={image} alt="imagen" className="img" width="150px" height="150px"/>
      <ul className="typeCard">
        <li className="typeLi">          
        {typeof types[0] === 'string' ? types[0] : types[0]?.name} { }  
        {typeof types[1] === 'string' ? types[1] : types[1]?.name}
        </li>
      </ul>
    </div>
  );
}
