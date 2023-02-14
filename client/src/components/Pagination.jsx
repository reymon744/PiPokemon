import React from "react";
import "./Pagination.css"

export default function Pagination({ pokemonsPerPage, allPokemons, pagination }) {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(allPokemons / pokemonsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul>
        {pageNumbers &&
          pageNumbers.map(number => {
             return <li className="numbers" key ='num'>
           <button className="buttonPages" onClick={() => pagination(number)}>
             {number}
              </button>
            </li>
          })}
      </ul>
    </nav>
  );
}