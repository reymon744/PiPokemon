import React from "react";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDetails, removeSelectedPokemon } from "../redux/actions/index.js";
import './Detail.css'
import NavBar from "./NavBar.jsx";
export default function Detail() {
  const {id} = useParams()
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDetails(id)); //me viene el id de home por params
  }, [dispatch]);
 
  let details = useSelector((state) => state.detail); //traigo detail del estado de redux

  const handleClick = (e) => {    //remuevo el pokemon para que no este cuando cargo otro
    dispatch(removeSelectedPokemon())
  }

  return (
    <>
    <NavBar />
    <div className="container">
      
      <div>
        {details.length ? (
          details.map((p) => (   
            <> 
              <div>    
              <h1 className="id">#{p.id}</h1>
              <h1 className="names">{p.name.toUpperCase()}</h1>  

                <div className="threeColumns">    
                  <div className="theTypesDiv">                           
                      <h2 className="typesTitle"> Types:</h2>
                        {p.types.length === 2 ? (
                              <div>
                                <h3 className="type1">
                                <ul className="type">
                                  <li className="typeLiDetail">
                                    {
                                    typeof p.types[0] === 'string' ? p.types[0] : p.types[0]?.name}-  
                                    {
                                    typeof p.types[1] === 'string' ? p.types[1] : p.types[1]?.name}
                            
                                  </li>
                                </ul>
                                </h3>
                              </div>
                              ) : (
                              <div>
                                <h3 className="typeLiDetail2">{
                                typeof p.types[0] === 'string' ? p.types[0] : p.types[0]?.name}</h3>
                              </div>
                        )}
                  </div>
                  <div className="imageDetailDiv">
                    <img  className="imagen" src={p.image} alt=""/>
                  </div>
                  <div className="statsDiv">                    
                    <h2 className="statsTitle"> Stats:  </h2>
                    <ul className="uList">                      
                        <li className="list" >Hp: {p.hp}</li>
                        <li className="list" >Attack: {p.attack}</li>
                        <li className="list" >Defense: {p.defense}</li>
                        <li className="list" >Speed: {p.speed}</li>
                        <li className="list" >Height: {p.height}</li>
                        <li className="list" >Weight: {p.weight}</li>
                    </ul>                    
                  </div>
                </div> 
              </div> 
              </>              
          ))
        ) : (
          <img className="spaceForImage"
            src={"https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif"}
            width="250px" height="300px"
            alt="Not found"
          />
        )}
      </div>
      <div className="spaceForBack">
      <Link onClick= {(e) => handleClick(e)} to={`/update/${id}`} className="backLink"> Evolve Pokemon </Link>
      <div className="backBotonDetails"></div>
      <Link onClick= {(e) => handleClick(e)} to="/home" className="backLink"> Back </Link> 
       
      </div>
      
    </div>
    </>
  );
}
