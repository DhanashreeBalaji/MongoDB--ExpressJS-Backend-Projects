// Handlers for login , signup

const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
//const { options } = require("../routes/user");


//signup route handler
exports.signup = async (req,res) => {
    try{  
          const {name,email,password,role} = req.body;
          const existingUser = await User.findOne({email});
          
          if(existingUser){
            return res.status(400).json({
                success:false,
                message:'User already exists,just login',
            });
          }

         let hashedpassword;
         try{
         hashedpassword = await bcrypt.hash(password, 10);
         }
       catch(err){
         return res.status(500).json({
            success:false,
            message:'Error in hashing password',
         });
       }
          //Creating entry in database, Model.Create({})
        const user = await User.create(
            {
                name,email,password:hashedpassword,role
            }
        )
        return res.status(200).json({
            success:true,
            message:'User Created Successfully',
        });
    }
    catch(error) {
        console.error(error);
        return res.status(500).json({
            success:false,
            message:'User cannot be registered, please try again later',
        });
    }
}        








//login
exports.login = async (req,res) =>{
    try{
      const{email,password} = req.body;
      if(!email || !password){
        return res.status(400).json({
                success:false,
                message:'Please fill all the details',
            });
      }
  
      let user = await User.findOne({email});
 
 if(!user){
    return res.status(401).json({
        success:false,
        message:'User is not registered. Please Sign up',
    });
 }
 //Now user object will have all details related to the email, got from database call.
 
 //Server will create Token 

  const payload = {
    email:user.email,
    id:user._id,
    role:user.role,  
  };

  //Verify password and generate a JWT Token
  //When login button is clicked then first email is validated,then password check, then token creation
  
 if(await bcrypt.compare(password,user.password)){
    //Password matched, so create token
    let token = jwt.sign(payload,
                         process.env.JWT_SECRET,
                        {
                          expiresIn:"2h",
                        });
  user = user.toObject();
  user.token = token;
  user.password = undefined;
// Now user object contains email,name, password:undefined, role,token

  const options = {
    expires: new Date( Date.now() + 3 * 24 * 60 * 60 * 1000),
    httpOnly:true,
  }

  //Send token in cookie as response
  res.cookie("token", token, options).status(200).json({
    success:true,
    token,
    user,
    message:'User Logged in successfully',
  });
  
  // res.status(200).json({
            //     success:true,
            //     token,
            //     user,
            //     message:'User Logged in successfully',
            // });
 }
 else{
    //Password do not match
    return res.status(403).json({
        success:false,
        message:"Password Incorrect,type it correctly",
    });
 }
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:'Login Failure, Please login again',
        });
    }
}