import React from "react";
import style from './Pagination.module.css'

export default function Paginado({ recipesPerPage, allRecipes, paginado }) {
  const pageNumber = [];

  for (let i = 1; i <= Math.ceil(allRecipes / recipesPerPage); i++) {
    //math.ceil redondea para arriba
    pageNumber.push(i);
  }

  return (
    <nav className={style.nav}>
      <ul className={style.ul}>
        {pageNumber &&
          pageNumber.map((number) => (
            <li key={number}>
              <span 
              className={style.span}
              onClick={() => paginado(number)}>{number}</span>
            </li>
          ))}
      </ul>
    </nav>
  );
}
