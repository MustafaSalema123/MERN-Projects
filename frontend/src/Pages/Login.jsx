import React, { useContext, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { Context } from '../main';
import { toast } from 'react-toastify';
import axios from 'axios';

const Login = () => {

  const {isAuthenticated , setIsAuthenticated} = useContext(Context);

  // http://localhost:4000/api/user/login
// {
//     "email":"test@gmail.com",
//     "password":"asdfghjkl",
//     "confirmPassword": "asdfghjkl",
//     "role": "Patient"
// }

  const [email , setEmail] = useState("");
  const [password , setPassword] = useState("");
  const [confirmPassword , setConfirmPassword] = useState("");

  const navigateTo  = useNavigate();

  const handleLogin = async(e) => {
    e.preventDefault();
    try{
      await axios.post("http://localhost:4000/api/user/login" , {email ,password ,confirmPassword , role: "Patient" } ,
      {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      }
      ).then((res)=> 
        {
          toast.success(res.data.message);
          setIsAuthenticated(true);
          navigateTo("/");
          setEmail("");
          setPassword("");
          setConfirmPassword("");
        })
    }catch(error)
    {
      console.log("login erro " ,error.response.data.message);
      toast.error(error.response.data.message);  // res.status iin backend data error.response.data.message
    }
  }




  if(isAuthenticated){

    return <Navigate to={"/"}/>
  }
  return (
   <>
   <div className="container form-component login-form">
        <h2>Sign In</h2>
        <p>Please Login To Continue</p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat culpa
          voluptas expedita itaque ex, totam ad quod error?
        </p>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <div
            style={{
              gap: "10px",
              justifyContent: "flex-end",
              flexDirection: "row",
            }}
          >
            <p style={{ marginBottom: 0 }}>Not Registered?</p>
            <Link
              to={"/register"}
              style={{ textDecoration: "none", color: "#271776ca" }}
            >
              Register Now
            </Link>
          </div>
          <div style={{ justifyContent: "center", alignItems: "center" }}>
            <button type="submit">Login</button>
          </div>
        </form>
      </div>
   </>
  )
}

export default Login;