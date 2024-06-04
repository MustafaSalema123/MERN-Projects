const router = require("express").Router();
const bcrypt = require("bcrypt");
const connection = require("../DBConnection");

// Update user
//http://localhost:8080/users/id
router.put("/:id", async (req, res) => {
    
    let id = req.params.id;
    let user = req.body;
    var query = "update users set city=?,`desc`=? where id=?";
    connection.query(query, [user.city,user.desc,id], (err, results) => {
        if (!err) {
            if (results.affectedRows == 0) {
                return res.status(404).json({ message: "user id does not found" });
            }
            return res.status(200).json({ message: "user Updated Successfully" });
        }
        else {
            return res.status(500).json(err);
        }
    })

    //const user = req.params.id;
    // let id = req.params.id;
    
    // query = 'SELECT * FROM users WHERE id = ?';
    // // const [userRows] = await connection.execute(
    // //   "SELECT isAdmin FROM users WHERE id = ?",
    // //   [req.params.id]
    // // );
    // connection.query(query , [id] ,async  (err,results)=> {

    //     let user = req.body;

    //     if(!err){
    //     const isAdmin = results[0].isAdmin;
    //     if (user.userId === req.params.id || isAdmin) {
    //         // if (req.body.password) {
    //         //   const salt = await bcrypt.genSalt(10);
    //         //   req.body.password = await bcrypt.hash(req.body.password, salt);
    //         // }
    //         var query = "update users set desc=? where id=?";
    //         // await connection.execute(
    //         //   "UPDATE users SET username = ?, email = ?, password = ?, isAdmin = ? WHERE id = ?",
    //         //   [req.body.username, req.body.email, req.body.password, req.body.isAdmin, req.params.id]
    //         // );
    //         connection.query(query, [user.desc,id], (err, results) => {})
    //         return res.status(200).json("Account has been updated");
    //       } else {
    //         return res.status(403).json("You can update only your account!");
    //       }
    //     }
    // });

   
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
});

// Delete user
router.delete("/:id", async (req, res) => {
  try {
    const [userRows] = await connection.execute(
      "SELECT isAdmin FROM users WHERE id = ?",
      [req.params.id]
    );
    const isAdmin = userRows[0].isAdmin;

    if (req.body.userId === req.params.id || isAdmin) {
      await connection.execute(
        "DELETE FROM users WHERE id = ?",
        [req.params.id]
      );
      res.status(200).json("Account has been deleted");
    } else {
      res.status(403).json("You can delete only your account!");
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get a user
router.get("/:id", (req, res) => {
  try {

    let id = req.params.id;
    query = 'SELECT id, username, email, created_At FROM users WHERE id = ?';
    // const [rows] = await connection.execute(
    //   "SELECT id, username, email, createdAt FROM users WHERE id = ?",
    //   [req.params.id]
    // );
    connection.query(query , [id] , (err,results)=> {
        if(!err){
        
       const user = results[0];
        if (user) {
        return  res.status(200).json(user);
        } else {
         return res.status(404).json({ error: "User not found" });
        }
        }else
        {
          return  res.status(500).json({ error: "Internal Server Error" });
        }
        
    })
    } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Follow a user
router.put("/:id/follow", async (req, res) => {
  try {
    await connection.execute(
      "INSERT INTO followers (follower_id, followed_id) VALUES (?, ?)",
      [req.body.userId, req.params.id]
    );
    res.status(200).json("User has been followed");
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Unfollow a user
router.put("/:id/unfollow", async (req, res) => {
  try {
    await connection.execute(
      "DELETE FROM followers WHERE follower_id = ? AND followed_id = ?",
      [req.body.userId, req.params.id]
    );
    res.status(200).json("User has been unfollowed");
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
