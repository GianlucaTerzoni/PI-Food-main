import axios from "axios";
export const GET_RECIPE = "GET_RECIPE";
export const CLEAN_RECIPE = "CLEAN_RECIPE";
export const GET_DIETS = "GET_DIETS";
export const CLEAN_DIETS = "CLEAN_DIETS";
export const POST_RECIPE = "POST_RECIPE";
export const GET_DETAIL = "GET_DETAIL";
export const FILTER_DB = "FILTER_DB";
export const FILTER_A_Z = "FILTER_A_Z";
export const FILTER_DIET = "FILTER_DIET";
export const FILTER_SCORE = "FILTER_SCORE";
export const FILTER_BY_NAME = "FILTER_BY_NAME";
export const CLEAN_DETAIL = "CLEAN_DETAIL";



export function getRecipes() {
  return async (dispatch) => {
      try {
          let json = await axios.get('http://localhost:3001/recipes'); //conecto el back con el front
          return dispatch({
              type: GET_RECIPE,
              payload: json.data,
          });
      } catch (error) {
          console.log(error);
      }
  };
}

export function getDiets() {
  return async (dispatch) => {
      try {
          let dieta = await axios.get('http://localhost:3001/diets');
          return dispatch({
              type: GET_DIETS,
              payload: dieta.data,
          });
      } catch (error) {
          console.log(error);
      }
  };
}

export function FilterTypeDiet(payload) {
  return {
    type: FILTER_DIET,
    payload,
  }
}

export function FilterAZ(payload) {
  return {
    type: FILTER_A_Z,
    payload,
  }
}

export function FilterMaxScore(payload) {
  return {
    type: FILTER_SCORE,
    payload,
  }
}

export function FilterCreated(payload) {
  return {
      type: FILTER_DB,
      payload,
  };
}

export function getRecipeByName(name){
  return async(dispatch) => {
     try{
        let json = await axios.get(`http://localhost:3001/recipes?name=${name}`)
        return dispatch({
          type: FILTER_BY_NAME,
          payload: json.data
        })

     }catch(error){
      alert('Recipe not found')
      console.log(error)
     }
  }
}

export function getDetail(id) {
  return async (dispatch) => {
    try{
      let json = await axios.get(`http://localhost:3001/recipes/${id}`)
      return dispatch({
        type: GET_DETAIL,
        payload: json.data
      })
    }catch (error) {
      console.log('Error!')
      console.log(error)
    }
  }
}

export function cleanRecipe(dispatch){
    return dispatch({
      type: CLEAN_DIETS,
      payload: [],
    })
}

export function cleanDiets(dispatch){
    return dispatch({
      type: CLEAN_DIETS,
      payload: [],
    })
}

export function cleanDetail(dispatch) {
  return dispatch({
    type: CLEAN_DETAIL,
    payload: [],
  })
}


export function postRecipe (payload) {
  return async () => {
        try{
          let json = await axios.post('http://localhost:3001/recipes/create', payload)
          alert('New recipe created succesfully')
          return json
        }catch(error){
          console.log('Error!')
          console.log(error)
        }
  }
}


