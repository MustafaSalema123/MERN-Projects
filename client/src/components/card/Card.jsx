import { Link } from "react-router-dom";
import "./card.scss";
import React, { useContext} from 'react'
import { AuthContext } from '../../context/AuthContext';


function Card( { item }) 
{

  const { currentUser } = useContext(AuthContext);

  return (

    <div className="card">
    <Link to={`/${item._id}`} className="imageContainer">
      <img src={item.images[0]} alt="" />
    </Link>
    <div className="textContainer">
      <h2 className="title">
        <Link to={`/${item._id}`}>{item.title}</Link>
      </h2>
      <p className="address">
        <img src="/pin.png" alt="" />
        <span>{item.address}</span>
      </p>
      <p className="price">$ {item.price}</p>
      <div className="bottom">
        <div className="features">
          <div className="feature">
            <img src="/bed.png" alt="" />
            <span>{item.bedroom} bedroom</span>
          </div>
          <div className="feature">
            <img src="/bath.png" alt="" />
            <span>{item.bathroom} bathroom</span>
          </div>
        </div>
        {item.user !== currentUser._id ? (
          <div className="icons">
            <div className="icon">
              <img src="/save.png" alt="" />
            </div>
            <div className="icon">
              <img src="/chat.png" alt="" />
            </div>
          </div>
          ) : null}
        {/* <div className="icons">
          <div className="icon">
            <img src="/save.png" alt="" />
          </div>
          <div className="icon">
            <img src="/chat.png" alt="" />
          </div>
        </div> */}

      </div>
    </div>
  </div>
  )
}


export default Card;