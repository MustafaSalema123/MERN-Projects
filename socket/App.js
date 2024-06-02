// const { Server }  = require("socket.io");

// const io = new Server({
//     cors: {
//       origin: "http://localhost:5173",
//     },
//   });
// let onlineUser = [];

// const addUser = (userId, socketId) => {
//     const userExits = onlineUser.find((user) => user.userId === userId);
//     if (!userExits) {
//       onlineUser.push({ userId, socketId });
//     }
//   };

//   const removeUser = (socketId) => {
//     onlineUser = onlineUser.filter((user) => user.socketId !== socketId);
//   };
  
//   const getUser = (userId) => {
//     return onlineUser.find((user) => user.userId === userId);
//   };

//   io.on("connection", (socket) => { 
//     socket.on("newUser", (userId) => {    // newUSer  is  on SocketContext
//       addUser(userId, socket._id);
//     });
  
//     // socket.on("sendMessage", ({ receiverId, data }) => {   // on Chats in send button
//     //   const receiver = getUser(receiverId);
    
//     //   io.to(receiver.socketId).emit("getMessage", data);
//     // });

//     socket.on("sendMessage", ({ receiverId, data }) => {
//       // Log the receiverId to verify it's being received correctly
//       console.log(`Received receiverId: ${receiverId}`);
      
//       const receiver = getUser(receiverId);
      
//       if (receiver && receiver.socketId) {
//         io.to(receiver.socketId).emit("getMessage", data);
//         console.log(`Message sent to ${receiver.socketId}`);
//       } else {
//         console.error(`Receiver with ID ${receiverId} not found or missing socketId`);
//         // Optionally, you can send an error back to the sender
//         // socket.emit("errorMessage", { message: "Receiver not found or not connected" });
//       }
//     });
  
//     socket.on("disconnect", () => {
//       removeUser(socket.id);
//     });
//   });

const { Server } = require("socket.io");

const io = new Server({
  cors: {
    origin: "http://localhost:5173",
  },
});

let onlineUser = [];

const addUser = (userId, socketId) => {
  const userExits = onlineUser.find((user) => user.userId === userId);
  if (!userExits) {
    onlineUser.push({ userId, socketId });
  }
};

const removeUser = (socketId) => {
  onlineUser = onlineUser.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return onlineUser.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on("newUser", (userId) => {
    addUser(userId, socket.id);
    console.log(`New user added: ${userId} with socket ID: ${socket.id}`);
  });

  socket.on("sendMessage", ({ receiverId, data }) => {
    console.log(`Received receiverId: ${receiverId}`);
    const receiver = getUser(receiverId);

    if (receiver && receiver.socketId) {
      io.to(receiver.socketId).emit("getMessage", data);
      console.log(`Message sent to ${receiver.socketId}`);
    } else {
      console.error(`Receiver with ID ${receiverId} not found or missing socketId`);
    }
  });

  socket.on("disconnect", () => {
    removeUser(socket.id);
    console.log(`User disconnected: ${socket.id}`);
  });
});

 io.listen("4000")