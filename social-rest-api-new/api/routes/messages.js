const router = require("express").Router();
const Message = require("../models/Message");



//add

// router.post("/", async (res , req)=> 
// {
    
//     const newMessage = new Message(req.body);
//     try {
//         const savedMessage = await newMessage.save();
//         res.status(200).json(savedMessage);
//       } catch (err) {
//         res.status(500).json(err);
//       }

// })

//http://localhost:8800/api/messages
// {
//     "conversationId":"663369a5a8a89471546503dc",
//     "sender":"662f88c96db2344938967d20",
//     "text":"hey john  I am user1"
// }
router.post("/", async (req, res) => {
    const newMessage = new Message(req.body);
  
    try {
      const savedMessage = await newMessage.save();
      res.status(200).json(savedMessage);
    } catch (err) {
      res.status(500).json(err);
    }
  });

//get
router.get("/:conversationId", async (req, res) => {
    try {
      const messages = await Message.find({
        conversationId: req.params.conversationId,
      });
      res.status(200).json(messages);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  module.exports = router;
