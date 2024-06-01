
const Post = require("../models/Post")
const jwt =  require("jsonwebtoken");
const PostDetail = require("../models/PostDetail")
const User = require("../models/User")



 const getPosts = async (req, res) => {
  const { city, type, property, bedroom, minPrice, maxPrice } = req.query;

  const query = {
    ...(city && { city }),
    ...(type && { type }),
    ...(property && { property }),
    ...(bedroom && { bedroom: parseInt(bedroom) }),
    price: {
      ...(minPrice && { $gte: parseInt(minPrice) }),
      ...(maxPrice && { $lte: parseInt(maxPrice) }),
    },
  };

  // Remove empty price object if no minPrice and maxPrice are provided
  // if (!minPrice && !maxPrice) {
  //   delete query.price;
  // }
//console.log("query new " , query);
  try {
    const posts = await Post.find(query);
    ///console.log(posts , " xac ");
    res.status(200).json(posts);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get posts" });
  }
};





 const getPost = async (req, res) => {
  const id = req.params.id;
  try {
    const post = await Post.findById(id)
    .populate('postDetail')
    .populate('user', 'username avatar');

      console.log("get post ./ " , post);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    return res.status(200).json(post);

    //const token = req.cookies?.token;

    // if (token) {
    //   jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, payload) => {
    //     if (err) {
    //       return res.status(403).json({ message: "Invalid token" });
    //     }

    //     const saved = await SavedPost.findOne({
    //       postId: id,
    //       userId: payload.id,
    //     });

    //     res.status(200).json({ ...post.toObject(), isSaved: !!saved });
    //   });
    // } else {
    //   res.status(200).json({ ...post.toObject(), isSaved: false });
    // }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get post" });
  }
};

const addPost = async (req, res) => {
  const { postData, postDetail } = req.body;
  const tokenUserId = req.userId; // Assuming userId is available in req

  try {
    // Create a new post detail

    const NewpostData = new Post({
      ...postData,
      user: tokenUserId,
    });
    await NewpostData.save();
    const newPostDetail = new PostDetail({
      ...postDetail,
      post: NewpostData._id // Assuming you're passing the post _id from the frontend
    });
    await newPostDetail.save();
   // console.log( NewpostData._id ," assdsdd ", newPostDetail);
    // Create a new post

    

    res.status(200).json({ NewpostData});
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create post" });
  }
};


// const addPost = async (req, res) => 
// {

//   const body = req.body;
//   const tokenUserId = req.userId;

//   console.log(body);
//   try {
//     const postDetail = new PostDetail(body.postDetail);
//     await postDetail.save();

//     console.log("add postdetails ./ " , postDetail);
//     console.log("add body ./ " , body);

//     const newPost = new Post({
//       ...body.postData,
//       user: tokenUserId,
//       postDetail: postDetail._id,
//     });
//     console.log("new body ./ " , newPost);
//     await newPost.save();

//     res.status(200).json(newPost);
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ message: "Failed to create post" });
//   }

// }

const deletePost = async (req, res) => {
  const id = req.params.id;
  const tokenUserId = req.userId;

  try {
    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({ message: "Post not found!" });
    }

    if (post.user.toString() !== tokenUserId) {
      return res.status(403).json({ message: "Not Authorized!" });
    }

    await Post.findByIdAndDelete(id);

    res.status(200).json({ message: "Post deleted" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to delete post" });
  }
};


module.exports = {getPosts  , getPost , addPost , deletePost};