const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users");
const {validate, createUserRules, updateUserRules, getUserByIdRules, deleteUserByIdRules} = require("../middleware/validation");

router.get("/", usersController.getAll);
router.get("/:id", getUserByIdRules(), validate, usersController.getSingle);
router.post("/", createUserRules(), validate, usersController.createUser);
router.put("/:id", updateUserRules(), validate, usersController.updateUser);
router.delete("/:id", deleteUserByIdRules(), validate, usersController.deleteUser);

module.exports = router;