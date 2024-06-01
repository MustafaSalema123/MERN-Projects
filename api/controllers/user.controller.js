const User = require("../models/User")
const bcrypt = require("bcrypt");
require("dotenv").config();


 const getUsers = async (req, res) => {
  
    try{

      const users = await User.find();
  // console.log("hcdshbchs ¸¸" ,users);
       res.status(200).json(users);

    }catch(err)
    {
      console.log(err);
    res.status(500).json({ message: "Failed to get users!" });
    }

};
const getUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await  User.findById(id)
  
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get user!" });
  }
};

const updateUser =async (req , res) => 
{
  const id = req.params.id;
  const tokenUserId = req.userId; //// req.userId is by verifyToekn
  const { password, avatar, ...inputs } = req.body;
 
  if (id !== tokenUserId) {
    return res.status(403).json({ message: "Not Authorized!" });
  }

  let updatedPassword = null;
  try {
    if (password) {
      updatedPassword = await bcrypt.hash(password, 10);
    }

    const updateData = {
      ...inputs,
      ...(updatedPassword && { password: updatedPassword }),
      ...(avatar && { avatar }),
    };

    console.log( "update data " ,updateData );

    const updatedUser = await User.findByIdAndUpdate(id, updateData, {
      new: true, // Returns the updated document
      runValidators: true, // Ensure the updated document passes schema validation
    });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found!" });
    }

  //  const { password: userPassword, ...rest } = updatedUser;
    const { password: userPassword, ...rest } = updatedUser.toObject();
    res.status(200).json(rest);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to update users!" });
  }
}

 const deleteUser = async (req, res) => {
  const id = req.params.id;
  const tokenUserId = req.userId; // req.userId is by verifyToekn

  if (id !== tokenUserId) {
    return res.status(403).json({ message: "Not Authorized!" });
  }

  try {
    await User.deleteOne({_id : id})
    res.status(200).json({ message: "User deleted" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to delete users!" });
  }
};



module.exports = { getUsers , getUser ,updateUser, deleteUser}

