const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {
    try {
        const recipes = await mongodb
            .getDatabase()
            .db("recipes")
            .collection("recipes")
            .find()
            .toArray();

        res.setHeader("Content-Type", "application/json");
        res.status(200).json(recipes)
    
    } catch (error) {
        console.error("There was an error when getting all of your recipes: ", error);
        res.status(500).json({message: error.message || "An error occurred while getting all your recipes"});
    }
};


const getSingle = async (req, res) => {
    try {
        const recipeId = new ObjectId(req.params.id);
        const recipe = await mongodb
            .getDatabase()
            .db("recipes")
            .collection("recipes")
            .findOne({_id: recipeId});

        if (!recipe) {
            return res.status(404).json({message: "Your requested recipe doesn't exist"});
        }

        res.setHeader("Content-Type", "application/json");
        res.status(200).json(recipe)

    } catch (error) {
        console.error("There was an error when getting your recipe: ", error);
        res.status(500).json({message: error.message || "An error occurred while getting your recipe"});
    }
};


const createRecipe = async (req, res) => {
    // const recipeId = new ObjectId(req.params.id);
    try {
        const recipe = {
            title: req.body.title,
            author: req.body.author,
            cuisine: req.body.cuisine,
            rating: req.body.rating,
            ingredients: req.body.ingredients,
            cook_temp: req.body.cook_temp,
            cook_time: req.body.cook_time,
        };
        const response = await mongodb
            .getDatabase()
            .db("recipes")
            .collection("recipes")
            .insertOne(recipe);

        if (response.acknowledged) {
            return res.status(201).json({
                message: "Your recipe was created!"
            });
        }

    } catch (error) {
        console.error("There was an error when creating your recipe: ", error);
        res.status(500).json({message: error.message || "An error occurred while creating your recipe"});
    }
    
};


const updateRecipe = async (req, res) => {
    try {
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
        const response = await mongodb
            .getDatabase()
            .db("recipes")
            .collection("recipes")
            .replaceOne({_id: recipeId}, recipe);

        if (response.matchedCount === 0) {
            return res.status(404).json({
                message: "Your recipe was not found."
            });
        }

        return res.status(200).json({message: "Your recipe was updated!"});

    } catch (error) {
        console.error("There was an error when updating your recipe: ", error);
        res.status(500).json({message: error.message || "An error occurred when updating your recipe"});
    }

};


const deleteRecipe = async (req, res) => {
    try {
        const recipeId = new ObjectId(req.params.id);
        const response = await mongodb
            .getDatabase()
            .db("recipes")
            .collection("recipes")
            .deleteOne({_id: recipeId});

        if (response.deletedCount === 0) {
            return res.status(404).json({message: "Your recipe was not found."});
        }

        res.status(200).json({message: "Your recipe was successfully deleted."});

    } catch (error) {
        console.error("There was an error when deleting your recipe: ", error);
        res.status(500).json({message: error.message || "An error occurred while deleting the recipe."});
    }
    
};



module.exports = {
    getAll,
    getSingle,
    createRecipe,
    updateRecipe,
    deleteRecipe
};