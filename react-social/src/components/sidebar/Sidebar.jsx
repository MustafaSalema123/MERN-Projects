import { Bookmark, Chat, Event, Group, HelpOutline, PlayCircleFilledOutlined, RssFeed, School, WorkOutline } from "@mui/icons-material"
import "./sidebar.css"
import CloseFriend from "../closeFriend/CloseFriend"
import { Users } from "../../dummyData"
import { Link } from "react-router-dom"
export default function Sidebar() {
  return (
    <div className="sidebar"> 
    <div className="sidebarWrapper">
      <ul className="sidebarList">
          <li className="sidebarListItem">
            <Link to="/" style={{textDecoration:"none"}}>
            <RssFeed className="sidebarIcon"/>
            <span className="sidebarListItemText">Feed</span>
            </Link>
          </li>
          <li className="sidebarListItem">
            <Chat className="sidebarIcon"/>
            <Link to="/messenger" style={{textDecoration:"none"}}>
            <span className="sidebarListItemText">Chat</span>
            </Link>
          </li>
          <li className="sidebarListItem">
            <PlayCircleFilledOutlined className="sidebarIcon"/>
            <Link to="/reels" style={{textDecoration:"none"}}>
            <span className="sidebarListItemText">Videos</span>
            </Link>
          </li>
          <li className="sidebarListItem">
            <Group className="sidebarIcon"/>
            <span className="sidebarListItemText">Groups</span>
          </li>
          <li className="sidebarListItem">
            <Bookmark className="sidebarIcon"/>
            <span className="sidebarListItemText">Bookmars</span>
          </li>
          <li className="sidebarListItem">
            <HelpOutline className="sidebarIcon"/>
            <span className="sidebarListItemText">Questions</span>
          </li>
          <li className="sidebarListItem">
            <WorkOutline className="sidebarIcon"/>
            <span className="sidebarListItemText">Jobs</span>
          </li>
          <li className="sidebarListItem">
            <Event className="sidebarIcon"/>
            <span className="sidebarListItemText">Events</span>
          </li>
          <li className="sidebarListItem">
            <School className="sidebarIcon" />
            <span className="sidebarListItemText">Courses</span>
          </li>
          <button className="sidebarButton">Show More</button>
          <hr className="sidebarHr" />

      </ul>

      <ul className="sidebarFriendList">
       
          {Users.map((u) => (
            <CloseFriend key={u.id} user={u} />
          ))}

   
    
     
        </ul>
        
    </div>

    
    
    </div>
  )
}


/* {<l1 className="sidebarFriend">
<img className="sidebarFriendImg" src="/assests/person/2.jpeg" alt="not found"/>
<span className="sidebarFriendName">Jane Doe</span>
</l1> }*/