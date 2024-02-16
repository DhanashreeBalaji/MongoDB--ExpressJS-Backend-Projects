//Get a instance of the express and instantiate the server
const express = require("express");
const app = express();

//load config from env file. //LOAD .env file contents into process.env.
require("dotenv").config();
const PORT = process.env.PORT || 6000;

//Middleware to parse json request body
app.use(express.json());

//import routes for TODO API
const todoroutes = require ("./routes/todos");

//mount the todo api routes
app.use("/api/v1", todoroutes);

//start server on port
app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
})

//connect our app  to database
//import the method
const dbConnect = require("./config/database");
dbConnect();

//default route when app launches
app.get("/", (req,res) => {
    res.send(`<h1>This is TODO Homepage</h1>`)
})