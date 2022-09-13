const { Recipe, Diet } = require("../db");
const { getTotal } = require("../Controllers/RecipesController");
const { Router } = require("express");

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const name = req.query.name;
    const total = await getTotal();

    if (name) {
      let nameRecipe = total.filter((e) =>
        e.name.toLowerCase().includes(name.toLowerCase())
      );

      nameRecipe.length
        ? res.status(200).send(nameRecipe)
        : res.status(404).send("error en name.query");
    } else {
      return res.status(200).send(total);
    }
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const all = await getTotal();

    if (id) {
      const filter = all.filter((e) => e.id == id);

      filter.length
        ? res.status(200).send(filter)
        : res.status(404).send("Does not exist");
    } else {
      return res.status(404).send("ID not found");
    }
  } catch (error) {
    next(error);
  }
});

router.post("/create", async (req, res) => {
  try {
    const {
      name,
      image,
      diets,
      summary,
      health_score,
      dishtypes,
      step_by_step,
    } = req.body;
    console.log(req.body);
    
   
    
    const newRecipe = await Recipe.create({
      name,
      image,
      summary,
      health_score,
      dishtypes,
      step_by_step,
    });
    // console.log(newRecipe);
    diets.forEach(async (element) => {
      let newdiet = await Diet.findOne({
          where: {
              name: element 
          }
      })
      await newRecipe.addDiet(newdiet);                     
  });
  res.send('New Recipe created succesfully!');             
} catch (error) {
   res.send(error);
}

});

module.exports = router;
