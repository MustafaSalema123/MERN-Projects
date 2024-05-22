import { useContext, useEffect, useState } from 'react'
import {  BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Dashboard from './components/Dashboard'
import Login from './components/Login'
import AddNewDoctor from './components/AddNewDoctor'
import AddNewAdmin from './components/AddNewAdmin'
import Messages from './components/Messages'
import Doctors from './components/Doctors'
import { ToastContainer } from 'react-toastify'
import "react-toastify/ReactToastify.css";
import { Context } from './main'
import axios from 'axios'
import Sidebar from './components/Sidebar'

function App() {
  
  const { isAuthenticated , setIsAuthenticated  , admin, setAdmin } = useContext(Context);

  useEffect(() => 
    {

      const fetchUser = async() => 
        {
          try{
         const response =  await axios.get("http://localhost:4000/api/user/admin/me" ,   {
            withCredentials: true,
          });
          setIsAuthenticated(true);
          setAdmin(response.data.user); // use gat in respoinse status
        }catch(err)
        {
          setIsAuthenticated(false);
          setAdmin({});
        }
      };

      fetchUser();
    } , [isAuthenticated]);


  return (
    <>
      <Router>
      <Sidebar/>
      <Routes>
        <Route path='/'  element={<Dashboard/>} />
        <Route path='/login'  element={<Login/>}  />
        <Route path="/doctor/addnew"  element={<AddNewDoctor/>}  />
        <Route path="/admin/addnew"   element={<AddNewAdmin/>}  />
        <Route path="/messages" element={<Messages />} />
        <Route path="/doctors" element={<Doctors />} />
       

        </Routes>
        <ToastContainer position="top-center" />
      </Router>
    </>
  )
}

export default App;
