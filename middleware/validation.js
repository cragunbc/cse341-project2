const { body, param, query, validationResult } = require("express-validator");

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    next();
};

const createRecipeRules = () => [
    body("title").isString().notEmpty().withMessage("Title of recipe is required!"),
    body("author").isString().notEmpty().withMessage("Author of the recipe is required!"),
    body("cuisine").isString().notEmpty().withMessage("Cuisine of recipe is required!"),
    body("rating").isInt({min: 1, max: 5}).notEmpty().withMessage("Rating of the recipe is required!"),
    body("ingredients").isArray({min: 1}).withMessage("Ingredients must be an array of one item"),
    body("ingredients.*").isString().notEmpty().withMessage("Each ingredient must be a non-empty string"),
    body("cook_temp").isInt({min: 1}).notEmpty().withMessage("Cook temp for the recipe is required!"),
    body("cook_time").isInt({min: 1}).notEmpty().withMessage("Cook time for the recipe is required!")
];

const updateRecipeRules = () => [
    param("id").isMongoId().withMessage("Invalid recipe ID!"),
    body("title").optional().isString().notEmpty().withMessage("Title of recipe is required!"),
    body("author").optional().isString().notEmpty().withMessage("Author of the recipe is required!"),
    body("cuisine").optional().isString().notEmpty().withMessage("Cuisine of recipe is required!"),
    body("rating").optional().isInt({min: 1, max: 5}).withMessage("Rating of the recipe is required!"),
    body("ingredients").optional().isArray({min: 1}).withMessage("Ingredients must be an array of one item"),
    body("ingredients.*").optional().isString().notEmpty().withMessage("Each ingredient must be a non-empty string"),
    body("cook_temp").optional().isInt({min: 1}).withMessage("Cook temp for the recipe is required!"),
    body("cook_time").optional().isInt({min: 1}).withMessage("Cook time for the recipe is required!")
];

const getRecipeByIdRules = () => [
    param("id").isMongoId().withMessage("Invalid recipe ID!")
];

const deleteRecipeByIdRules = () => [
    param("id").isMongoId().withMessage("Invalid recipe ID!")
];

module.exports = {validate, createRecipeRules, updateRecipeRules, getRecipeByIdRules, deleteRecipeByIdRules}