const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {
    const result = await mongodb.getDatabase().db("users").collection("users").find();
    result.toArray().then((users) => {
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(users)
    })
    .catch((error) => {
        res.status(500).json({message: error});
    });
};


const getSingle = async (req, res) => {
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db("users").collection("users").find({_id: userId});
    result.toArray().then((users) => {
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(users[0])
    })
    .catch((error) => {
        res.status(500).json({message: error});
    });
};


const createUser = async (req, res) => {
    // const userId = new ObjectId(req.params.id);
    const user = {
        name: req.body.name,
        age: req.body.age,
    };
    const response = await mongodb.getDatabase().db("users").collection("users").insertOne(user);
    if (response.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || "An error occured while creating a user");
    }
};


const updateUser = async (req, res) => {
    const userId = new ObjectId(req.params.id);
        const user = {
        name: req.body.name,
        age: req.body.age,
    };
    const response = await mongodb.getDatabase().db("users").collection("users").replaceOne({_id: userId}, user);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || "An error occured while updating the user.")
    }
};


const deleteUser = async (req, res) => {
    const userId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db("users").collection("users").deleteOne({_id: userId});
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || "An error occured while deleting the user.")
    }
}



module.exports = {
    getAll,
    getSingle,
    createUser,
    updateUser,
    deleteUser
};