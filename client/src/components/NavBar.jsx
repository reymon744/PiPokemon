import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

export default function NavBar() {
  return (
      <div className="topDiv">
        <Link to="/home" className="menu"> Go Home </Link>
       <div> 
        <Link to="/create" className="menu" >Create Pokemon</Link>
       </div>  
      </div>

  );
}