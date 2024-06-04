const router = require("express").Router();
const { model } = require("mongoose");
const Conversation = require("../models/Conversation")

//new Conv
// http://localhost:8080/api/conversation
// {
//   "senderId":"6630993a42018ae448154a20"   // id 
//   "receiverId":"6630993a42018ae448154a49"
// }
router.post("/" ,async (req , res)=> 
{
    const newConversation = new Conversation({
        members: [req.body.senderId , req.body.receiverId],
    });

    try{

        const savedConversation = await newConversation.save();
        res.status(200).json(savedConversation);
    }catch (err) {
        res.status(500).json(err);
      }
});

//get conv of a user


// http://localhost:8080/api/conversation/662f88c96db2344938967d20/follow
//getting the members array , _id , timestam[p {created at and updatded At}]
// router.post("/:userId" ,async (req , res)=> {
//     try
//     {
//         // $in value match within the array
//         const conversation = await Conversation.find({
//             members: { $in: [req.params.userId]}
//         });
//         res.status(200).json(conversation);
//     } catch (err) {
//         res.status(500).json(err);
//       }

// });

router.get("/:userId", async (req, res) => {
    try {
      const conversation = await Conversation.find({
        members: { $in: [req.params.userId] },
      });
      res.status(200).json(conversation);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  

// get conv includes two userId
router.get("/find/:firstUserId/:secondUserId", async (req, res) => {

    try{

        const conversation = await Conversation.findOne({
            members: { $all: [req.params.firstUserId, req.params.secondUserId] },
        });
        res.status(200).json(conversation)

    } catch (err) {
        res.status(500).json(err);
      }
});

module.exports = router;