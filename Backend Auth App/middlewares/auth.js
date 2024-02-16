//auth, IsStudent,isAdmin

const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = (req,res,next) =>{
    try{
      
        //extract the JWT Token from request body  to the routes
        console.log("cookie" , req.cookies);
        console.log("body" , req.body.token);
        console.log("header", req.header("Authorization"));

        const token = req.cookies.token || req.body.token || req.header("Authorization").replace("Bearer ", "");
    

        if(!token || token === undefined){
            return res.status(401).json({
                success:false,
                message:'Token Missing',
            });
        }
           //Verify the fetched token from response and take out the payload and insert in the request
          try{
              const payload =   jwt.verify(token,process.env.JWT_SECRET);
              console.log(payload);
              req.user=payload;
              //payload will have email,id,role
          }catch(error){
                  return req.status(401).json(
                    {
                        success:false,
                        message:'token is invalid',
                    }
                  ); 
                        } 
                        next();

    }
    catch(error){
        console.log(error);
        return res.status(401).json({
            success:false,
            message:'Something went wrong, while verifying the token',
           
        });
    }

}

//isStudent authorization
exports.isStudent = (req,res,next) => {
    try{
       if(req.user.role !== "Student"){
        return res.status(401).json({
            success:false,
            message:'THis is a protected route for students',
        });
       }
       next();
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:'User Role is not matching',
        })
    }
}

//isAdmin Autyhorization
exports.isAdmin = (req,res,next) => {
    try{
       if(req.user.role !== "Admin"){
        return res.status(401).json({
            success:false,
            message:'THis is a protected route for admin',
        });
       }
       next();
    }
    catch(error){
        console.log(error);
        console.log(req.user.role);
        return res.status(500).json({
            success:false,
            message:'User Role is not matching',
        })
    }
}