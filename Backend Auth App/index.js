const express = require("express");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 4000;
const url = process.env.MONGODB_URL;
console.log(PORT);
console.log("URL:", url);


//body parser
app.use(express.json());
//cookie parser
const cookieParser = require("cookie-parser");
app.use(cookieParser());

//Mounting all routes
const routes = require("./routes/user");
app.use("/api/v1", routes);

app.listen(PORT, ()=>{
    console.log(`Server startted at port ${PORT} SUCCESSFULLY`);
})

const dbconnect = require("./config/database");
dbconnect();

//default route when app launches
app.get("/", (req,res) => {
    res.send(`<h1>This is Authorization and Authentication Homepage</h1>`)
})