import React, { useContext, useEffect, useRef, useState } from 'react'
import { AuthContext } from '../../context/AuthContext';
import apiRequest from '../../lib/apiRequest';
import { format } from "timeago.js";
import { socketContext } from '../../context/SocketContext';
import "./chat.scss";

export default function Chat({chats}) {

  const [chat, setChat] = useState(null);
  const { currentUser } = useContext(AuthContext);
  const { socket } = useContext(socketContext);

  //console.log(chats , " asdsf ")

 //console.log(currentUser , " asfds ")

  const messageEndRef = useRef();

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  const handleOpenChat = async (id, receiver) => {
    try {
      const res = await apiRequest("/chats/" + id);
      if (!res.data.seenBy.includes(currentUser._id)) {
       // decrease();
      }
      setChat({ ...res.data, receiver });
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const text = formData.get("text");

    if (!text) return;
    try {
      const res = await apiRequest.post("/messages/" + chat._id, { text });
      setChat((prev) => ({ ...prev, messages: [...prev.messages, res.data] }));
      e.target.reset();
      
      socket.emit("sendMessage", {
        receiverId: chat.receiver._id,
        data: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const read = async () => {
      try {
        await apiRequest.put("/chats/read/" + chat._id);
      } catch (err) {
        console.log(err);
      }
    };

    if (chat && socket) {
      socket.on("getMessage", (data) => {
        if (chat._id === data.chatId) {
          setChat((prev) => ({ ...prev, messages: [...prev.messages, data] }));
          read();
        }
      });
    }
    return () => {
      socket.off("getMessage");
    };
  }, [socket, chat]);

  const handleCreateChat = async (receiverId) => {
    try {
      const res = await apiRequest.post('/chats', { receiverId });
      const newChat = res.data;
      setChat(newChat);
      // Optionally, update the list of chats
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="chat">
    <div className="messages">
      <h1>Messages</h1>
      {chats?.map((c) => (
        <div
          className="message"
          key={c._id}
          style={{
            backgroundColor:
              c.seenBy.includes(currentUser._id) || chat?._id === c._id
                ? "white"
                : "#fecd514e",
          }}
          onClick={() => handleOpenChat(c._id, c.receiver)}
        >
          <img src={c.receiver?.avatar || "/noavatar.jpg"} alt="" />
          <span>{c.receiver?.username}</span>
          <p>{c.lastMessage}</p>
        </div>
      ))}
    </div>
    {/* <button onClick={() => handleCreateChat(receiverId)}>Start New Chat</button> */}
    {chat && (
      <div className="chatBox">
        <div className="top">
          <div className="user">
            <img src={chat.receiver?.avatar || "noavatar.jpg"} alt="" />
            {chat.receiver?.username}
          </div>
          <span className="close" onClick={() => setChat(null)}>
            X
          </span>
        </div>
        <div className="center">
          {chat.messages.map((message) => (
            <div
              className="chatMessage"
              style={{
                alignSelf:
                  message.userId === currentUser._id
                    ? "flex-end"
                    : "flex-start",
                textAlign:
                  message.userId === currentUser._id ? "right" : "left",
              }}
              key={message._id}
            >
              <p>{message.text}</p>
              <span>{format(message.createdAt)}</span>
            </div>
          ))}
          <div ref={messageEndRef}></div>
        </div>
        <form onSubmit={handleSubmit} className="bottom">
          <textarea name="text"></textarea>
          <button>Send</button>
        </form>
      </div>
    )}
  </div>
  )
}
