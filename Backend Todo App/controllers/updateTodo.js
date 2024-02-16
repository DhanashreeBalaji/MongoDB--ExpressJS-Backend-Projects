//Import Model for database
const Todo = require("../models/Todo");

//route hadler to update Todo

exports.updateTodo = async(req,res) => {
    try{
       //To update an entry in db you should know its id which should be got from response
       //Also fetch the things to be updated from request
       const {id} = req.params;
       console.log(id);
       const {title, description} = req.body;
      
       //Find the entry for the id in db and update that entry
       const response = await Todo.findByIdAndUpdate(
        {_id:id},
        {title, description, updatedAt: Date.now()},
       )

        res.status(200).json({
        success:true,
        data: response,
        message:`Updated successfully`,
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