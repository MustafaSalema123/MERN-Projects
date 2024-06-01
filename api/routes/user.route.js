const express =  require("express");
const { getUsers , getUser , updateUser , deleteUser} = require("../controllers/user.controller");
const verifyToken = require("../middleware/verifyToken")

const router = express.Router();

router.get("/", getUsers);
router.get("/:id", getUser);
router.put("/:id", verifyToken, updateUser);
router.delete("/:id", verifyToken, deleteUser);
// router.post("/save", verifyToken, savePost);
// router.get("/profilePosts", verifyToken, profilePosts);
// router.get("/notification", verifyToken, getNotificationNumber);

module.exports= router;
