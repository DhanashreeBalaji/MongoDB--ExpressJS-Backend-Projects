//Import models
const Todo = require("../models/Todo");

exports.getAllTodo = async (req,res) => {
    try{
      //fetch all todos from database
        const response = await Todo.find({});
        res.status(200).json(
            {
             success:true,
             data:response,
             message:'All Todo Data is fetched'
            }
          );
    }
    catch(err){
        console.error(err);
        res.status(500).json(
            {
                success:false,
                error:err.message,
                message:"Server Error"
            }
        )
    }
}

//Fetch the Todo details based on ID
//In database there will be an id for each entry. The variable is like "_id" in the database
exports.getTodobyId = async (req,res) =>{
    try{
     const id = req.params.id;
     const Todo = await Todo.findById( {_id:id} ) 
     console.log("TODO IS",Todo);
     //If data for given id is not found
     if(!Todo){
        console.log("TODO IS",Todo);
        return res.status(404).json(
            {
                success:false,
                message:"No data found with given id in database",
            }
            )}
           // If data for given id is found return response along with the todo
           res.status(200).json(
            {
                success:true,
                data:Todo,
                message:`Todo for id ${id} is successfully fetched`,
            }
           )

    }
    catch(err){
        console.error(err);
        res.status(500)
        .json({
            success:false,
            error:err.message,
            message:'Server Error',
        });
    }
}