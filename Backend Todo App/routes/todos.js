const express  = require("express");
const router = express.Router();

//import controller
const {createTodo} = require("../controllers/createTodo");
const {getAllTodo, getTodobyId} = require("../controllers/getTodo");
const {updateTodo} = require("../controllers/updateTodo");
const {deleteTodo} = require("../controllers/deleteTodo");



//define APi routes
router.post("/createTodo", createTodo);
router.get("/getAllRoutes",getAllTodo);
router.get("/getTodobyId/:id",getTodobyId);
router.put("/updateTodo/:id", updateTodo);
router.delete("/deleteTodo/:id", deleteTodo);

module.exports = router;