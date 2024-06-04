const router = require("express").Router();
const connection = require("../DBConnection");

// Create post
router.post("/", async (req, res) => {
    try {
      const [result] = await connection.execute(
        "INSERT INTO posts (userId, description, img) VALUES (?, ?, ?)",
        [req.body.userId, req.body.desc, req.body.img]
      );
      res.status(200).json({ postId: result.insertId });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  // Update post
router.put("/:id", async (req, res) => {
    try {
      const [rows] = await connection.execute(
        "SELECT userId FROM posts WHERE id = ?",
        [req.params.id]
      );
      const postUserId = rows[0].userId;
  
      if (postUserId === req.body.userId) {
        await connection.execute(
          "UPDATE posts SET description = ?, img = ? WHERE id = ?",
          [req.body.desc, req.body.img, req.params.id]
        );
        res.status(200).json("The post has been updated");
      } else {
        res.status(403).json("You can update only your post");
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  // Delete post
router.delete("/:id", async (req, res) => {
    try {
      const [rows] = await connection.execute(
        "SELECT userId FROM posts WHERE id = ?",
        [req.params.id]
      );
      const postUserId = rows[0].userId;
  
      if (postUserId === req.body.userId) {
        await connection.execute(
          "DELETE FROM posts WHERE id = ?",
          [req.params.id]
        );
        res.status(200).json("The post has been deleted");
      } else {
        res.status(403).json("You can delete only your post");
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  // Like / Dislike post
router.put("/:id/like", async (req, res) => {
    try {
      const [rows] = await connection.execute(
        "SELECT likes FROM posts WHERE id = ?",
        [req.params.id]
      );
      const likes = JSON.parse(rows[0].likes);
  
      if (!likes.includes(req.body.userId)) {
        likes.push(req.body.userId);
        await connection.execute(
          "UPDATE posts SET likes = ? WHERE id = ?",
          [JSON.stringify(likes), req.params.id]
        );
        res.status(200).json("The post has been liked");
      } else {
        const index = likes.indexOf(req.body.userId);
        likes.splice(index, 1);
        await connection.execute(
          "UPDATE posts SET likes = ? WHERE id = ?",
          [JSON.stringify(likes), req.params.id]
        );
        res.status(200).json("The post has been disliked");
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
  

  
// Get a post
router.get("/:id", async (req, res) => {
    try {
      const [rows] = await connection.execute(
        "SELECT * FROM posts WHERE id = ?",
        [req.params.id]
      );
      res.status(200).json(rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
  
  // Get timeline posts
router.get("/timeline/all", async (req, res) => {
    try {
      const [userRows] = await connection.execute(
        "SELECT followings FROM users WHERE id = ?",
        [req.body.userId]
      );
      const followings = JSON.parse(userRows[0].followings);
      
      const promises = followings.map(async (friendId) => {
        const [friendPosts] = await connection.execute(
          "SELECT * FROM posts WHERE userId = ?",
          [friendId]
        );
        return friendPosts;
      });
      
      const results = await Promise.all(promises);
      const userPosts = await connection.execute(
        "SELECT * FROM posts WHERE userId = ?",
        [req.body.userId]
      );
      res.json([].concat(...results, userPosts[0]));
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
  
  module.exports = router;