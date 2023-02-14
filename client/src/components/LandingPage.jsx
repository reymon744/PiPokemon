import React from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css";

export default function LandingPage() {
    return (
      <body className="no-scroll">
      <div className="divLanding">
          <img className="image" src="https://wallpaperaccess.com/full/1805129.jpg" alt="" />
        <div>
          </div>
          <Link to="/home">
            <button className="buttonLanding"> ENTER </button>
          </Link>
      </div>
      </body>
    )
  }