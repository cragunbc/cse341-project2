const { body, param, query, validationResult } = require("express-validator");

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    next();
};

// Recipe Validation

const createRecipeRules = () => [
    body("title").isString().notEmpty().withMessage("Title of recipe is required!"),
    body("author").isString().notEmpty().withMessage("Author of the recipe is required!"),
    body("cuisine").isString().notEmpty().withMessage("Cuisine of recipe is required!"),
    body("rating")
        .notEmpty()
        .withMessage("Rating of the recipe is required and to be a number!")
        .isInt({min: 1, max: 5})
        .custom((value) => {
            if (typeof value !== "number") {
                throw new Error("Rating must not be a string!");
            }
            return true;
        }),
    body("ingredients").isArray({min: 1}).withMessage("Ingredients must be an array of one item"),
    body("ingredients.*").isString().notEmpty().withMessage("Each ingredient must be a non-empty string"),
    body("cook_temp")
        .notEmpty()
        .withMessage("Cook temp of the recipe is required and to be a number!")
        .isInt({min: 1})
        .custom((value) => {
            if (typeof value !== "number") {
                throw new Error("Cook temp must not be a string!");
            }
            return true;
        }),
    body("cook_time")
        .notEmpty()
        .withMessage("Cook time of the recipe is required and to be a number!")
        .isInt({min: 1})
        .custom((value) => {
            if (typeof value !== "number") {
                throw new Error("Cook time must not be a string!");
            }
            return true;
        }),
];

const updateRecipeRules = () => [
    param("id").isMongoId().withMessage("Invalid recipe ID!"),
    body("title").optional().isString().notEmpty().withMessage("Title of recipe is required!"),
    body("author").optional().isString().notEmpty().withMessage("Author of the recipe is required!"),
    body("cuisine").optional().isString().notEmpty().withMessage("Cuisine of recipe is required!"),
    body("rating")
        .optional()
        .isInt({min: 1, max: 5})
        .custom((value) => {
            if (typeof value !== "number") {
                throw new Error("Rating must be a string!");
            }
            return true;
        }),
    body("ingredients").optional().isArray({min: 1}).withMessage("Ingredients must be an array of one item"),
    body("ingredients.*").optional().isString().notEmpty().withMessage("Each ingredient must be a non-empty string"),
    body("cook_temp")
        .optional()
        .isInt({min: 1})
        .custom((value) => {
            if (typeof value !== "number") {
                throw new Error("Cook temp must not be a string!");
            }
            return true;
        }),
    body("cook_time")
        .optional()
        .isInt({min: 1})
        .custom((value) => {
            if (typeof value !== "number") {
                throw new Error("Cook time must not be a string!");
            }
            return true;
        })
];

const getRecipeByIdRules = () => [
    param("id").isMongoId().withMessage("Invalid recipe ID!")
];

const deleteRecipeByIdRules = () => [
    param("id").isMongoId().withMessage("Invalid recipe ID!")
];


// User Validation

const createUserRules = () => [
    body("name").isString().notEmpty().withMessage("Name of user is required!"),
    body("age")
        .notEmpty()
        .withMessage("Age of the user is required!")
        .isInt({min: 1})
        .custom((value) => {
            if (typeof value !== "number") {
                throw new Error("Age must not be a string!");
            }
            return true;
        })
];

const updateUserRules = () => [
    param("id").isMongoId().withMessage("Invalid user ID!"),
    body("name").optional().isString().notEmpty().withMessage("Name of user is required!"),
    body("age")
        .optional()
        .isInt({min: 1})
        .custom((value) => {
            if (typeof value !== "number") {
                throw new Error("Age must not be a string!");
            }
            return true;
        })
];

const getUserByIdRules = () => [
    param("id").isMongoId().withMessage("Invalid user ID!")
];

const deleteUserByIdRules = () => [
    param("id").isMongoId().withMessage("Invalid user ID!")
];

module.exports = {
    validate, 
    createRecipeRules, 
    updateRecipeRules, 
    getRecipeByIdRules, 
    deleteRecipeByIdRules, 
    createUserRules,
    updateUserRules,
    getUserByIdRules,
    deleteUserByIdRules
}