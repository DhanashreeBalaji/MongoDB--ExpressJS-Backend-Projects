const express = require("express");
const router = express.Router();


//Import Controllers and middlewares
const{login, signup} = require("../controllers/Auth");
const{auth, isStudent, isAdmin} = require("../middlewares/auth");

//Normal login and signup routes, no need of any authentication
router.post("/signup", signup);
router.post("/login", login);

//Protected Routed,so user has to be authenticated before entering the route
//So Add middlewares
 

//testing protected routes for single middleware
router.get("/test" , auth, (req,res) => {
    //Entry Granted after authentication
    res.json({
        success:true,
        message:'Welcome to the Protected route for TESTS',
    });
});

//Protected Route

router.get("/student", auth, isStudent, (req,res) => {
    res.json({
        success:true,
        message:'Welcome to the Protected route for Students',
    });
})

router.get("/admin", auth, isAdmin, (req,res) => {
    res.json({
        success:true,
        message:'Welcome to the Protected route for Admin',
    });
});

// router.get("/getEmail" , auth, async (req,res) => {

//     try{
//         const id = req.user.id;
//         console.log("ID:" , id);
//         const user = await User.findById(id);

//         res.status(200).json({
//             success:true,
//             user:user,
//             message:'Welcome to the email route',
//         })
//     }
//     catch(error) {
//         res.status(500).json({
//             success:false,
//             error:error.message,
//             message:'Fatt gya code',
//         })
//     }

// });



module.exports = router;