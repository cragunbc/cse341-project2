const express = require("express");
const router = express.Router();
const recipesController = require("../controllers/recipes");
const {validate, createRecipeRules, updateRecipeRules, getRecipeByIdRules, deleteRecipeByIdRules} = require("../middleware/validation");
const {isAuthenticated} = require("../middleware/authenticate");


router.get("/", recipesController.getAll);
router.get("/:id", getRecipeByIdRules(), validate, recipesController.getSingle);
router.post("/", createRecipeRules(), validate, recipesController.createRecipe);
router.put("/:id", isAuthenticated, updateRecipeRules(), validate, recipesController.updateRecipe);
router.delete("/:id", isAuthenticated, deleteRecipeByIdRules(), validate, recipesController.deleteRecipe);

module.exports = router;