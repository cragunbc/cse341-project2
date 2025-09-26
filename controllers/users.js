const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {
    try {
        const users = await mongodb
            .getDatabase()
            .db("users")
            .collection("users")
            .find()
            .toArray();

        res.setHeader("Content-Type", "application/json");
        res.status(200).json(users)
        
    } catch (error) {
        console.error("There was an error when getting all of your users: ", error);
        res.status(500).json({message: error.message || "An error occurred when getting your contacts."})
    }
};


const getSingle = async (req, res) => {
    try {
        const userId = new ObjectId(req.params.id);
        const user = await mongodb
            .getDatabase()
            .db("users")
            .collection("users")
            .findOne({_id: userId});
            
            if (!user) {
                return res.status(404).json({message: "Your requested user doesn't exist"});
            }
            
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(user)

    } catch (error) {
        console.error("There was an error when getting your user: ", error);
        res.status(500).json({message: error.message || "An error occurred when getting your user"});
    }
};


const createUser = async (req, res) => {
    // const userId = new ObjectId(req.params.id);
    try {
        const user = {
            name: req.body.name,
            age: req.body.age,
        };
        const response = await mongodb
            .getDatabase()
            .db("users")
            .collection("users")
            .insertOne(user);

        if (response.acknowledged) {
            return res.status(201).json({
                message: "Your user was created!"
            });
        }

    } catch (error) {
        console.error("There was an error when creating your user: ", error);
        res.status(500).json({message: error.message || "An error occurred when creating your user"});
    }
};


const updateUser = async (req, res) => {
    try {
        const userId = new ObjectId(req.params.id);
            const user = {
            name: req.body.name,
            age: req.body.age,
        };
        const response = await mongodb
            .getDatabase()
            .db("users")
            .collection("users")
            .replaceOne({_id: userId}, user);

        if (response.matchedCount === 0) {
            return res.status(404).json({
                message: "Your user was not found."
            });
        }

        return res.status(200).json({message: "Your user was updated!"});

    } catch (error) {
        console.error("There was an error when updating your user: ", error);
        res.status(500).json({message: error.message || "An error occurred when updating your user"});
    }
};


const deleteUser = async (req, res) => {
    try {
        const userId = new ObjectId(req.params.id);
        const response = await mongodb
            .getDatabase()
            .db("users")
            .collection("users")
            .deleteOne({_id: userId});

        if (response.deletedCount === 0) {
            return res.status(404).json({message: "Your user was not found."});
        }

        res.status(200).json({message: "Your user was successfully deleted."})

    } catch (error) {
        console.error("There was an error when deleting your user: ", error)
        res.status(500).json({message: error.message || "An error occurred when deleting your user."});
    }
};



module.exports = {
    getAll,
    getSingle,
    createUser,
    updateUser,
    deleteUser
};