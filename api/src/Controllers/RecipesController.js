const axios = require("axios");
const { Recipe, Diet } = require("../db");
const NODE_ENV = process.env.NODE_ENV;
const { API_KEY1, API_KEY2, API_KEY3, API_KEY4, API_KEY5, API_KEY6  } = process.env;
/*
const getApiInfo = async () => {
  const callApi = await axios.get(
    `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`
  );
  const apiInfo = await callApi.data.results.map((e) => {
    return {
      id: e.id,
      image: e.image,
      name: e.title,
      dietTypes: e.diets,
      summary: e.summary,
      score: e.spoonacularScore,
      healthScore: e.healthScore,
      dishTypes: e.dishTypes,
      steps: e.analyzedInstructions[0]?.steps.map((e) => {
        return {
          number: e.number,
          step: e.step,
        };
      }),
    };
  });

  return apiInfo;
};
*/

const getApiInfo = () => {
  return axios
    .get(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY3}&addRecipeInformation=true&number=100`
    )
    .then((resolve) =>
      resolve.data.results.map((e) => {
        return {
          id: e.id,
          image: e.image,
          name: e.title.toLowerCase(),
          diets: e.diets.map((e) => {
            return { name: e };
          }),
          summary: e.summary,
          health_score: e.healthScore,
          dishtypes: e.dishTypes,
          step_by_step: e.analyzedInstructions[0]?.steps.map((e) => {
            return {
              number: e.number,
              step: e.step,
            };
          }),
        };
      })
    )
    .catch("Error en getApiInfo");
  // console.log(total.length);

  // return total;
};

const getDbInfo = async () => {
  const db = await Recipe.findAll({
    include: {
      model: Diet,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
  // console.log(db);
  return db;
};

const getTotal = async () => {
  try {
    const api = await getApiInfo();
    // console.log(typeof api);
    const db = await getDbInfo();
    const all = api.concat(db);
    // console.log(all.length);
    return all;
  } catch (error) {
    console.log("error en concatenacion/getTotal");
    console.log(error);
  }
};

module.exports = {
  getApiInfo,
  getDbInfo,
  getTotal,
};
