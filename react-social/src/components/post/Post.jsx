
import { MoreVert } from "@mui/icons-material"
import "./post.css"
//import { Users } from "../../dummyData"
import { useContext, useEffect,useState } from "react"
import axios from "axios"
import {format} from "timeago.js"
import { Link } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext"

export default function Post({post}) {
  const [like,setLike]= useState(post.likes.length);
  
  const [isLiked,setIsLiked]= useState(false);
  const [user,setUser]= useState({});
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  
  const { user : currentUser} = useContext(AuthContext);

  const [showOptions, setShowOptions] = useState(false);

  const isImage = /\.(jpg|jpeg|png)$/.test(post?.img); // Check if the post.img string ends with .jpg, .jpeg, or .png
  const fileType = isImage ? 'image' : 'video';
  //console.log(" post file type " , fileType);

  const handleMoreVertClick = () => {
    setShowOptions(true);
  };

  const handleCancelClick = () => {
    setShowOptions(false);
  };
 
  //console.log("delete post" , user ,  " "  ,user._id);

  const handleDeleteClick =  async () => {
     //console.log(" post id ",  post.userId  , " user id " , user._id);
    // Add code to delete here
    try{
     await axios.delete("/posts/"+ post._id , {data:  {userId:user._id}})
       window.location.reload();
     // console.log("delete post");
    }catch(err)
    {
      console.log(err);

    }
    setShowOptions(false);
  };

  useEffect(()=> 
  {
    setIsLiked(post.likes.includes(currentUser._id));
  }, [currentUser._id , post.likes]);

  useEffect(()=> {
    const fetchPost =  async () => {
      const res = await axios.get(`/users?userId=${post.userId}`);
     // console.log(" adadd " ,res.data);
     setUser(res.data);
    };
    fetchPost();
  },[post.userId])
  //console.log(post);

  const likeHandler = () =>
  {
    try {
      axios.put("/posts/" + post._id + "/like" , {userId :currentUser._id});
    }catch (err) {}
    setLike(isLiked ? like-1 : like+1)
    setIsLiked(!isLiked)
  }
  return (
    <div className="post">
      <div className="postWrapper">
      <div className="postTop">
        <div className="postTopLeft">
        {/* src={Users.filter((u) => u.id === post?.userId)[0].profilePicture} */}
        <Link to={`profile/${user.username}`}>
        {/* endwith(".mp4") */}

     
          <img className="postProfileImg"   src={user.profilePicture ? PF + user.profilePicture  : PF+"person/noAvatar.png"} alt="notOFound"/>
          </Link>
          {/* {Users.filter((u) => u.id === post?.userId)[0].username} */}
          <span className="postUserName">{user.username}</span>
          <span className="postDate">  {format(post.createdAt)}</span>
        </div>
        <div className="postTopRight" onClick={handleMoreVertClick}>
          {showOptions === false && (

          <MoreVert/>
          )}
        </div>
        {showOptions && (
        <div className="optionsBox">
          <button onClick={handleCancelClick}>Cancel</button>
          <button onClick={handleDeleteClick}>Delete</button>
        </div>
      )}
      </div>
      <div className="postCenter">
          <span className="postText">{post.desc}</span>
          {fileType === 'image'  &&  (  <img className="postImg" src={PF + post.img} alt="Image" /> ) }
          
         
        
      
          {/* <video
        // onClick={onVideoClick}
        className="postImg" 
        autoPlay
        src={PF + post.img}
        loop
      /> */}
          {/* <img className="postImg" src={PF+post.img} alt="notOFound"/> */}
      </div>
      <div className="postBottom">
      <div className="postBottomLeft">
      <img className="likeIcon" src={`${PF}like.png`}  alt="" onClick={likeHandler}/>
      <img className="likeIcon" src={`${PF}heart.png`}  alt="" onClick={likeHandler}/>
            <span className="postLikeCounter">{like}  people like it</span>
        </div>
        <div className="postBottomRight">
        {/* <img className="likeIcon" src="assests/like.png"  alt="" /> */}
            <span className="postCommentText">{post.comment} comments</span>
        </div>
      </div>
      </div>

    </div>
  )
}

