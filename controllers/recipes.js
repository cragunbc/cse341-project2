const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {
    const result = await mongodb.getDatabase().db("recipes").collection("recipes").find();
    result.toArray().then((recipes) => {
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(recipes)
    })
    .catch((error) => {
        res.status(500).json({message: error});
    });
};


const getSingle = async (req, res) => {
    const recipeId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db("recipes").collection("recipes").find({_id: recipeId});
    result.toArray().then((recipes) => {
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(recipes[0])
    })
    .catch((error) => {
        res.status(500).json({message: error});
    });
};


const createRecipe = async (req, res) => {
    // const recipeId = new ObjectId(req.params.id);
    const recipe = {
        title: req.body.title,
        author: req.body.author,
        cuisine: req.body.cuisine,
        rating: req.body.rating,
        ingredients: req.body.ingredients,
        cook_temp: req.body.cook_temp,
        cook_time: req.body.cook_time,
    };
    const response = await mongodb.getDatabase().db("recipes").collection("recipes").insertOne(recipe);
    if (response.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || "An error occured while creating a recipe");
    }
};


const updateRecipe = async (req, res) => {
    const recipeId = new ObjectId(req.params.id);
        const recipe = {
        title: req.body.title,
        author: req.body.author,
        cuisine: req.body.cuisine,
        rating: req.body.rating,
        ingredients: req.body.ingredients,
        cook_temp: req.body.cook_temp,
        cook_time: req.body.cook_time,
    };
    const response = await mongodb.getDatabase().db("recipes").collection("recipes").replaceOne({_id: recipeId}, recipe);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || "An error occured while updating the recipe.")
    }
};


const deleteRecipe = async (req, res) => {
    const recipeId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db("recipes").collection("recipes").deleteOne({_id: recipeId});
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || "An error occured while deleting the recipe.")
    }
}



module.exports = {
    getAll,
    getSingle,
    createRecipe,
    updateRecipe,
    deleteRecipe
};