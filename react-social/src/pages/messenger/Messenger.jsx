import "./messenger.css"

import Topbar from "../../components/Topbar/Topbar"
import Conversation from "../../components/conversation/Conversation"
import Message from "../../components/message/Message"
import Chatonline from "../../components/chatonline/Chatonline"
import { useContext, useEffect , useState ,useRef } from "react"
import { AuthContext } from "../../context/AuthContext"
import axios from "axios"

import { io } from "socket.io-client"

export default function Messenger() {

    //setConversations kis kis se baat kar chuke hai
    const [conversations, setConversations] = useState([]);
    const [currentChat, setcurrentChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessages, setNewMessages] = useState([]);
    const [socket, setSocket] = useState(null);

    const {user} = useContext(AuthContext);
    const scrollRef = useRef();


    useEffect(()=> {
       // setSocket(io("ws://localhost:8900"))
        setSocket( () => {  
         io("ws://localhost:8900")});
    }, [])

    useEffect(()=> {
        const getConversations = async () => {

            try{
                const res = await axios.get("/conversations/" + user._id);
                setConversations(res.data);
                //console.log(" res " , conversations , currentChat);
            }catch(err)
            {
                console.log(err);
            }
        };
        getConversations();
    },  [user._id])

    useEffect(()=> {
        const getMessages = async () => {

            try{
                const res = await axios.get("/messages/" + currentChat?._id);
                setMessages(res.data);
                console.log(" res " , res );
            }catch(err)
            {
                console.log(err);
            }
        };
        getMessages();
    },  [currentChat])


   const HandleSubmit = async (e) => 
   {
        e.preventDefault();
        const message = {
            sender: user._id,
            text :  newMessages,
            conversationId: currentChat._id,

        };

        try{
            const res = await axios.post("/messages/" , message);
            setMessages([...messages,res.data]);
            setMessages("");

        }catch(err)
        {
            console.log(err);
        }
   }  


   useEffect(() => 
   {
    scrollRef.current?.scrollIntoView({behavoir: "smooth"})
   }, [messages]);
  return (

    <>
    <Topbar/>
    <div className="messenger">
        <div className="chatMenu">
            <div className="chatMenuWrapper">
                <input placeholder="Search for friends" className="chatmenuInput"/>
                {conversations.map((c) => (
                <div onClick={() => setcurrentChat(c)}>
                <Conversation conversation={c}  currentUser={user}/>
                </div>

                ))}
           
                </div>
            </div>
                <div className="chatBox">
                    <div className="chatBoxWrapper">
                        {
                            currentChat ?
                        <>
                        <div className="chatBoxTop">
                            {messages.map(m => (  
                                
                                <div ref={scrollRef}>
                                <Message message={m} own={m.sender === user._id}/>
                                   </div> 
                            ))}
                            {/* <Message own={false}/> */}
                           
                           
                        </div>
                        <div className="chatBoxBottom">
                            <textarea className="chatMessageInput"  
                            onChange={(e)=> setNewMessages(e.target.value)}
                            value={newMessages} placeholder="write something... "></textarea>
                            <button className="chatSubmitButton" onClick={HandleSubmit}>Send</button>
                        </div>
                          </> : <span className="noConversationText">Open a conversation to start a Chat</span> }
                        
                        
                        
                    </div>
                </div>
       
                <div className="chatOnline">
                    <div className="chatOnlineWrapper">
                        <Chatonline />
                    </div>
                </div>

    </div>
    </>
  )
}
