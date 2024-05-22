import axios from 'axios';
import React, { useState } from 'react'
import { toast } from 'react-toastify';

const MessageForm = () => {
  const [firstName , setFirstName] = useState("");
  const [lastName , setLastName] = useState("");
  const [email , setEmail] = useState("");
  const [phone , setPhone] = useState("");
  const [message , setMessage] = useState("");


  const handleSubmit = async (e) => 
    {
      e.preventDefault();
      try{

        await axios.post("http://localhost:4000/api/message/send" , {firstName , lastName , email , phone , message},
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
        ).then((res) => 
          {
            toast.success(res.data.message);
            setFirstName("");
            setLastName("");
            setEmail("");
            setPhone("");
            setMessage("");
          })

      }catch(err){

        toast.error(err.response.data.message);
        console.log("error " , err);
      }
    }
  return (
    <>
    <div className="container form-component message-form" >
      <h2>Send a Message</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input type="text" placeholder="first Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
          <input type="text" placeholder="last Name" value={lastName} onChange={(e)=> {setLastName(e.target.value)}}/>
        </div>
        <div>
          <input type="text" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="text" placeholder="phone" value={phone} onChange={(e) => setPhone(e.target.value)}/>
        </div>
        <textarea rows={7} placeholder="messages.."  value={message} onChange={(e) => setMessage(e.target.value)}/>
        <div style={{ justifyContent: "center", alignItems: "center" }}>
            <button type="submit">Send</button>
          </div>
      </form>
      <img src="/Vector.png" alt="vector" />
    </div>
    </>
  )
}

export default MessageForm