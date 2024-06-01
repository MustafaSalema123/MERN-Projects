const express =  require("express");
const {  getPosts  , getPost , addPost , deletePost } = require("../controllers/post.controller");
const verifyToken = require("../middleware/verifyToken");


const router = express.Router();

router.get("/", getPosts);

router.get("/:id", getPost);
router.post("/", verifyToken, addPost);
//router.put("/:id", verifyToken, updatePost);
router.delete("/:id", verifyToken, deletePost);

module.exports= router;
