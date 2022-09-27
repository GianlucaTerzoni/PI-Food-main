const axios = require("axios");
const { Recipe, Diet } = require("../db");
const NODE_ENV = process.env.NODE_ENV;
const { API_KEY1, API_KEY2, API_KEY3, API_KEY4, API_KEY5, API_KEY6 } =
  process.env;

const getAllDiet = async () => {
  try {
    let diet = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY1}&addRecipeInformation=true&number=100`
    );

    let types = await diet.data.results.map((e) => e.diets);

    let another = types.flat(); 

    let typeDiet = [
      ...new Set(another),
      "vegetarian",
      "lacto vegetarian",
      "ovo vegetarian",
    ];

    typeDiet.forEach(async (e) => {
      await Diet.findOrCreate({
        where: { name: e },
      });
    });

    const allDiets = await Diet.findAll();
    console.log("All diets in db");
    return allDiets;
  } catch (error) {
    console.log(error);
  }
};

module.exports = getAllDiet;
