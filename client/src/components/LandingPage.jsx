import React from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css";
import landingImage from "../Images/landingPage.jpg"

export default function LandingPage() {
    return (
      <body className="no-scroll">
      <div className="divLanding">
          <img className="image" src={landingImage} alt="" />
        <div>
          </div>
          <Link to="/home">
            <button className="buttonLanding"> ENTER </button>
          </Link>
      </div>
      </body>
    )
  }