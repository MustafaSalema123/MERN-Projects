

import { useRef } from "react"
import "./register.css"
import axios  from "axios";
import { Link, useNavigate } from 'react-router-dom';
//import {useHistory} from "react-router"
export default function Register() {

  const username = useRef();
  const email = useRef();
  const password  = useRef();
  const passwordAgain  = useRef();
  //const history = useHistory();
  const navigate = useNavigate();

  const HandleClick = async (e) => 
  {
    e.preventDefault();
    // if(passwordAgain.current.value !== password.current.value)
    // {
    //   console.log( passwordAgain.current.value ,  password.current.value )
    //   passwordAgain.current.setCustomValidity("Password don't match ");
    // }else
    // {
      const user = 
      {
        username : username.current.value,
        email : email.current.value,
        password : password.current.value,
      };

      try 
      {
        await axios.post("/auth/register", user);
        //history.push("/login")
        navigate('/login');



      }catch (err)
      {
        console.log(err);
      }
    //}

  }
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Mysocial</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on Mysocial.
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={HandleClick}>
            <input placeholder="Username" required className="loginInput" ref={username} />
            <input placeholder="Email" required  className="loginInput" ref={email} />
            <input placeholder="Password" required className="loginInput" ref={password} />
            <input placeholder="Password Again" required className="loginInput" ref={passwordAgain}  />
            <button className="loginButton" type="submit">Sign Up</button>
          
          </form>
          <Link to="/login">
          <button className="loginRegisterButton">
              Log into Account
            </button>
            </Link>
        </div>
      </div>
    </div>
  )
}

