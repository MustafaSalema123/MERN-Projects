import Post from "../post/Post"
import Share from "../share/Share"
import "./feed.css"
//import { Posts } from "../../dummyData"
import {  useContext , useEffect, useState } from "react"
import axios from "axios"
import { AuthContext } from "../../context/AuthContext"
export default function Feed({username}) {

  const [posts , setPosts] = useState([]);

 const {user} = useContext(AuthContext)
  //const [text, setText]  = useState("");
 
  // useEffect(()=> {
  //   const fetchPost =  async () => {
  //     const res = await axios.get("posts/timeline/6630993a42018ae448154a49");
  //    // console.log(" adadd " ,res.data);
  //     setPosts(res.data);
  //   };
  //   fetchPost();
  // },[])

  useEffect(()=> {
    const fetchPost =  async () => {
      const res = username ?  await axios.get("/posts/profile/" + username) : await axios.get("posts/timeline/" + user._id) ;
      setPosts(res.data.sort((p1 , p2)=> {
        return new Date(p2.createdAt) - new Date(p1.createdAt);
      }));
    };
    fetchPost();
  },[username , user._id])


  //useEffect(()=> {console.log("feed renderer")},[text])
  return (
    <div className="feed">
      {/* <input type="text" onChange={e => setText(e.target.value)}></input> */}
      <div className="feedWrapper">
        { !username ||  username === user.username && < Share/>}
        {posts.map((p)=> (
          <Post key={p._id} post={p}/>
        ))}
       
      </div>
      
      </div>
  )
}
