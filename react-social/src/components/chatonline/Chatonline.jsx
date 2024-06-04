
import "./chatonline.css"

import React from 'react'

export default function Chatonline() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  
  return (
    <div className="chatOnline">
    
      <div className="chatOnlineFriend" >
        <div className="chatOnlineImgContainer">
          <img
            className="chatOnlineImg"
            src={
              
                PF + "person/noAvatar.png"
            }
            alt=""
          />
          <div className="chatOnlineBadge"></div>
        </div>
        <span className="chatOnlineName">username</span>
      </div>
  
  </div>
  )
}
