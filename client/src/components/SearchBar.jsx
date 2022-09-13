import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getRecipeByName, getDiets } from "../actions";
import style from './SearchBar.module.css'

export default function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  function handleChange(e) {
    e.preventDefault();
    setName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (
      name === " " ||
      name === "," ||
      name === "-" ||
      name === "+" ||
      name === ":"
    ) {
      alert("search incorrectly");
    }

    dispatch(getRecipeByName(name));
    dispatch(getDiets());
    setName("");
  }

  return (
    <div className={style.search}>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          className={style.input}
          type="text"
          placeholder="Search..."
          value={name}
          onChange={(e) => handleChange(e)}
        />
        <button type="submit" className={style.btn}> Search</button>
      </form>
    </div>
  );
}
