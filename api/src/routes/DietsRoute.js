const { Router } = require("express");
const getAllDiet = require("../Controllers/DietController");

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const dieta = await getAllDiet();
    res.status(200).send(dieta);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
