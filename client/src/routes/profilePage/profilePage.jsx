import {   userData } from "../../lib/dummydata";
import { Link  , useNavigate} from "react-router-dom";
import "./profilePage.scss";
import List from "../../components/list/List";
import Chat from "../../components/chat/Chat";

import { listData } from "../../lib/dummydata";

export default function profilePage() {


  const navigate = useNavigate();

    const handleLogout = async () => {
      try {
        await apiRequest.post("/auth/logout");
      //  updateUser(null);
        navigate("/");
      } catch (err) {
        console.log(err);
      }
      };

      
  return (
    <div className="profilePage">
    <div className="details">
      <div className="wrapper">
        <div className="title">
          <h1>User Information</h1>
          <Link to="/profile/update">
            <button>Update Profile</button>
          </Link>
        </div>
        <div className="info">
          <span>
            Avatar:
            <img src={userData.img || "noavatar.jpg"} alt="" />
          </span>
          <span>
            Username: <b>{userData.name}</b>
          </span>
          <span>
            E-mail: <b> sddfgddg@gmail.com </b>
          </span>
          <button onClick={handleLogout}>Logout</button>
        </div>
        <div className="title">
          <h1>My List</h1>
          <Link to="/add">
            <button>Create New Post</button>
          </Link>
        </div>
        <h1>List data</h1>
        <List posts={listData}/>


        <div className="title">
          <h1>Saved List</h1>
        </div>
        <h1>List data</h1>
        <List posts={listData}/>


      </div>
    </div>
    <div className="chatContainer">
      <div className="wrapper">
      <h1>Chat data</h1>
       <Chat/>
      </div>
    </div>
  </div>
  )
}
