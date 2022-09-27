import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getDiets,
  FilterTypeDiet,
  FilterAZ,
  FilterMaxScore,
  FilterCreated,

} from "../actions";
import SearchBar from "./SearchBar";
import style from './Filters.module.css'

export default function Filters({ setCurrentPage, setOrder }) {
  const dispatch = useDispatch();
  const dieta = useSelector((state) => state.diets);


  useEffect(() => {
    dispatch(getDiets());
  }, [dispatch]);

  function handleTypeDiet(e) {
    e.preventDefault();
    dispatch(FilterTypeDiet(e.target.value));
    setCurrentPage(1);
  }
  function handleAZ(e) {
    e.preventDefault();
    dispatch(FilterAZ(e.target.value));
    setCurrentPage(1);
    setOrder(e.target.value);
  }

  function handleScore(e) {
    e.preventDefault();
    dispatch(FilterMaxScore(e.target.value));
    setCurrentPage(1);
    setOrder(e.target.value);
  }

  function handleCreated(e) {
    e.preventDefault();
    dispatch(FilterCreated(e.target.value));
    setCurrentPage(1);
  }



  return (
    <div className={style.flexi}>
      <div>
        <SearchBar />
      </div>
      <div>
        <label className={style.tipo}>Filter C-A</label>
        <select onChange={(e) => handleCreated(e)}>
          <option value="all">ALL</option>
          <option value="created">CREATED</option>
          <option value="api">API</option>
        </select>
      </div>

      <div>
        <label className={style.tipo}>Type of Diet</label>
        <select onChange={(e) => handleTypeDiet(e)}>
          <option value="all">ALL</option>
          {dieta?.map((e, k) => {
            return (
              <option key={k} value={e.name}>
                {e.name}
              </option>
            );
          })}
        </select>
      </div>

      <div>
        <label className={style.tipo}>Order</label>
        <select onChange={(e) => handleAZ(e)}>
          <option value="all">ALL</option>
          <option value="A-Z">A-Z</option>
          <option value="Z-A">Z-A</option>
        </select>
      </div>

      <div>
        <label className={style.tipo}>Health Score</label>
        <select onChange={(e) => handleScore(e)}>
          <option value="all">ALL</option>
          <option value="max">Máx</option>
          <option value="min">Min</option>
        </select>
      </div>

    </div>
  );
}
