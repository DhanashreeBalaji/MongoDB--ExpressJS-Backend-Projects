const  express = require("express");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 4000 ;

app.use(express.json());
//Middleware to interact with files
//simple express middlrware to upload files
const fileupload = require("express-fileupload");
app.use(fileupload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));

const dbConnect = require("./config/database");
dbConnect();

//cloud se connect karna
const cloudinary = require("./config/cloudinary");
cloudinary.cloudinaryConnect();

const Upload = require("./routes/Fileupload");
app.use('/api/v1/upload', Upload);

app.listen(PORT, () =>{
    console.log(`App is running at port ${PORT}`);
})