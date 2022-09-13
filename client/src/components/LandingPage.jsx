import React from "react";
import { Link } from "react-router-dom";
import style from './LandingPage.module.css'

export default function LandingPage() {
  return (
    <div className={style.fondo}>
      <h1>¡Welcome!</h1>
      <h3>Recipes App</h3>
      <Link to="/home">
        <button className={style.box}>Home</button>
      </Link>
    </div>
  );
}
