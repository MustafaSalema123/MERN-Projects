
const Chat = require("../models/Chat")
const User = require("../models/User")

 const getChats = async (req, res) => {
  const tokenUserId = req.userId;

  try
  {
    // const chats = await Chat.find({
    //   userIDs: tokenUserId,
    // }).populate("messages");

    // for(const chat of chats)
    // {
    //   const receiverId = chat.userIDs.find((id) => id.toString() !== tokenUserId.toString());

    //   const receiver = await User.findById(receiverId, 'id username avatar');
    //   chat.receiver = receiver;
    // }

    // res.status(200).json(chats);

    const chats = await Chat.find({
      userIDs: tokenUserId,
    })
    .populate('messages')
    .populate('userIDs', 'id username avatar'); // Populate userIDs to get username and avatar

    // Attach the receiver information to each chat
    const chatsWithReceivers = chats.map(chat => {
      const receiver = chat.userIDs.find(user => user._id.toString() !== tokenUserId.toString());
      return {
        ...chat.toObject(),
        receiver: receiver
      };
    });

    res.status(200).json(chatsWithReceivers);


  }catch(err){
    console.log(err);
    res.status(500).json({ message: "Failed to get chats!" });
  }

};

const getChat = async (req, res) => {
  const tokenUserId = req.userId;
  try {
    const chat = await Chat.findOne({
      _id: req.params.id,
      userIDs: tokenUserId,
    }).populate('messages');

    if (!chat) {
      return res.status(404).json({ message: "Chat not found!" });
    }

    if (!chat.seenBy.includes(tokenUserId)) {
      chat.seenBy.push(tokenUserId);
      await chat.save();
    }

    res.status(200).json(chat);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get chat!" });
  }
};


const addChat = async (req, res) => {
  const tokenUserId = req.userId;
  try {
    const newChat = new Chat({
      userIDs: [tokenUserId, req.body.receiverId],
      users: [tokenUserId, req.body.receiverId],
    });
    await newChat.save();
    res.status(200).json(newChat);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to add chat!" });
  }
};

const readChat = async (req, res) => {

  const tokenUserId = req.userId;

  try {
    const chat = await Chat.findOneAndUpdate(
      {
        _id: req.params.id,
        userIDs: tokenUserId,
      },
      {
        $addToSet: { seenBy: tokenUserId },
      },
      { new: true }
    );

    if (!chat) {
      return res.status(404).json({ message: "Chat not found!" });
    }

    res.status(200).json(chat);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to read chat!" });
  }
  
};





module.exports = { getChats,getChat,addChat,readChat};