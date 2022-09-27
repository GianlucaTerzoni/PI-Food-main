import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecipes, cleanRecipe } from "../actions";
import Card from "./Card";
import Paginado from "./Paginado";
import Filters from "./Filters";
import NavBar from "./NavBar";
import style from "./Home.module.css";

export default function Home() {
  const dispatch = useDispatch();
  const recipes = useSelector((state) => state.recipes);
  const [currentPage, setCurrentPage] = useState(1); //guardo la primer pagina
  const [recipesPerPage, setRecipesPerPage] = useState(9); //guardo cuantas recipes necesito x pagina
  const [order, setOrder] = useState("");
  const indexOfLastRecipe = currentPage * recipesPerPage; //9
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage; //0
  const allRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

  useEffect(() => {
    dispatch(getRecipes());
  }, [dispatch]);

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };


  function handleResert(e) {
    e.preventDefault();
    dispatch(cleanRecipe(dispatch));
    dispatch(getRecipes());
    window.location.reload();
  }

  return (
    <div className={style.container}>
      <div>
        <NavBar />
        <div>
          <div className={style.filtrado}>
            <Filters setCurrentPage={setCurrentPage} setOrder={setOrder} />
          </div>
          <div className={style.filtrado2}>
            <button onClick={(e) => handleResert(e)} className={style.box}>
              Clear Filters
            </button>
          </div>

          <Paginado
            paginado={paginado}
            allRecipes={recipes.length}
            recipesPerPage={recipesPerPage}
          />


          <div className={style.cards}>
            {allRecipes?.map((e) => {
              return (
                <div key={e.id}>
                  <Card
                    key={e.id}
                    id={e.id}
                    image={e.image}
                    name={e.name}
                    diets={e.diets}
                    health_score={e.health_score}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
