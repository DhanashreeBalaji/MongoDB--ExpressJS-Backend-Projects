const mongoose = require("mongoose");

//LOAD .env file contents into process.env.
require("dotenv").config();

//Method to connect to db. When this method called our application willl connect to database
const dbConnect = () =>{

   mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser:true,
        useUnifiedTopology: true,
   })
     .then(() => console.log("DB Ka connection is successful"))
     .catch( (error) =>{
        console.log("Issue in DB Connection");
        console.error(error.message);
        process.exit(1);
     } );
}

module.exports = dbConnect;