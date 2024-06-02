
import { useContext, useState } from "react";
import "./navbar.scss";
import {   userData } from "../../lib/dummydata";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

function Navbar() {

  const [open , setOpen] = useState(false)

  const {currentUser} = useContext(AuthContext);  // by provider i get AuthContext.provide currentUser
  let user = true;
  let number = 2;
  return (
    <nav>
      <div className="left">
        <a href="/" className="logo">
          <img src="/logo.png" alt="" />
          <span>LamaEstate</span>
        </a>
        <a href="/">Home</a>
        <a href="/">About</a>
        <a href="/">Contact</a>
        <a href="/">Agents</a>
      </div>
      <div className="right">
      {currentUser ? (
          <div className="user">
            <img src={userData.img || "/noavatar.jpg"} alt="" />
            <span>{currentUser.username}</span>
            <Link to="/profile" className="profile">
              {number > 0 && <div className="notification">{number}</div>}
              <span>Profile</span>
            </Link>
          </div>
        ) : (
          <>
            {/* <a href="/login">Sign in</a> */}
            <Link to="login/">Sign in</Link>
            {/* <a href="/register" className="register">
              Sign up
            </a> */}
            <Link to="register/" className="register">  Sign up</Link>
          </>
        )}
      <div className="menuIcon">
          <img
            src="/menu.png"
            alt=""
            onClick={() => setOpen((prev) => !prev)}
          />
        </div>
        <div className={open ?  "menu active" : "menu"}>
          <a href="/">Home</a>
          <a href="/">About</a>
          <a href="/">Contact</a>
          <a href="/">Agents</a>
          <a href="/">Sign in</a>
          <a href="/">Sign up</a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
