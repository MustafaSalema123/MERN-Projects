const User = require("../models/User")
const bcrypt = require("bcrypt");
const SavedPost = require("../models/SavedPost")
const Post = require("../models/Post")

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


const savePost = async (req, res) => {
  const postId = req.body.postId;
  const tokenUserId = req.userId;

  if (!postId) {
    return res.status(400).json({ message: "Post ID is required" });
  }

  try {

   // console.log("Received postId:", postId);
    //console.log("Received tokenUserId:", tokenUserId);


    // Check if the post is already saved by the user
    const savedPost = await SavedPost.findOne({
      user: tokenUserId,
      post: postId,
    });

    if (savedPost) {
      // If found, remove it
      await SavedPost.deleteOne({ _id: savedPost._id });
      res.status(200).json({ message: "Post removed from saved list" });
    } else {
      // If not found, create a new saved post
      const newSavedPost = new SavedPost({
        user: tokenUserId,
        post: postId,
      });
      await newSavedPost.save();
      res.status(200).json({ message: "Post saved" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to save or remove post!" });
  }
};

const profilePosts = async (req, res) => {
  const tokenUserId = req.userId; // Assuming req.userId is set by authentication middleware
  //console.log(tokenUserId , " sadaf ");
  try {
    // Find all posts created by the user
    
    const userPosts = await Post.find({ user: tokenUserId });

    if (!userPosts) {
      return res.status(400).json({ message: "userPost ID is required" });
    }
    // Find all saved posts by the user
    const saved = await SavedPost.find({ user: tokenUserId }).populate('post');
    if (!saved) {
      return res.status(400).json({ message: "saveduser ID is required" });
    }
    // Extract the posts from the saved documents
    const savedPosts = saved.map((item) => item.post);

    res.status(200).json({ userPosts, savedPosts });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get profile posts!" });
  }
};


module.exports = { getUsers , getUser ,updateUser, deleteUser  ,savePost , profilePosts}

