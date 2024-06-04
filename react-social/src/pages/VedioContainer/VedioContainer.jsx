
import { useState  ,useEffect } from "react";
import Video from "../../components/video/Video";
import "./vediocontainer.css"
import axios from "axios";
//import React from 'react'


export default function () {

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [vedioData,  setVedioData] = useState([]);
  useEffect(async () => {
   
    const data = [
      {
        channel: "ccc",
        song: "song-3",
        url: PF + "videos/vid3.mp4",
        likes: "89",
        comment: "23",
        shares: "29",
      },
      {
        channel: "aaa",
        song: "song-1",
        url: PF + "videos/1714729795576A performanc.mp4",
        likes: "32",
        comment: "2",
        shares: "23",
      },
      {
        channel: "bbb",
        song: "song-2",
        url: PF + "videos/vid2.mp4",
        likes: "3",
        comment: "22",
        shares: "23",
      },
      {
        channel: "ccc",
        song: "song-3",
        url: PF + "videos/vid3.mp4",
        likes: "89",
        comment: "23",
        shares: "29",
      },
    ];
    setVedioData(data);
  }, []); // Empty dependency array ensures this effect runs only once after the initial render

  
  //console.log(data)
    return (
      <div className="App">
        <center>
          <div className="logo">
            {/* <img alt="logo" src={Logo} className="insta-logo" /> */}
          </div>
          <h3>Reel</h3>
          {/*  */}
  
          <div className="video-container" id="video-container">
            {/*  */}
  
            {vedioData.map((list, i) => (
              <Video
                key={i}
                channel={list.channel}
                song={list.song}
                url={list.url}
                likes={list.likes}
                comment={list.comment}
                shares={list.shares}
              />
            ))}
  
            {/*  */}
          </div>
        </center>
      </div>
  )
}
