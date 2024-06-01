const User = require("../models/User")
const bcrypt = require("bcrypt");
const jwt =  require("jsonwebtoken");
require("dotenv").config();

 const register = async (req, res) => {

  
  const { username, email, password } = req.body;

  try {
    // HASH THE PASSWORD


    let user  = await User.findOne( { email});
    if(user)
    {
    return res.status(400).json({message: "Email is exist"});
    
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    console.log(hashedPassword);

    // CREATE A NEW USER AND SAVE TO DB
    
      //save user and respond
  
      user = await User.create( { username,email,  password : hashedPassword, });

    //return res.status(201).json({ message: "User created successfully" });

    return res.status(200).json({
      user: user,
      message : "User created successfully ! ",
  });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to create user!" });
  }
};


 const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // CHECK IF THE USER EXISTS

    const user = await User.findOne({ username});
    !user && res.status(404).json("user not found");

  

    // CHECK IF THE PASSWORD IS CORRECT
 
    const validPassword = await bcrypt.compare(password, user.password)
    !validPassword &&  res.status(400).json("wrong password")

    //if (!isPasswordValid)
      //return res.status(400).json({ message: "Invalid Credentials!" });

    // GENERATE COOKIE TOKEN AND SEND TO THE USER

    // res.setHeader("Set-Cookie", "test=" + "myValue").json("success")
    const age = 1000 * 60 * 60 * 24 * 7;

    const token = jwt.sign(
      {
        id: user.id,
        isAdmin: false,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: age }
    );

    const { password: userPassword, ...userInfo } = user._doc;

    //console.log(userInfo , " safsfsdfs " , user)
    res
      .cookie("token", token, {
        httpOnly: true,
        // secure:true,
        maxAge: age,
      })
      .status(200)
      .json(userInfo);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to login!" });
  }
};

 const logout = (req, res) => {
  res.clearCookie("token").status(200).json({ message: "Logout Successful" });
};


module.exports = {register , login , logout};