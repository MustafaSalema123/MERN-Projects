const router = require("express").Router();
//const { query } = require("express");
const connection = require("../DBConnection")
const bcrypt = require("bcrypt");


//REGISTER
//http://localhost:8080/auth/register
// {
//     "username":"user1",
//     "email":"user@gmail.com",
//     "password":"qwerty"
// }
router.post("/register", async (req, res) => {
    try {
      //generate new password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
        
       
    //   //create new user
    //   const newUser = new User({
    //     username: req.body.username,
    //     email: req.body.email,
    //     password: hashedPassword,
    //   });

      // Insert new user into database
      const [result] = await connection.execute(
        "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
        [req.body.username, req.body.email, hashedPassword]
      );
  
      //save user and respond
     // const user = await newUser.save();
     //res.status(200).json({ id: result.insertId });
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json(err)
    }
  });

  //LOGIN
  //http://localhost:8080/auth/login
//   {
//     "email":"user@gmail.com",
//     "password":"qwerty"
// }
  router.post("/login", (req, res) => {
    
        
      
        const user = req.body;
        // Execute query to find user by email
        query = 'select * from users where email=?';

       connection.query(query , [user.email] ,async  (err,results)=> {
         
        if(!err){
         if(results <= 0){

            return res.status(400).json({message: 'Incorrect Username '});
         }   
        const validPassword = await bcrypt.compare(req.body.password, results[0].password);
        if (!validPassword) {
            return res.status(400).json({ error: "Wrong password" });
        }

        return res.status(200).json(user);
        }
        else
        {
            res.status(500).json({ error: "Internal Server Error" });
        }
    //  catch (err) {
    //     console.error(err);
    //     res.status(500).json({ error: "Internal Server Error" });
    });
})


// router.post('/login',(req,res)=>
// {
//     const user = req.body;
//     query = 'SELECT * FROM users WHERE email = ?'
//     connection.query(query , [user.email] , (err,results)=> {
        
//         if(!err)
//         {
//             const validPassword =  bcrypt.compare(req.body.password, user.password);
//             console.log("adad " ,validPassword)
//             if(validPassword != results[0].password)//results[0].password != user.password)
//             {
//              //  console.log("adad " ,results)
//                 //agar reslut nhi mila or pass word incorre t aya by query selectore
//                 return res.status(401).json({message: 'Incorrect Username or password'});
//             }else
//             {
//                 return res.status(200).json(user);
//                 //return res.status(400).json({message: 'Something went Wrong , please try again later'});
//             }


//         }else
//         {
//             return res.status(500).json(err);
//             res.status(500).json({ error: "Internal Server Error" });
//         }
//     })
// })

  
  module.exports = router;