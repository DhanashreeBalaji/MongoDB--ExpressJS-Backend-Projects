//Import Model for controller
 const Todo = require("../models/Todo")

//define route handler for the route createTodo. The route Handler refers to the method where logic is written.

exports.createTodo = async(req,res) => {
    try{
        //Get title and description from request body
        //create an entry in database by creating a new Todo Object
        //send a json response with a success flag
     const{title,description} = req.body;
     const response = await Todo.create({title,description});
     res.status(200).json(
       {
        success:true,
        data:response,
        message:'Entry Created Successfully'
       }
     );
    }

    catch(error){
        console.error(error);
        console.log(error);
        res.status(500)
        .json({
            success:false,
            data:"internal server error",
            message:error.message,
        })
    }
}