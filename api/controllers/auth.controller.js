const bcrypt = require("bcrypt");
const User = require("../models/userSchema")
const  jwt =require("jsonwebtoken");

require("dotenv").config(); 

const register = async (req , res) => {

    try{

        const { username ,email , password } = req.body;

        //Hash password
        const hashPassword = await bcrypt.hash(password , 10);
    
    
        // data to save in Db
        const newUser = new User({

            username ,
            email, 
            password : hashPassword,
        });

         //save in mongo db
        const user = await newUser.save();
        res.status(200).json(user);
       

        res.status(200).json({message: "Successfully  create a new User!" })
        

    }catch(err ) 
    { 
    console.log(err);
    res.status(500).json({message: "Failed to create User!" })
    }
   

}

const login =async (req , res) => {

    try {

        const {email , password } = req.body;

        const user =  await User.findOne({email});
        !user && res.status(404).json( {message:  "user not found" });

        const validPassword = await bcrypt.compare(password , user.password);
        !validPassword && res.status(400).json( { message : "wrong password" } )

        // GENERATE COOKIE TOKEN AND SEND TO THE USER

    // res.setHeader("Set-Cookie", "test=" + "myValue").json("success")
        const age = 1000 * 60 * 60 * 24 * 7;
        const token = jwt.sign({
            id : user.id,
            isAdmin: false,
        },process.env.JWT_SECRET_KEY,{ expiresIn: age } )


        const { password: userPassword, ...userInfo } = user;
        //res.status(200).json(user)

        res
      .cookie("token", token, {
        httpOnly: true,
        // secure:true,
        maxAge: age,
      })
      .status(200)
      .json(userInfo);

    }catch(err)
    {
        console.log(err);
        res.status(500).json({message: "Failed to login "});
    
    }

}
const logout = (req , res) => {

    es.clearCookie("token").status(200).json({ message: "Logout Successful" });
}

module.exports = {register , login , logout};